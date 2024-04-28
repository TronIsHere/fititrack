import { ConnectToDatabase } from "@/lib/dbUtils";
import UserModel from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }
  const { date, weight, email } = req.body;
  await ConnectToDatabase();
  try {
    const updateResult = await UserModel.findOneAndUpdate(
      { email: email },
      { $push: { weights: { date, weight } } },
      { new: true } // Returns the updated document
    );
    if (!updateResult) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "success", data: updateResult });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    // client.close();
  }
};
export default Handler;
