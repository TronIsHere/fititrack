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
  const emails = await waitlist.find(
    {}
  ); /* find all the data in our database */
  res.status(200).json({ success: true, data: emails });
  // case "POST":
  //   try {
  //     const pet = await Pet.create(
  //       req.body
  //     ); /* create a new model in the database */
  //     res.status(201).json({ success: true, data: pet });
  //   } catch (error) {
  //     res.status(400).json({ success: false });
  //   }
  //   break;
  // default:
  //   res.status(400).json({ success: false });
  //   break;
}
