import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../lib/prisma";
import { Faction, Item, PlayerQuest, Quest, QuestRequirement } from "@prisma/client";
import { useSession } from "next-auth/react";
import { RiCheckDoubleLine } from "react-icons/ri";

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
    const factions = await prisma.faction.findMany();
    await prisma.$disconnect();
    // console.log(factions);

    // console.log("token", token);
    return {
      props: { playerQuests, factions },
    };
  } else {
    return {
      props: {},
    };
  }
};

const Quests = ({
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
  const [filterType, setFilterType] = useState("All");
  const [questFilter, setQuestFilter] = useState("None");
  const [availabilityFilter, setAvailabilityFilter] = useState("Available");

  console.log(playerQuests);
  const session = useSession();
  console.log(factions);

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col items-center md:h-screen">
        <h1>Quest</h1>
        <pre>{filterType}</pre>
        <pre>{questFilter}</pre>
        <pre>{availabilityFilter}</pre>

        <div className="w-11/12 grid gap-5 grid-cols-3 ">
          <div className="grid grid-cols-3 justify-center bg-slate-800 h-12 px-10" id="filters">
            <button
              className={`border hover:bg-slate-500 ${filterType === "All" ? "bg-slate-500" : ""}`}
              onClick={() => setFilterType("All")}
            >
              All
            </button>
            <button
              className={`border hover:bg-slate-500 ${filterType === "Maps" ? "bg-slate-500" : ""}`}
              onClick={() => setFilterType("Maps")}
            >
              Maps
            </button>
            <button
              className={`border hover:bg-slate-500 ${filterType === "Factions" ? "bg-slate-500" : ""}`}
              onClick={() => setFilterType("Factions")}
            >
              Factions
            </button>
          </div>
          {filterType === "All" && (
            <div className="grid grid-cols-1 justify-center bg-slate-800 col-span-2 h-12 px-10 ">
              <button className="border hover:bg-slate-500">Everything</button>
            </div>
          )}
          {filterType === "Maps" && (
            <div className="grid grid-cols-4 justify-center bg-slate-800 col-span-2 h-12 px-10 ">
              <button
                className={`border hover:bg-slate-500 ${questFilter === "Bright Sands" ? "bg-slate-500" : ""}`}
                onClick={() => setQuestFilter("Bright Sands")}
              >
                Bright Sands
              </button>
              <button
                className={`border hover:bg-slate-500 ${questFilter === "Crescent Falls" ? "bg-slate-500" : ""}`}
                onClick={() => setQuestFilter("Crescent Falls")}
              >
                Crescent Falls
              </button>
              <button
                className={`border hover:bg-slate-500 ${questFilter === "Tharis Island" ? "bg-slate-500" : ""}`}
                onClick={() => setQuestFilter("Tharis Island")}
              >
                Tharis Island
              </button>
              <button
                className={`border hover:bg-slate-500 ${questFilter === "Global" ? "bg-slate-500" : ""}`}
                onClick={() => setQuestFilter("Global")}
              >
                Global
              </button>
            </div>
          )}

          {filterType === "Factions" && (
            <div className="grid grid-cols-3 justify-center bg-slate-800 col-span-2 h-12 px-10 ">
              <button
                className={`border hover:bg-slate-500 ${questFilter === "ICA" ? "bg-slate-500" : ""}`}
                onClick={() => setQuestFilter("ICA")}
              >
                ICA
              </button>
              <button
                className={`border hover:bg-slate-500 ${questFilter === "Osiris" ? "bg-slate-500" : ""}`}
                onClick={() => setQuestFilter("Osiris")}
              >
                Osiris
              </button>
              <button
                className={`border hover:bg-slate-500 ${questFilter === "Korolev" ? "bg-slate-500" : ""}`}
                onClick={() => setQuestFilter("Korolev")}
              >
                Korolev
              </button>
            </div>
          )}
          <div className="grid grid-cols-3 justify-center bg-slate-800 h-12 px-10 ">
            <button
              className={`border hover:bg-slate-500 ${availabilityFilter === "Available" ? "bg-slate-500" : ""}`}
              onClick={() => setAvailabilityFilter("Available")}
            >
              Available
            </button>
            <button
              className={`border hover:bg-slate-500 ${availabilityFilter === "Locked" ? "bg-slate-500" : ""}`}
              onClick={() => setAvailabilityFilter("Locked")}
            >
              Locked
            </button>
            <button
              className={`border hover:bg-slate-500 ${availabilityFilter === "Completed" ? "bg-slate-500" : ""}`}
              onClick={() => setAvailabilityFilter("Completed")}
            >
              Completed
            </button>
          </div>
          <div className="grid grid-cols-1 justify-center bg-slate-800 h-12 px-10 col-span-2 ">
            <button>You</button>
          </div>
        </div>
        <div className="flex flex-col bg-stone-800 mt-4 w-11/12 py-4">
          <div className="grid grid-cols-4 text-center">
            <div>Name</div>
            <div>Status</div>
            <div>Requirements</div>
            <div></div>
          </div>
          <div>
            {playerQuests &&
              playerQuests.map((quest) => (
                <div className="flex flex-col w-full">
                  <div key={quest.id} className="grid grid-cols-4 text-center py-4">
                    <div>{quest.quest.name}</div>
                    <div>{quest.completed ? "Completed" : "Incomplete"}</div>
                    <div>
                      {quest.quest.questRequirement.map((req) => (
                        <div key={req.id}>
                          <span>{`${req.item ? req.item.name : req.task} `} </span>
                          <span>{req.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <button className="border p-6 hover:bg-stone-700">
                        <RiCheckDoubleLine />
                      </button>
                    </div>
                  </div>
                  <div className=" flex justify-center m-auto w-11/12 border-b"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Please Login</div>;
  }
};

export default Quests;
