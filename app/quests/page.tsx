import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import QuestTable from "./QuestTable";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is missing");
}

const getToken = async () => {
  return await decode({
    token: cookies()
      .getAll()
      .find((cookie) => cookie.name.includes("next-auth.session-token"))?.value,
    secret: process.env.NEXTAUTH_SECRET as string,
  });
};

const getData = async () => {
  const token = await getToken();
  token;
  console.log(token);
  if (token?.role === "admin" || token?.role === "user") {
    console.log("hello");
    const playerQuests = await prisma.playerQuest.findMany({
      where: { playerId: token.id },
      include: {
        quest: {
          include: {
            questRequirement: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    console.log(playerQuests);
    // const factions = await prisma.faction.findMany();
    await prisma.$disconnect();
    // console.log(factions);

    return {
      props: { playerQuests },
    };
  } else {
    return {
      props: {},
    };
  }
};

const Quests = async () => {
  const data = await getData();
  return (
    <>
      <QuestTable playerQuests={data.props.playerQuests} />
    </>
  );
};

export default Quests;
