import { ConnectToDatabase } from "@/lib/dbUtils";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }
  const { email } = req.body;
  const client = await ConnectToDatabase();
  try {
    // const db = client.db();
    const userData = "";
    // await db.collection("users").findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    // client.close();
  }
};
export default Handler;
