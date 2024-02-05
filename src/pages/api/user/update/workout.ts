import { ConnectToDatabase } from "@/lib/dbUtils";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    // Change method to PATCH for updates
    return res.status(405).end("Method Not Allowed");
  }

  const { workoutId, email, updatedWorkout } = req.body; // Expect updatedWorkout in the request

  if (!updatedWorkout) {
    return res.status(400).json({ message: "No workout update data provided" });
  }

  await ConnectToDatabase();

  try {
    // Ensure workoutId is a valid ObjectId
    if (!Types.ObjectId.isValid(workoutId)) {
      return res.status(400).json({ message: "Invalid workout ID" });
    }

    // Find user and update the specific workout
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const workoutIndex = user.workouts.findIndex(
      (w: any) => w._id.toString() === workoutId
    );
    if (workoutIndex === -1) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Update the workout with new values
    user.workouts[workoutIndex] = {
      ...user.workouts[workoutIndex].toObject(),
      ...updatedWorkout,
    };
    await user.save();

    res
      .status(200)
      .json({
        message: "Workout updated successfully",
        data: user.workouts[workoutIndex],
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default Handler;
