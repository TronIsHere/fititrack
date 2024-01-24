import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectToDatabase } from "@/lib/db";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { email, password, name } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({ message: "Invalid input" });
  }

  const client = await ConnectToDatabase();

  try {
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }

    // const hashedPassword = await hashPassword(password);

    await db.collection("users").insertOne({
      email,
      password,
      name,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.close();
  }
};

export default Handler;
