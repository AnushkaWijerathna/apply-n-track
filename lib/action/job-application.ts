"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../models";

interface JobApplicationData {
  company: string;
  position: string;
  location?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  columnId: string;
  boardId: string;
  tags?: string[];
  description?: string;
}

export async function createJobApplication(data: JobApplicationData) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const {
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    columnId,
    boardId,
    tags,
    description,
  } = data;

  if (!company || !position || !columnId || !boardId) {
    return { error: "Missing required fields" };
  }

  // Verify board ownership
  const board = await Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });

  if (!board) {
    return { error: "Board not found" };
  }

  // Verify column belongs to board

  const column = await Column.findOne({
    _id: columnId,
    boardId: boardId,
  });

  if (!column) {
    return { error: "Column not found" };
  }

  const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
    .lean()) as { order: number } | null;

  const jobApplication = await JobApplication.create({
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    columnId,
    boardId,
    userId: session.user.id,
    tags: tags || [],
    description,
    status: "applied",
    order: maxOrder ? maxOrder.order + 1 : 0,
  });

  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });

  revalidatePath("/dashboard");

  return { data: JSON.parse(JSON.stringify(jobApplication)) };
}


//This function updates a job application, verifies user permission, handles moving jobs between Kanban columns, manages ordering, and saves the changes to the database.
export async function updateJobApplication(
  id: string,
  updates: {
    company?: string;
    position?: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId?: string;
    order?: number;
    tags?: string[];
    description?: string;
  }
) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const jobApplication = await JobApplication.findById(id);

  if (!jobApplication) {
    return { error: "Job application not found" };
  }

  //Makes sure the logged-in user owns this job application.
  if (jobApplication.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }

  //This line uses JavaScript destructuring with the rest operator.
  //It takes the updates object and separates it into three parts: columnId,order and Everything else → stored in otherUpdates
  const { columnId, order, ...otherUpdates } = updates;

  const updatesToApply: Partial<{
    company: string;
    position: string;
    location: string;
    notes: string;
    salary: string;
    jobUrl: string;
    columnId: string;
    order: number;
    tags: string[];
    description: string;
  }> = otherUpdates;

  const currentColumnId = jobApplication.columnId.toString();
  const newColumnId = columnId?.toString();

  //Check if the card is moving to another column
  const isMovingToDifferentColumn =
    newColumnId && newColumnId !== currentColumnId; //If the newColumnId is not null then is the newColumnId is different from the currentColumnId.

    //Remove from old column
  if (isMovingToDifferentColumn) {
    await Column.findByIdAndUpdate(currentColumnId, {
      $pull: { jobApplications: id },
    });

    //Gets all jobs already in the new column. Calculates them.
    const jobsInTargetColumn = await JobApplication.find({
      columnId: newColumnId,
      _id: { $ne: id }, //"Find jobs in this column, but exclude the current job."
    })
      .sort({ order: 1 })//It sorts jobs by order from small to large.
      .lean(); //The lean() method is used to return plain JavaScript objects instead of Mongoose documents, It is faster when you only need to read data.

    let newOrderValue: number;

    //Did the user tell us where to place the card?
    if (order !== undefined && order !== null) {
      newOrderValue = order * 100; //We multiply by 100 to leave space for future insertions between jobs.This makes inserting easier.

      //This line creates a new array containing all jobs in the target column that come after the specified order. These jobs will need to have their order values adjusted to make room for the moved job.,
      //slice() takes items from that position onward.
      const jobsThatNeedToShift = jobsInTargetColumn.slice(order); 
      for (const job of jobsThatNeedToShift) {
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: job.order + 100 },//We add 100 to their order to move them down and make space for the moved job.
        });
      }
      
    }
    //If the user didn't specify an order, we place the job at the end of the column. 
    else {
      if (jobsInTargetColumn.length > 0) {
        const lastJobOrder =
          jobsInTargetColumn[jobsInTargetColumn.length - 1].order || 0;
        newOrderValue = lastJobOrder + 100;
      } else {
        newOrderValue = 0;
      }
    }

    //Add to new column
    updatesToApply.columnId = newColumnId;
    updatesToApply.order = newOrderValue;

    await Column.findByIdAndUpdate(newColumnId, {
      $push: { jobApplications: id },
    });
  } else if (order !== undefined && order !== null) {
    const otherJobsInColumn = await JobApplication.find({
      columnId: currentColumnId,
      _id: { $ne: id },
    })
      .sort({ order: 1 })
      .lean();

    const currentJobOrder = jobApplication.order || 0;
    const currentPositionIndex = otherJobsInColumn.findIndex(
      (job) => job.order > currentJobOrder
    );
    const oldPositionindex =
      currentPositionIndex === -1
        ? otherJobsInColumn.length
        : currentPositionIndex;

    const newOrderValue = order * 100;

    if (order < oldPositionindex) {
      const jobsToShiftDown = otherJobsInColumn.slice(order, oldPositionindex);

      for (const job of jobsToShiftDown) {
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: job.order + 100 },
        });
      }
    } else if (order > oldPositionindex) {
      const jobsToShiftUp = otherJobsInColumn.slice(oldPositionindex, order);
      for (const job of jobsToShiftUp) {
        const newOrder = Math.max(0, job.order - 100);
        await JobApplication.findByIdAndUpdate(job._id, {
          $set: { order: newOrder },
        });
      }
    }

    updatesToApply.order = newOrderValue;
  }
//Update the job application
  const updated = await JobApplication.findByIdAndUpdate(id, updatesToApply, {
    new: true,
  });

  revalidatePath("/dashboard");

  return { data: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteJobApplication(id: string) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const jobApplication = await JobApplication.findById(id);

  if (!jobApplication) {
    return { error: "Job application not found" };
  }

  if (jobApplication.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }

  await Column.findByIdAndUpdate(jobApplication.columnId, {
    $pull: { jobApplications: id },
  });

  await JobApplication.deleteOne({ _id: id });
  revalidatePath("/dashboard");

  return { success: true };
}

// ===============================
// INTERVIEW QUESTIONS & EXPLANATIONS
// ===============================

/*

Q1: Explain this code / functionality.

Answer:
This code implements CRUD operations for job applications.
It allows users to create, update, and delete job applications.
It verifies authentication, checks user ownership, updates MongoDB
using Mongoose, manages Kanban column movement, and handles ordering.



Q2: Why did you use "use server" in this file?

Answer:
"use server" makes these functions run only on the server side.
It allows secure access to databases, authentication,
environment variables, and server-side operations.



Q3: What are Server Actions in Next.js?

Answer:
Server Actions are server-side functions that can be called
directly from React components.
They are mainly used for database operations like:
- Creating data
- Updating data
- Deleting data



Q4: Explain the flow of createJobApplication()

Answer:
1. Check whether the user is logged in.
2. Connect to MongoDB.
3. Validate required fields.
4. Verify that the board belongs to the user.
5. Verify that the column belongs to the board.
6. Create the job application.
7. Add the job ID to the column.
8. Refresh dashboard data.



Q5: Why do you check userId before updating or deleting?

Example:
if (jobApplication.userId !== session.user.id)

Answer:
This is an authorization check.
It ensures users can only modify their own job applications.
Without this, users could access other users' data.



Q6: Difference between Authentication and Authorization?

Authentication:
Checks who the user is.
Example: Login with email and password.

Authorization:
Checks what the user can access.
Example: User can only edit their own job applications.



Q7: Explain moving a job card between Kanban columns.

Answer:
When moving a card:
1. Remove the job ID from the old column using $pull.
2. Calculate the new order position.
3. Update the columnId.
4. Add the job ID to the new column using $push.
5. Update the order of other cards.



Q8: What are $push and $pull in MongoDB?

$push:
Adds a value into an array.

Example:
Before:
jobApplications: [1,2]

After:
jobApplications: [1,2,3]


$pull:
Removes a value from an array.

Example:
Before:
jobApplications: [1,2,3]

After:
jobApplications: [1,3]



Q9: Why use async/await?

Answer:
Database operations are asynchronous.
async/await allows us to wait for database responses
and write cleaner asynchronous code.

Example:

const job = await JobApplication.findById(id);



Q10: Explain the ordering logic.

Answer:
Each job has an order value.
The application uses order values like:

Google  -> 0
Amazon  -> 100
Netflix -> 200

Multiplying by 100 creates gaps between items.
When inserting a card, existing cards are shifted
by adding 100 to their order value.



===============================
Additional Possible Questions
===============================


Q11: What is Mongoose?

Answer:
Mongoose is an ODM (Object Data Modeling) library for MongoDB.
It allows us to create schemas, validate data,
and interact with MongoDB using JavaScript objects.



Q12: What does .lean() do?

Answer:
.lean() returns normal JavaScript objects instead of
full Mongoose documents.
It improves performance when we only need to read data.



Q13: What does revalidatePath() do?

Answer:
It tells Next.js to refresh cached data for a specific route.

Example:
revalidatePath("/dashboard");



Q14: Why use MongoDB instead of SQL?

Answer:
MongoDB is document-based and stores JSON-like data.
It provides flexible schemas and works well with
JavaScript applications.



Q15: What happens if database update fails halfway?

Answer:
Multiple operations may become inconsistent.
A better solution is using MongoDB transactions
so all operations succeed or fail together.
*/