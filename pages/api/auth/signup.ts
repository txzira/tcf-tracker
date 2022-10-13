import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../../lib/hash";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(req.body);
    //get email and password
    res.status(200);
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
};
