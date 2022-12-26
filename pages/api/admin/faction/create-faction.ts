import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { action } = req.body;
    if (action === "create") {
      const { name } = req.body;

      if (!name) {
        res.status(422).json({ message: "Error: Invalid Data", status: 422 });
        return;
      }
      try {
        await prisma.faction.create({ data: { name: name } });
        await prisma.$disconnect();

        res.status(200).json({ message: `Success: Faction, ${name} , added!`, status: 200 });
      } catch (error: any) {
        res.status(422).json({ message: "Error: Faction already exist.", status: 422 });
      }
    } else if (action === "update") {
    }
  } else {
    res.status(500).json({ message: "Error: Route not valid", status: 500 });
  }
};
