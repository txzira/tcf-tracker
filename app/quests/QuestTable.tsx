"use client";
import { Item, PlayerQuest, Quest, QuestRequirement } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaClipboardCheck } from "react-icons/fa";
import { IoMdCompass } from "react-icons/io";
import { RiCheckDoubleLine, RiUserFill } from "react-icons/ri";

const QuestTable = ({
  playerQuests,
}: {
  playerQuests:
    | (PlayerQuest & {
        quest: Quest & {
          questRequirement: (QuestRequirement & {
            item: Item | null;
          })[];
        };
      })[]
    | undefined;
}) => {
  const [filterType, setFilterType] = useState("All");
  const [questFilter, setQuestFilter] = useState("None");
  const [availabilityFilter, setAvailabilityFilter] = useState("Available");

  const session = useSession();
  // console.log(session);
  // console.log(factions);

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
              className={`flex items-center justify-center border hover:bg-slate-500 ${filterType === "All" ? "bg-slate-500" : ""}`}
              onClick={() => setFilterType("All")}
            >
              <FaClipboardCheck size={16} />
              All
            </button>
            <button
              className={`flex items-center justify-center border hover:bg-slate-500 ${filterType === "Maps" ? "bg-slate-500" : ""}`}
              onClick={() => setFilterType("Maps")}
            >
              <IoMdCompass size={16} />
              Maps
            </button>
            <button
              className={`flex items-center justify-center border hover:bg-slate-500 ${filterType === "Factions" ? "bg-slate-500" : ""}`}
              onClick={() => setFilterType("Factions")}
            >
              <RiUserFill size={16} />
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
                <div key={quest.questId} className="flex flex-col w-full">
                  <div className="grid grid-cols-4 text-center py-4">
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

export default QuestTable;
