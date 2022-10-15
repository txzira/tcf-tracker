import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { questId, itemId, quantity, task } = req.body;
    console.log(questId, itemId, quantity, task);
    if (!questId || !quantity) {
      res.status(422).json({ message: "Error: Invalid Data", status: 422 });
      return;
    }
    try {
      await prisma.questRequirement.create({
        data: {
          task: task,
          quantity: Number(quantity),
          quest: { connect: { id: Number(questId) } },
          ...(itemId && { item: { connect: { id: Number(itemId) } } }),
        },
      });
      await prisma.$disconnect();
      res.status(200).json({ message: `Success: Quest requirement added!`, status: 200 });
    } catch (error: any) {
      console.log(error.message);
      res.status(422).json({ message: "Error: Quest already exist.", status: 422 });
    }
  } else {
    res.status(500).json({ message: "Error: Route not valid", status: 500 });
  }
};
