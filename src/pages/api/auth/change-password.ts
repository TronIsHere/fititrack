import { hashPassword } from "@/lib/authUtils";
import { decodeVerificationToken } from "@/lib/tokenUtils";
import TokenModel from "@/models/token";
import UserModel from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }
  const { password, confirmPassword, token } = req.body;

  const existingToken = await TokenModel.findOne({ token });
  if (existingToken) {
    const decodedTokenEmail = await decodeVerificationToken(token);
    if (existingToken.email == decodedTokenEmail) {
      const existingUser = await UserModel.findOne({
        email: decodedTokenEmail,
      });
      const hashedPassword = await hashPassword(password);
      existingUser.password = hashedPassword;
      await existingUser.save();
      await TokenModel.deleteOne({ token });
      res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    }
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
};

export default Handler;
