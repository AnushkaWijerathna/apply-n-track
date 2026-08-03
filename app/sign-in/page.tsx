"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);
    //Authentication logic here, using better-auth.

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(
          result.error.message ?? "Failed to create account. Please try again.",
        );
      } else {
        //Redirect to dashboard or show success message
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-muted/70" />
      <div className="pointer-events-none absolute -left-28 top-1/2 size-96 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <aside className="relative hidden min-h-[620px] overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-primary-foreground/15" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full border-[24px] border-primary-foreground/10" />

          <div className="relative max-w-sm">
            <p className="text-xs font-semibold tracking-[0.22em] text-primary-foreground/70 uppercase">
              Apply-n-Track
            </p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance">
              Make your next move count.
            </h2>
            <p className="mt-5 text-base leading-7 text-primary-foreground/75">
              A focused home for every opportunity and every next step.
            </p>
          </div>

          <div className="relative mt-auto rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 shadow-lg shadow-primary-foreground/10">
            <div className="flex items-center justify-between text-xs font-semibold tracking-[0.16em] text-primary-foreground/70 uppercase">
              <span>In motion</span>
              <span className="size-2 rounded-full bg-primary-foreground shadow-[0_0_0_6px] shadow-primary-foreground/15" />
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary-foreground text-xs font-bold text-primary">1</span>
                <span className="h-2.5 flex-1 rounded-full bg-primary-foreground/25" />
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full border border-primary-foreground/40 text-xs font-bold">2</span>
                <span className="h-2.5 w-3/4 rounded-full bg-primary-foreground/25" />
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full border border-primary-foreground/40 text-xs font-bold">3</span>
                <span className="h-2.5 w-1/2 rounded-full bg-primary-foreground/25" />
              </div>
            </div>
          </div>
        </aside>

        <Card className="w-full max-w-none gap-0 rounded-none border-0 bg-card py-0 shadow-none ring-0">
        <CardHeader className="space-y-2 px-6 pb-5 pt-8 text-left sm:px-10 sm:pb-6 sm:pt-10">
          <CardTitle className="text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
            Sign In
          </CardTitle>
          <CardDescription className="max-w-sm text-[0.95rem] leading-6 text-muted-foreground">
            Enter your correct credentials to access your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 px-6 sm:px-10">
            {error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium leading-5 text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="h-12 rounded-xl border-border bg-background px-3.5 text-sm shadow-sm transition-[border-color,box-shadow,transform] duration-200 placeholder:text-muted-foreground/75 hover:-translate-y-px hover:border-primary/60 hover:shadow-md focus-visible:translate-y-0 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                placeholder="••••••••"
                className="h-12 rounded-xl border-border bg-background px-3.5 text-sm shadow-sm transition-[border-color,box-shadow,transform] duration-200 placeholder:text-muted-foreground/75 hover:-translate-y-px hover:border-primary/60 hover:shadow-md focus-visible:translate-y-0 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-0 bg-transparent px-6 pb-8 pt-7 sm:px-10 sm:pb-10">
            <Button
              type="submit"
              className="relative isolate h-12 w-full overflow-hidden rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-[transform,background-color,box-shadow] after:pointer-events-none after:absolute after:inset-y-0 after:-left-1/2 after:z-0 after:w-1/3 after:-skew-x-12 after:bg-primary-foreground/20 after:transition-transform after:duration-500 after:content-[''] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/35 hover:after:translate-x-[500%] active:translate-y-0 active:scale-[0.99] focus-visible:border-primary focus-visible:ring-primary/30"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <p className="text-center text-sm leading-5 text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                Sign up
              </a>
            </p>
          </CardFooter>
        </form>
        </Card>
      </div>
    </div>
  );
}
