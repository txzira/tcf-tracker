import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, factionId } = req.body;
    if (!name) {
      res.status(422).json({ message: "Error: Invalid Data", status: 422 });
      return;
    }
    try {
      await prisma.faction.update({
        where: { id: factionId },
        data: {
          ...(name && { name: name }),
        },
      });
      res.status(200).json({ message: `Success: Faction, ${name} , updated!`, status: "ok" });
    } catch (err: any) {
      console.log(err);
      res.status(422).json({ message: "Error: Faction already exist.", status: 422 });
      throw err;
    }
  } else {
    res.status(500).json({ message: "Error: Route not valid", status: 500 });
  }
};
