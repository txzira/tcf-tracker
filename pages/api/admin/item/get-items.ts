import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const items = await prisma.item.findMany();
      // console.log(items);
      res.status(200).json(items);
    } catch (error: any) {
      console.log(error.message);
      res.status(422).json({ message: "Error: items dont exist.", status: 422 });
    }
  } else {
    res.status(500).json({ message: "Error: Route not valid", status: 500 });
  }
};
