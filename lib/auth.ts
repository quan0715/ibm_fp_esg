// 'use server'
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongoClient";
import { authConfig } from "@/lib/auth.config";

export const runtime = "nodejs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  // adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 days
  },
});
