import { ConnectToDatabase } from "@/lib/dbUtils";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { field, data, email } = req.body;

  await ConnectToDatabase();

  try {
    const updateResult = await UserModel.findOneAndUpdate(
      { email: email },
      field === "xp"
        ? { $inc: { "character.xp": data } } // Increment the xp by the data amount
        : { $set: { [`character.${field}`]: data } }, // Otherwise, set the specified field
      { new: true }
    );

    if (!updateResult) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Character updated successfully", data: updateResult });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export default Handler;
