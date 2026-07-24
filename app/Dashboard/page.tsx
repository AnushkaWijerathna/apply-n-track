import KanbanBoard from "@/components/kanban-board";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }
  //Gets the dashboard data from the database and displays it in the dashboard page.
  // The dashboard page is a server component that is rendered on the server side and sent to the client as HTML.
  // This allows for better performance and SEO, as the page is rendered on the server and sent to the client as HTML, rather than being rendered on the client side using JavaScript,
  // Also since this is a server component, it can access the database directly without needing to go through an API route, which makes it faster and more efficient.

  await connectDB();

  const board = await Board.findOne({
    userId : session.user.id,
    name :"Job hunt"
  }).populate({
    path:"columns",
  })

 return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Job Hunt</h1>
          <p className="text-gray-600">Track your job applications</p>
        </div>
        <KanbanBoard board={board} userId={session.user.id} />
      </div>
    </div>
  );
}
