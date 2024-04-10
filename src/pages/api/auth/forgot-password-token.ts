import { ConnectToDatabase } from "@/lib/dbUtils";
import { generateVerificationToken } from "@/lib/tokenUtils";
import TokenModel from "@/models/token";
import UserModel from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import ForgotPasswordEmailTemplate from "@/components/email/forgotpasswordTemplate";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }
  const { email } = req.body;
  await ConnectToDatabase();

  try {
    const { token } = await generateVerificationToken(email);

    const existingUser = await UserModel.findOne({ email });
    const existingToken = await TokenModel.findOne({ email });
    if (existingUser) {
      const resend = new Resend(process.env.RESEND_API_TOKEN);
      const confirmLink = `http://localhost:3000/forgot-password/verify?token=${token}`;
      try {
        await resend.emails.send({
          from: "noreply@fitittrack.com",
          to: email,
          subject: "Fitittrack Reset Password",
          react: ForgotPasswordEmailTemplate({
            verifyLink: confirmLink,
          }),
        });
        return res
          .status(200)
          .json({ success: true, message: "Link sent successfully" });
      } catch (resendError) {
        console.error("Error sending email:", resendError);
        // Optionally, handle the error more gracefully, e.g., rollback user creation or queue the email for a retry.
        return res
          .status(500)
          .json({ message: "Failed to send verification email" });
      }
    }
  } catch (e) {
    throw e;
  }
};
export default Handler;
