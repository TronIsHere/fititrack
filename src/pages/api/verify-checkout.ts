import UserModel from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const { sessionId } = req.query;
    const sessionId = req.query.sessionId;

    if (!sessionId) {
      res.status(400).json({ error: "Missing sessionId in query parameters" });
      return;
    }

    let stripeVerify = await stripe.checkout.sessions.retrieve(
      sessionId as string
    );
    if (stripeVerify.payment_status === "paid") {
      const userEmail = stripeVerify.customer_details?.email;

      if (!userEmail) {
        res.status(400).json({ error: "No email found in the Stripe session" });
        return;
      }

      // Find the user and update their paid status
      const updatedUser = await UserModel.findOneAndUpdate(
        { email: userEmail },
        { paid: true },
        { new: true } // This option returns the updated document
      );

      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json({
        paid: true,
        status: stripeVerify.payment_status,
        email: userEmail,
        message: "User payment status updated successfully",
      });
    } else {
      res.status(200).json({
        paid: false,
        status: stripeVerify.payment_status,
        email: stripeVerify.customer_details?.email,
        message: "Payment not completed",
      });
    }
  } catch (error) {
    console.error("Error in payment verification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
