import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiHandler } from "next";
import { MongoClient } from "mongodb";
import { ConnectToDatabase } from "@/lib/db";
import { NextAuthOptions } from "next-auth";

interface Credentials {
  email: string;
  password: string;
}

const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!credentials) {
          throw new Error("Credentials are missing!");
        }
        const client: MongoClient = await ConnectToDatabase();
        const userCollection = client.db().collection("users");
        const user = await userCollection.findOne({ email: email });
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }
        // const isValid = await verifyPassword(
        //   password,
        //   user.password
        // );
        const isValid = password == user.password;
        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }
        client.close();
        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, nextAuthOptions);
export default authHandler;
