import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectToDatabase } from "@/lib/dbUtils";
import { hashPassword } from "@/lib/authUtils";
import UserModel from "@/models/user";
import { Resend } from "resend";
import EmailTemplate from "@/components/email/emailTemplate";
import { generateVerificationToken } from "@/lib/tokenUtils";
import TokenModel from "@/models/token";
import { addDays, format } from "date-fns";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { email, password, name, dob } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({
      message:
        "Insert correct email or password should be more than 8 characters.",
    });
  }

  await ConnectToDatabase();

  try {
    const { token } = await generateVerificationToken(email);

    const existingUser = await UserModel.findOne({ email });
    const existingToken = await TokenModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (existingToken) {
      if (existingUser === existingToken.email) {
        return res.status(409).json({ message: "User already exists" });
      }
    }
    await TokenModel.create({
      email,
      token,
    });
    const resend = new Resend(process.env.RESEND_API_TOKEN);
    const confirmLink = `${process.env.URL}/verification?token=${token}`;
    try {
      await resend.emails.send({
        from: "noreply@fitittrack.com",
        to: email,
        subject: "Fitittrack Email Confirmation",
        react: EmailTemplate({ userFirstname: name, verifyLink: confirmLink }),
      });
    } catch (resendError) {
      console.error("Error sending email:", resendError);
      // Optionally, handle the error more gracefully, e.g., rollback user creation or queue the email for a retry.
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }
    const hashedPassword = await hashPassword(password);
    const trialEndDate = addDays(new Date(), 7);
    const formattedTrialEndDate = format(trialEndDate, "yyyy-MM-dd");
    await UserModel.create({
      email,
      dob,
      password: hashedPassword,
      name,
      trial: formattedTrialEndDate, // Store as ISO string
      paid: false,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in token lookup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default Handler;
