import ImageTabs from "@/components/image-tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Briefcase } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* This is the main content area */}
      <main className="flex-1">
        {/* This can be filled with the main content of the page. */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl mb-6 font-bold text-primary">
              Welcome to Apply & Track
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Your ultimate job application tracker.
            </p>
            <div className="flex flex-col items-center">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="flex items-center gap-2 bg-background text-white hover:bg-primary/90"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <p className="text-sm mt-4 text-center text-muted-foreground">
                Start tracking your job applications today!
              </p>
            </div>
          </div>
        </section>

        {/*hero section with image */}
        <ImageTabs />

        {/* Features Section */}
        <section className="border-t bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Organize Applications
                </h3>
                <p className="text-muted-foreground">
                  Create custom boards and columns to track your job
                  applications at every stage of the process.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Track Progress
                </h3>
                <p className="text-muted-foreground">
                  Monitor your application status from applied to interview to
                  offer with visual Kanban boards.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Stay Organized
                </h3>
                <p className="text-muted-foreground">
                  Never lose track of an application. Keep all your job search
                  information in one centralized place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
