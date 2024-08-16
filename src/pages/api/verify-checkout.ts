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
    res.status(200).json({
      paid: stripeVerify.payment_status === "paid",
      status: stripeVerify.payment_status,
      email: stripeVerify.customer_details!.email, // Added null check
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
