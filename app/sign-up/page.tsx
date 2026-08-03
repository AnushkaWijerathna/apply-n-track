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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "@/lib/auth/auth-client";

export default function SignUp() {
  //Use react hooks to manage form state and handle submission, use 'onChange' to update state using target value(Inputs).
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //Display error or loading states using hooks
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Handle form submission with async function to call API route for user registration, set loading state and handle errors.,
  //Use better-auth to create user with email and password, handle success by redirecting to dashboard or showing success message, handle errors by setting error state whenever the foram is submitted.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);
    //Authentication logic here, using better-auth.

    try {
      const result = await signUp.email({
        name,
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
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-background" />
      <div className="pointer-events-none absolute -right-28 top-1/2 size-96 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <aside className="relative hidden min-h-[620px] overflow-hidden border-l border-border bg-muted/70 p-10 text-foreground lg:order-2 lg:flex lg:flex-col">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full border-[18px] border-primary/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-primary/5" />

          <div className="relative max-w-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
              01
            </div>
            <p className="mt-7 text-xs font-semibold tracking-[0.22em] text-primary uppercase">
              Build your workflow
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-balance">
              Create a search that works for you.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Give every application a clear place, purpose, and next step.
            </p>
          </div>

          <div className="relative mt-auto grid grid-cols-2 gap-3">
            <div className="col-span-2 rounded-2xl bg-primary p-5 text-primary-foreground shadow-lg shadow-primary/20">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary-foreground/70 uppercase">
                One workspace
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight">
                Plan every next move.
              </p>
              <div className="mt-5 flex items-end gap-1.5">
                <span className="h-3 w-1/4 rounded-full bg-primary-foreground/35" />
                <span className="h-5 w-1/4 rounded-full bg-primary-foreground/55" />
                <span className="h-8 w-1/4 rounded-full bg-primary-foreground" />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="text-xs font-bold text-primary">02</span>
              <p className="mt-5 text-sm font-semibold">Track progress</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="text-xs font-bold text-primary">03</span>
              <p className="mt-5 text-sm font-semibold">Stay focused</p>
            </div>
          </div>
        </aside>

        <Card className="w-full max-w-none gap-0 rounded-none border-0 bg-card py-0 shadow-none ring-0 lg:order-1">
        <CardHeader className="space-y-2 px-6 pb-5 pt-8 text-left sm:px-10 sm:pb-6 sm:pt-10">
          <CardTitle className="text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
            Sign Up
          </CardTitle>
          <CardDescription className="max-w-sm text-[0.95rem] leading-6 text-muted-foreground">
            Create an account to get started.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 px-6 sm:px-10">
            {/*Error message */}
            {error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium leading-5 text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2.5">
              <Label
                htmlFor="name"
                className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl border-border bg-background px-3.5 text-sm shadow-sm transition-[border-color,box-shadow,transform] duration-200 placeholder:text-muted-foreground/75 hover:-translate-y-px hover:border-primary/60 hover:shadow-md focus-visible:translate-y-0 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20"
              />
            </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-border bg-background px-3.5 text-sm shadow-sm transition-[border-color,box-shadow,transform] duration-200 placeholder:text-muted-foreground/75 hover:-translate-y-px hover:border-primary/60 hover:shadow-md focus-visible:translate-y-0 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-border bg-background px-3.5 text-sm shadow-sm transition-[border-color,box-shadow,transform] duration-200 placeholder:text-muted-foreground/75 hover:-translate-y-px hover:border-primary/60 hover:shadow-md focus-visible:translate-y-0 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-0 bg-transparent px-6 pb-8 pt-7 sm:px-10 sm:pb-10">
            <Button
              type="submit"
              className="relative isolate h-12 w-full overflow-hidden rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-[transform,background-color,box-shadow] after:pointer-events-none after:absolute after:inset-y-0 after:-left-1/2 after:z-0 after:w-1/3 after:-skew-x-12 after:bg-primary-foreground/20 after:transition-transform after:duration-500 after:content-[''] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/35 hover:after:translate-x-[500%] active:translate-y-0 active:scale-[0.99] focus-visible:border-primary focus-visible:ring-primary/30"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm leading-5 text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                Sign in
              </a>
            </p>
          </CardFooter>
        </form>
        </Card>
      </div>
    </div>
  );
}
