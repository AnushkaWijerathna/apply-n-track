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
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-neutral-50 p-4 dark:bg-neutral-950 sm:p-8">
      {/* Main wrapper overrides the blue global background with a clean neutral base */}

      {/* Ambient background shapes for the glass effect to refract */}
      <div className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-rose-200/40 mix-blend-multiply blur-3xl filter dark:bg-rose-900/20 dark:mix-blend-screen" />
      <div className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-amber-200/40 mix-blend-multiply blur-3xl filter dark:bg-amber-900/20 dark:mix-blend-screen" />

      {/* Glassy Card */}
      <Card className="relative z-10 w-full max-w-md border border-white/60 bg-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/30">
        <CardHeader className="space-y-2 pb-6 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-neutral-900 [text-shadow:_0_2px_4px_rgb(0_0_0_/_10%)] dark:text-neutral-50 dark:[text-shadow:_0_2px_10px_rgb(255_255_255_/_15%)]">
            Sign Up
          </CardTitle>
          <CardDescription className="text-base text-neutral-600 [text-shadow:_0_1px_2px_rgb(0_0_0_/_5%)] dark:text-neutral-400 dark:[text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
            Create an account to get started.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {/*Error message */}
            {error && <div className="text-sm text-destructive">{error}</div>}

            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium leading-none text-neutral-800 [text-shadow:_0_1px_2px_rgb(0_0_0_/_5%)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-200 dark:[text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]"
              >
                Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 border-white/40 bg-white/40 px-4 shadow-inner transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/10 dark:bg-black/40 dark:focus-visible:ring-neutral-600"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium leading-none text-neutral-800 [text-shadow:_0_1px_2px_rgb(0_0_0_/_5%)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-200 dark:[text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-white/40 bg-white/40 px-4 shadow-inner transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/10 dark:bg-black/40 dark:focus-visible:ring-neutral-600"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium leading-none text-neutral-800 [text-shadow:_0_1px_2px_rgb(0_0_0_/_5%)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-200 dark:[text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]"
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
                className="h-11 border-white/40 bg-white/40 px-4 shadow-inner transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-white/10 dark:bg-black/40 dark:focus-visible:ring-neutral-600"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-8 pt-2">
            <Button
              type="submit"
              className="h-11 w-full bg-primary text-base font-semibold text-white shadow-lg [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)] transition-all hover:scale-[1.01] hover:bg-primary/80 active:scale-[0.99] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:[text-shadow:_0_1px_2px_rgb(255_255_255_/_40%)]"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm text-neutral-600 [text-shadow:_0_1px_2px_rgb(0_0_0_/_5%)] dark:text-neutral-400 dark:[text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-medium text-blue-500 underline-offset-4 transition-colors hover:underline dark:text-blue-400"
              >
                Sign in
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
