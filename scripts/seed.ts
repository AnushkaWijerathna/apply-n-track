import connectDB from "../lib/db";
import "@/lib/models";
import { Board, Column, JobApplication } from "@/lib/models";

const USER_ID = "6929e34361b6f083d154859d";

const SAMPLE_JOBS = [
  // Wish List
  {
    company: "Netflix",
    position: "Software Developer Trainee",
    location: "USA, Remote",
    tags: ["React", "Tailwind", "High Pay"],
    description: "Build modern web applications using React and Tailwind CSS",
    jobUrl: "https://example.com/jobs/1",
    salary: "25K",
  },
 
  // Applied
  {
    company: "L Food",
    position: "Intern DevOps Engineer",
    location: "Colombo, Sri Lanka",
    tags: ["promQL", "Full-stack", "Docker"],
    description: "Manage infrastructure and deployment pipelines",
    jobUrl: "https://example.com/jobs/4",
    salary: "20K - 25K",
  },
  {
    company: "Media D",
    position: "QA Intern",
    location: "Kaduwela, Sri Lanka",
    tags: ["Postman", "Selenium", "DevTools"],
    description: "Manage product testing and quality assurance",
    jobUrl: "https://example.com/jobs/5",
    salary: "$100k - $130k",
  },
  {
    company: "Wise",
    position: "Mobile App Developer Intern",
    location: "Kandy",
    tags: ["Flutter", "Dart", "Firebase"],
    description: "Build cross-platform mobile applications",
    jobUrl: "https://example.com/jobs/6",
    salary: "35K",
  },
 
  // Interviewing
  {
    company: "M Company",
    position: "QA Engineer Intern",
    location: "Malambe, Sri Lanka",
    tags: ["Postman", "DevTools"],
    description: "Do manual testing and manage product quality assurance",
    jobUrl: "https://example.com/jobs/8",
    salary: "25K - 35K",
  },
  {
    company: "WorkLab",
    position: "Software Engineer Intern",
    location: "Colombo, Sri Lanka",
    tags: ["Fullstack", "React", "Node.js", "PostgreSQL"],
    description:
      "Build modern web applications using modern technologies and frameworks",
    jobUrl: "https://example.com/jobs/9",
    salary: "25K",
  },
  
  // Offer
  {
    company: "XYZ Tech",
    position: "Trainee Software Engineer",
    location: "Remote",
    tags: ["Node.js", "PostgreSQL", "AWS"],
    description: "Develop backend services and APIs",
    jobUrl: "https://example.com/jobs/11",
    salary: "Non-Paid",
  },
  {
    company: "CX industries",
    position: "UI Designer",
    location: "Colombo, Sri Lanka",
    tags: ["Figma", "Illustrator"],
    description:
      "Help the UX process and workflow, and work closely with development team",
    jobUrl: "https://example.com/jobs/12",
    salary: "15K",
  },
  // Rejected
  {
    company: "Ultra Vouche",
    position: "Associate",
    location: "Remote",
    tags: ["Scrum", "Agile"],
    description: "Support product development and project management",
    jobUrl: "https://example.com/jobs/13",
    salary: "70K - 80K",
  },
  {
    company: "Webb Industries",
    position: "Web Test Intern",
    location: "Boston, MA",
    tags: ["Testing", "Automation"],
    description: "Manage product testing and quality assurance",
    jobUrl: "https://example.com/jobs/14",
    salary: "30K",
  },
  {
    company: "Tech Solutions",
    position: "Data Analyst",
    location: "London, UK",
    tags: ["PowerBI", "SQL"],
    description: "Analyze user data and provide insights for product decisions",
    jobUrl: "https://example.com/jobs/15",
    salary: "20K",
  },
];

async function seed() {
  if (!USER_ID) {
    console.error("❌ Error: SEED_USER_ID environment variable is required");
    console.log("Usage: SEED_USER_ID=your-user-id npm run seed");
    process.exit(1);
  }

  try {
    console.log("🌱 Starting seed process...");
    console.log(`📋 Seeding data for user ID: ${USER_ID}`);

    await connectDB();
    console.log("✅ Connected to database");

    // Find the user's board
    let board = await Board.findOne({ userId: USER_ID, name: "Job Hunt" });

    if (!board) {
      console.log("⚠️  Board not found. Creating board...");
      const { initializeUserBoard } = await import("../lib/init-user-board");
      board = await initializeUserBoard(USER_ID);
      console.log("✅ Board created");
    } else {
      console.log("✅ Board found");
    }

    // Get all columns
    const columns = await Column.find({ boardId: board._id }).sort({
      order: 1,
    });
    console.log(`✅ Found ${columns.length} columns`);

    if (columns.length === 0) {
      console.error(
        "❌ No columns found. Please ensure the board has default columns."
      );
      process.exit(1);
    }

    // Map column names to column IDs
    const columnMap: Record<string, string> = {};
    columns.forEach((col) => {
      columnMap[col.name] = col._id.toString();
    });

    // Clear existing job applications for this user
    const existingJobs = await JobApplication.find({ userId: USER_ID });
    if (existingJobs.length > 0) {
      console.log(
        `🗑️  Deleting ${existingJobs.length} existing job applications...`
      );
      await JobApplication.deleteMany({ userId: USER_ID });

      // Clear job applications from columns
      for (const column of columns) {
        column.jobApplications = [];
        await column.save();
      }
    }

    // Distribute jobs across columns
    const jobsByColumn: Record<string, typeof SAMPLE_JOBS> = {
      "Wish List": SAMPLE_JOBS.slice(0, 3),
      Applied: SAMPLE_JOBS.slice(3, 7),
      Interviewing: SAMPLE_JOBS.slice(7, 10),
      Offer: SAMPLE_JOBS.slice(10, 12),
      Rejected: SAMPLE_JOBS.slice(12, 15),
    };

    let totalCreated = 0;

    for (const [columnName, jobs] of Object.entries(jobsByColumn)) {
      const columnId = columnMap[columnName];
      if (!columnId) {
        console.warn(`⚠️  Column "${columnName}" not found, skipping...`);
        continue;
      }

      const column = columns.find((c) => c.name === columnName);
      if (!column) continue;

      for (let i = 0; i < jobs.length; i++) {
        const jobData = jobs[i];
        const jobApplication = await JobApplication.create({
          company: jobData.company,
          position: jobData.position,
          location: jobData.location,
          tags: jobData.tags,
          description: jobData.description,
          jobUrl: jobData.jobUrl,
          salary: jobData.salary,
          columnId: columnId,
          boardId: board._id,
          userId: USER_ID,
          status: columnName.toLowerCase().replace(" ", "-"),
          order: i,
        });

        column.jobApplications.push(jobApplication._id);
        totalCreated++;
      }

      await column.save();
      console.log(`✅ Added ${jobs.length} jobs to "${columnName}" column`);
    }

    console.log(`\n🎉 Seed completed successfully!`);
    console.log(`📊 Created ${totalCreated} job applications`);
    console.log(`📋 Board: ${board.name}`);
    console.log(`👤 User ID: ${USER_ID}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();