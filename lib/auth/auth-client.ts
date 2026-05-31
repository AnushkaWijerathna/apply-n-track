// Auth client for handling authentication logic on the client side, such as signing up, logging in, and managing user sessions.
/*This code essentially creates the authentication control center for the frontend of your React/Next.js application. It bridges the gap between your user interface (like the sign-in and sign-up pages you just built) 
and your backend server that actually handles the security. */

import { createAuthClient } from "better-auth/react";

//This is where you actually initialize the client. You are telling it, "Whenever I try to log a user in or sign them up, send that request to this specific web address."
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!, // Client-side URL for API calls, should match BETTER_AUTH_URL in .env.local
});

//When you ran createAuthClient, it generated a bundle of useful functions. This line unpacks that bundle and exports the specific tools you will use across your app:
export const { signIn, signUp, signOut, useSession } = authClient;
