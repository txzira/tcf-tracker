import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

async function createFaction(name: string) {
  try {
    console.log("try1");
    await prisma.faction.create({ data: { name: name } });
    await prisma.$disconnect();
    return { message: `Success: Faction, ${name} , added!`, status: "success" };
  } catch (error: any) {
    console.log(error);
    return { message: "Error: Faction already exist.", status: "failed" };
  }
}

async function updateFaction(id: number, name: string) {
  try {
    console.log("try");
    await prisma.faction.update({
      where: { id: id },
      data: {
        ...(name && { name: name }),
      },
    });
    return { message: `Success: Faction, ${name} , updated!`, status: "success" };
  } catch (err: any) {
    console.log(err);
    return { message: "Error: Faction already exist.", status: "failed" };
    throw err;
  }
}

async function deleteFaction(id: number, name: string) {
  try {
    await prisma.faction.delete({
      where: { id: id },
    });
    return { message: `Faction, ${name}, deleted!`, status: "success" };
  } catch (err: any) {
    throw err;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { action } = req.body;
    if (action === "create") {
      const { factionName } = req.body;

      if (!factionName) {
        res.status(422).json({ message: "Error: Invalid Data", status: 422 });
        return;
      }
      const response = await createFaction(factionName);
      res.status(200).json(response);
    } else if (action === "update") {
      const { name, factionId } = req.body;
      if (!name || !factionId) {
        res.status(422).json({ message: "Error: Invalid Data", status: 422 });
        return;
      }
      const response = updateFaction(Number(factionId), name);
      res.status(200).json(response);
    } else if (action === "delete") {
    }
  } else {
    res.status(500).json({ message: "Error: Route not valid", status: 500 });
  }
};
