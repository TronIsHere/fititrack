import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectToDatabase } from "@/lib/dbUtils";
import UserModel from "@/models/user";
import TokenModel from "@/models/token";
import { Resend } from "resend";
import EmailTemplate from "@/components/email/emailTemplate";
import { generateVerificationToken } from "@/lib/tokenUtils";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(422).json({
      message: "Invalid email format.",
    });
  }

  await ConnectToDatabase();

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res.status(409).json({ message: "User already verified" });
      }

      const { token } = await generateVerificationToken(email);
      await TokenModel.findOneAndUpdate(
        { email: email },
        { token: token },
        { upsert: true }
      );

      const resend = new Resend(process.env.RESEND_API_TOKEN);
      const confirmLink = `http://localhost:3000/verification?token=${token}`;
      await resend.emails.send({
        from: "noreply@fitittrack.com",
        to: email,
        subject: "Fitittrack Email Confirmation",
        react: EmailTemplate({
          userFirstname: user.name,
          verifyLink: confirmLink,
        }),
      });

      return res.status(200).json({ message: "Verification email resent" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in user lookup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default Handler;
