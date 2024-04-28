import { ConnectToDatabase } from "@/lib/dbUtils";
import UserModel from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    // Change method to PATCH for updates
    return res.status(405).end("Method Not Allowed");
  }

  const { dob, email, name } = req.body; // Expect dob, email, and name in the request

  await ConnectToDatabase();

  try {
    // Find user by email and update the dob and name
    const user = await UserModel.findOneAndUpdate(
      { email: email },
      { dob: dob, name: name },
      { new: true } // This option returns the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
export default Handler;
