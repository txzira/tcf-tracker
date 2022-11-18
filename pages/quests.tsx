import React from "react";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../lib/prisma";
import { Item, PlayerQuest, Quest, QuestRequirement } from "@prisma/client";
import { useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
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
    await prisma.$disconnect();
    // console.log(factions);

    // console.log("token", token);
    return {
      props: { playerQuests },
    };
  } else {
    return {
      props: {},
    };
  }
};

const Quests = ({
  playerQuests,
}: {
  playerQuests: (PlayerQuest & {
    quest: Quest & {
      questRequirement: (QuestRequirement & {
        item: Item | null;
      })[];
    };
  })[];
}) => {
  console.log(playerQuests);
  const session = useSession();
  if (session) {
    return (
      <div className="flex flex-col items-center md:h-screen">
        <h1>Quest</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Requirements</th>
            </tr>
          </thead>
          <tbody>
            {playerQuests &&
              playerQuests.map((quest) => (
                <tr key={quest.id}>
                  <td>{quest.quest.name}</td>
                  <td>{quest.completed ? "Completed" : "Incomplete"}</td>
                  <td>
                    {quest.quest.questRequirement.map((req) => (
                      <ul key={req.id}>
                        <li>{req.item ? req.item.name : req.task}</li>
                        <li>{req.quantity}</li>
                      </ul>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>Please Login</div>;
  }
};

export default Quests;
