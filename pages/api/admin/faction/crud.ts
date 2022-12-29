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

async function updateFaction(id: number, oldName: string, name: string) {
  try {
    console.log("try");
    await prisma.faction.update({
      where: { id: id },
      data: {
        ...(name && { name: name }),
      },
    });
    return { message: `Success: Faction ${oldName} renamed to, ${name}!`, status: "success" };
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
    const reqBody = await JSON.parse(req.body);
    let response;
    let status;
    const { action } = reqBody;
    console.log(action);
    if (action === "create") {
      //create faction
      const { factionName } = reqBody;
      if (!factionName) {
        res.status(422).json({ message: "Error: Invalid Data", status: 422 });
        return;
      }
      response = await createFaction(factionName);
      status = 200;
    } else if (action === "update") {
      //update faction
      const { factionName, factionId, oldFactionName } = reqBody;
      if (!factionName || !factionId) {
        res.status(422).json({ message: "Error: Invalid Data", status: 422 });
        return;
      }
      response = await updateFaction(Number(factionId), oldFactionName, factionName);
      status = 200;
    } else if (action === "delete") {
      // delete faction
      console.log("delete");
      const { factionName, factionId } = reqBody;
      if (!factionName || !factionId) {
        res.status(422).json({ message: "Error: Invalid Data", status: 422 });
        return;
      }
      response = await deleteFaction(Number(factionId), factionName);
      status = 200;
    } else {
      response = { message: "Error: Not Found", status: "Not Found" };
      status = 404;
    }
    res.status(status).json(response);
    return;
  } else {
    res.status(500).json({ message: "Error: Route not valid", status: 500 });
  }
};
