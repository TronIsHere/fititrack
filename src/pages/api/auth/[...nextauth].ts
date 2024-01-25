import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiHandler } from "next";
import { MongoClient } from "mongodb";
import { ConnectToDatabase } from "@/lib/dbUtils";
import { NextAuthOptions } from "next-auth";
import { verifyPassword } from "@/lib/authUtils";
import UserModel from "@/models/User";

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
        await ConnectToDatabase();

        const user = await UserModel.findOne({ email: email });
        if (!user) {
          throw new Error("Wrong email or password");
        }
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("Wrong email or password");
        }

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, nextAuthOptions);
export default authHandler;
