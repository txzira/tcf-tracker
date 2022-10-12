import type { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/hash";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
};
