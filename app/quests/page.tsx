import getToken from "../../utils/getToken";
import prisma from "../../lib/prisma";
import QuestTable from "./QuestTable";

const getData = async () => {
  const token = await getToken();
  console.log(token);

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
