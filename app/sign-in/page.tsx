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
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-neutral-50 p-4 dark:bg-neutral-950 sm:p-8">
      {/* Main wrapper overrides the blue global background with a clean neutral base */}

      {/* Ambient background shapes - Shifted to cool tones (Cyan/Violet) with slow CSS pulse animations */}
      <div className="absolute -left-20 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-cyan-300/30 mix-blend-multiply blur-3xl filter [animation-duration:6s] dark:bg-cyan-900/20 dark:mix-blend-screen" />
      <div className="absolute -right-20 bottom-0 h-[500px] w-[500px] animate-pulse rounded-full bg-violet-300/30 mix-blend-multiply blur-3xl filter [animation-delay:2s] [animation-duration:8s] dark:bg-violet-900/20 dark:mix-blend-screen" />

      {/* Glassy Card */}
      <Card className="relative z-10 w-full max-w-md border border-white/60 bg-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/30">
        <CardHeader className="space-y-2 pb-6 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-neutral-900 [text-shadow:_0_2px_4px_rgb(0_0_0_/_10%)] dark:text-neutral-50 dark:[text-shadow:_0_2px_10px_rgb(255_255_255_/_15%)]">
            Sign In
          </CardTitle>
          <CardDescription className="text-base text-neutral-600 [text-shadow:_0_1px_2px_rgb(0_0_0_/_5%)] dark:text-neutral-400 dark:[text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
            Enter your correct credentials to access your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {error && <div className="text-sm text-destructive">{error}</div>}
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
                className="h-11 border-white/40 bg-white/40 px-4 shadow-inner transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500/50 dark:border-white/10 dark:bg-black/40 dark:focus-visible:ring-cyan-500/40"
                onChange={(e) => setEmail(e.target.value)}
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
                className="h-11 border-white/40 bg-white/40 px-4 shadow-inner transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500/50 dark:border-white/10 dark:bg-black/40 dark:focus-visible:ring-cyan-500/40"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-8 pt-2">
            <Button
              type="submit"
              className="h-11 w-full bg-primary text-base font-semibold text-white shadow-lg [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)] transition-all hover:scale-[1.01] hover:bg-primary/80 active:scale-[0.99] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:[text-shadow:_0_1px_2px_rgb(255_255_255_/_40%)]"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-neutral-600 [text-shadow:_0_1px_2px_rgb(0_0_0_/_5%)] dark:text-neutral-400 dark:[text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="font-medium text-cyan-600 underline-offset-4 transition-colors hover:underline dark:text-cyan-400"
              >
                Sign up
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
