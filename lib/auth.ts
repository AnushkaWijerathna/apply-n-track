//// Configure Better Auth with MongoDB and enable email/password authentication.

import { betterAuth } from "better-auth";
//This allows your app to connect to a MongoDB database.
import { MongoClient } from "mongodb";
//The adapter connects Better Auth with MongoDB so user data can be stored in the database.
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
//This database instance will store authentication-related collections like users and sessions.
const db = client.db();

export const auth = betterAuth({
  //Connects Better Auth to MongoDB using the adapter.
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
