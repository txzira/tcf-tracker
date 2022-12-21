import { GetServerSideProps } from "next";
import { decode } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import { Faction, Item, PlayerQuest, Quest, QuestRequirement } from "@prisma/client";
import QuestTable from "./QuestTable";
import { cookies } from "next/headers";

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
  if (token?.role === "admin" || token?.role === "user") {
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
    const factions = await prisma.faction.findMany();
    await prisma.$disconnect();
    console.log(factions);

    return {
      props: { playerQuests, factions },
    };
  } else {
    return {
      props: {},
    };
  }
};

const Quests = async ({
  playerQuests,
  factions,
}: {
  playerQuests: (PlayerQuest & {
    quest: Quest & {
      questRequirement: (QuestRequirement & {
        item: Item | null;
      })[];
    };
  })[];
  factions: Faction[];
}) => {
  const data = await getData();
  return (
    <>
      <QuestTable playerQuests={data.props.playerQuests} />
    </>
  );
};

export default Quests;
