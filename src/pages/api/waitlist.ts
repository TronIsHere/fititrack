// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/lib/dbConnect";
import waitlist from "@/models/waitlist";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const emails = await waitlist.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: emails.length });
      } catch (error) {
        res.json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log(req.body.email);
        const email = await waitlist.create({
          email: req.body.email,
        }); /* create a new model in the database */
        res.status(201).json({ success: true, data: email });
      } catch (error: any) {
        if (error.code == 11000) {
          res.json({ success: false, duplicated: true });
        }
        res.json({ success: false });
      }
      break;
    default:
      res.json({ success: false });
      break;
  }
}
