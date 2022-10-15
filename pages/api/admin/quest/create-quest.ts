import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, factionId } = req.body;
    console.log(name, factionId);
    if (!name) {
      res.status(422).json({ message: "Error: Invalid Data", status: 422 });
      return;
    }
    try {
      await prisma.quest.create({ data: { name: name, faction: { connect: { id: Number(factionId) } } } });
      await prisma.$disconnect();
      res.status(200).json({ message: `Success: Quest, ${name} , added!`, status: 200 });
    } catch (error: any) {
      console.log(error.message);
      res.status(422).json({ message: "Error: Quest already exist.", status: 422 });
    }
  } else {
    res.status(500).json({ message: "Error: Route not valid", status: 500 });
  }
};
