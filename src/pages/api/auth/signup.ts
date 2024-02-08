import type { NextApiRequest, NextApiResponse } from "next";
import { ConnectToDatabase } from "@/lib/dbUtils";
import { hashPassword } from "@/lib/authUtils";
import UserModel from "@/models/User";
import { Resend } from "resend";
import EmailTemplate from "@/components/email/emailTemplate";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { email, password, name } = req.body;

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
    // const db = client.db();
    // const existingUser = await UserModel.findOne({ email });

    // if (existingUser) {
    //   return res.status(409).json({ message: "User already exists" });
    // }
    const resend = new Resend(process.env.RESEND_API_TOKEN);
    const confirmLink = `http://localhost:3000/auth/verification?${"token"}`;
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email",
      // html: `<p>it works! <a href="${confirmLink}">here</a></p>`,
      react: EmailTemplate({ userFirstname: "erwin" }),
    });
    // const hashedPassword = await hashPassword(password);

    // await UserModel.create({
    //   email,
    //   age: 20,
    //   password: hashedPassword,
    //   name,
    // });
    res.status(409).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
  }
};

export default Handler;
