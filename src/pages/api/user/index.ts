import { ConnectToDatabase } from "@/lib/dbUtils";
import UserModel from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }
  const { email } = req.body;
  await ConnectToDatabase();
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    // client.close();
  }
};
export default Handler;
