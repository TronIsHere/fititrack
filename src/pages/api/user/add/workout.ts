import { ConnectToDatabase } from "@/lib/dbUtils";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }
  const { workout, email } = req.body;
  await ConnectToDatabase();
  console.log(workout, 1);
  try {
    const updateResult = await UserModel.findOneAndUpdate(
      { email: email },
      { $push: { workouts: { ...workout } } },
      { new: true } // Returns the updated document
    );
    const newWorkoutId =
      updateResult.workouts[updateResult.workouts.length - 1]._id;
    if (!updateResult) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "success", newWorkoutId });
  } catch (error) {
    console.log(error, 2);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    // client.close();
  }
};
export default Handler;
