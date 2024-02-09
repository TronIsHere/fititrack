import { ConnectToDatabase } from "@/lib/dbUtils";
import { decodeVerificationToken } from "@/lib/tokenUtils";
import TokenModel from "@/models/token";
import UserModel from "@/models/user";
import type { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { token } = req.body;

  try {
    await ConnectToDatabase();

    const tokenInDatabase = await TokenModel.find({ token });
    if (!tokenInDatabase) {
      return res.status(404).json({ message: "Token not found." });
    }
    const email = await decodeVerificationToken(token);
    if (!email) {
      return res.status(498).json({ message: "Expired token." });
    }
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { isVerified: true } },
      { new: true }
    );
    await TokenModel.findOneAndDelete({ token });
    res
      .status(200)
      .json({ message: "Token found successfully", data: updatedUser });
  } catch (error) {
    console.error("Error in token lookup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default Handler;
