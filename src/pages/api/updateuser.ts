import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const result = await UserModel.updateMany(
      { paid: { $exists: false } },
      { $set: { paid: false, trial: "none" } }
    );

    res.status(200).json({ message: `Updated ${result.modifiedCount} users` });
  } catch (error) {
    console.error("Error updating users:", error);
    res.status(500).json({ message: "Error updating users", error });
  }
}
