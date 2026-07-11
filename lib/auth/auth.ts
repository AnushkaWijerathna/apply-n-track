import "server-only";

// Configure Better Auth with MongoDB and enable email/password authentication.
// This file sets up the authentication client that will be used throughout server side of the app to manage user authentication and sessions. It connects Better Auth to a MongoDB database using the provided adapter, allowing for secure storage of user data and session information. The emailAndPassword option is enabled to allow users to sign up and log in using their email and password credentials.,

import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
//The adapter connects Better Auth with MongoDB so user data can be stored in the database.
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { initializeUserBoard } from "../init-user-board";
const mongooseInstance = await connectDB();
const client = mongooseInstance.connection.getClient();
const db = client.db();

export const auth = betterAuth({
  //Connects Better Auth to MongoDB using the adapter.
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            await initializeUserBoard(user.id);
          }
        },
      },
    },
  },
});

//Helper function to get the session data in server side components, this can be used to check if a user is authenticated and access their session data in a server component and update UI.
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}
