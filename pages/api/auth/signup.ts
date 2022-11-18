import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { hashPassword } from "../../../lib/hash";

// planetscale
// minimum 1 read row per call
// maximum 1 read and 1 write per call
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    if (!email || !email.includes("@") || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }
    //connect to database
    const dbUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    //check existing
    if (dbUser) {
      res.status(422).json({ message: "User already exists" });
      return;
    } else {
      //hash password
      const hashedPassword = await hashPassword(password);
      //insert new user into database
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          role: "user",
          name: name,
        },
      });
      const quests = await prisma.quest.findMany();

      for (let i in quests) {
        await prisma.playerQuest.create({
          data: {
            playerId: newUser.id,
            questId: quests[i].id,
            completed: false,
          },
        });
      }

      console.log("User", newUser);
      res.status(200).json({ message: "User created" });
    }
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
};
