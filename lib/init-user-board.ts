//Initializes a default board with colunms for a new user. This function is called when a new user is created in the database.

import { Board, Column } from "./models";
import connectDB from "./db";

const DEFAULT_COLUMNS = [
  {
    name: "Wish List",
    order: 0,
  },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

export async function initializeUserBoard(userId: string) {
  await connectDB();
  try {
    //Check if the user already has a board, if yes then return that board, if not then create a new board with default columns and return that board.

    const existingBoard = await Board.findOne({ userId: userId });

    if (existingBoard) {
      return existingBoard;
    }

    // Create the board
    const board = await Board.create({
      name: "Job Hunt",
      userId,
      columns: [],
    });

    // Create default columns
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          jobApplications: [],
        }),
      ),
    );

    // Update the board with the new column IDs
    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;
  } catch (error) {
    throw error;
  }
}
//Promise.all() --> lets you run multiple database operations in parallel and wait for all of them to complete.
// It takes an array of promises (or database operations) as input and returns a single promise that completes only after all the operations finish successfully.
// If any one of the operations fails, the returned promise is rejected. In this context the input is create() operations for creating all the columns at the same time.
