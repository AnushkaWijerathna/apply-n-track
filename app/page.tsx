import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* This is the main content area */}
      <main className="flex-1">
        {/* This can be filled with the main content of the page. */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl mb-6 font-bold text-gray-800">
              Welcome to Apply n Track
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Your ultimate job application tracker.
            </p>
            <div className="flex flex-col items-center">
              <Link href="/sign-up">
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <p className="text-sm mt-4 text-center text-muted-foreground">
                Start tracking your job applications today!
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
