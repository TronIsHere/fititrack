import { ConnectToDatabase } from "@/lib/dbUtils";
import UserModel from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { field, data, email } = req.body;

  await ConnectToDatabase();

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (field === "xp") {
      user.character.xp += data;

      if (user.character.xp >= user.character.maxXP) {
        // Level up
        user.character.level += 1;
        user.character.xp -= user.character.maxXP;

        // Update maxXP with growth factor and randomness
        const increaseFactor = 2; // Adjust this factor to control the growth rate
        const randomness = 0.3; // Maximum percentage of randomness
        const randomAdjustment =
          1 + Math.random() * randomness - randomness / 2;
        user.character.maxXP = Math.floor(
          user.character.maxXP * increaseFactor * randomAdjustment
        );
      }
    } else {
      // Handle other fields
      user.set(`character.${field}`, data);
    }

    const updateResult = await user.save();

    res
      .status(200)
      .json({ message: "Character updated successfully", data: updateResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default Handler;
