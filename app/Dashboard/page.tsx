import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";
import KanbanBoard from "@/components/kanban-board";
import { Suspense } from "react";

    //Gets the dashboard data from the database and displays it in the dashboard page.
  // The dashboard page is a server component that is rendered on the server side and sent to the client as HTML.
  // This allows for better performance and SEO, as the page is rendered on the server and sent to the client as HTML, rather than being rendered on the client side using JavaScript,
  // Also since this is a server component, it can access the database directly without needing to go through an API route, which makes it faster and more efficient.

async function getBoard(userId: string) {
  "use cache";

  await connectDB();

  const boardDoc = await Board.findOne({
    userId: userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  if (!boardDoc) return null;

  const board = JSON.parse(JSON.stringify(boardDoc));

  return board;
}

async function DashboardPage() {

  const session = await getSession();
  const board = await getBoard(session?.user.id ?? "");

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_36%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)]">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-border/70 bg-white/85 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground text-center">
                Job application tracker
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl text-center">
                Job Hunt
              </h1>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base text-center">
                Track applications, move them through your pipeline, and find the right role faster.
              </p>
            </div>
          </div>
        </div>
        <KanbanBoard board={board} userId={session.user.id} />
      </div>
    </div>
  );
}

export default async function Dashboard() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage />
    </Suspense>
  );
}