import { ConnectToDatabase } from "@/lib/dbUtils";
import UserModel from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose"; // Import Types from mongoose

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    // Change method to DELETE
    return res.status(405).end("Method Not Allowed");
  }

  const { workoutId, email } = req.body; // Expect workoutId in the request
  await ConnectToDatabase();

  try {
    // Ensure workoutId is a valid ObjectId
    if (!Types.ObjectId.isValid(workoutId)) {
      return res.status(400).json({ message: "Invalid workout ID" });
    }

    const updateResult = await UserModel.findOneAndUpdate(
      { email: email },
      { $pull: { workouts: { _id: workoutId } } }, // Use $pull to remove the workout
      { new: true }
    );

    if (!updateResult) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error, 2);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default Handler;
