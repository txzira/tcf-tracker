import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";
import { Data } from "../../../../types/response";

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    const { name, kMarks, factionPoints } = req.body;
    console.log(name, kMarks, factionPoints);
    if (!name || !kMarks || !factionPoints) {
      res.status(422).json({ message: "Error: Invalid Data", status: 422 });
      return;
    }
    try {
      await prisma.item.create({ data: { name, kMarks: Number(kMarks), factionPoints: Number(factionPoints) } });
      res.status(200).json({ message: `Success: Item, ${name} , added!`, status: 200 });
    } catch (error: any) {
      console.log(error.message);
      res.status(422).json({ message: "Error: Quest already exist.", status: 422 });
    }
  } else {
    res.status(500).json({ message: "Error: Route not valid", status: 500 });
  }
};
