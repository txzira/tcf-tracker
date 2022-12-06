import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FloatingInput, FloatingInputRef } from "../../components/Form";
import { Data } from "../../types/response";
import prisma from "../../lib/prisma";
import { Faction, Quest } from "@prisma/client";
// import Modal from "../../components/Modal";
import { getToken } from "next-auth/jwt";
import { QuestModal } from "../../components/Modal";
import { trpc } from "../../utils/trpc";

type quest = Quest & { faction: Faction };

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
  if (token?.role === "admin") {
    const quests = await prisma.quest.findMany({ include: { faction: true, questRequirement: true } });
    const factions = await prisma.faction.findMany();
    // console.log(factions);
    return {
      props: { quests, factions },
    };
  } else {
    return {
      props: {},
    };
  }
};

const Quests = ({ quests, factions }: { quests: quest[]; factions: Faction[] }) => {
  const [questName, setQuestName] = useState<string>("");
  const [show, setShow] = useState(false);
  const [quest, setQuest] = useState<Quest>();
  const name = useRef<HTMLInputElement>(null);
  const [id, setId] = useState(0);
  const factionId = useRef<HTMLSelectElement>(null);

  const createQuestTrpc = trpc.createQuest.useMutation();
  // const deleteQuestTrpc = trpc.deleteQuest.useMutation();

  const openModal = (quest: Quest) => {
    setQuest(quest);
    setShow(true);
  };

  const createQuest = async () => {
    if (questName) {
      try {
        const request = await createQuestTrpc.mutateAsync({ name: questName, factionId: Number(factionId.current?.value) });
        request.status === "success" ? toast.success(request.message) : toast.error(request.message);
        router.reload();
      } catch (err: any) {
        throw err;
      }
    }
    // const getRes = await fetch("/api/admin/quest/create-quest", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: name.current?.value, factionId: factionId.current?.value }),
    // });
    // const res: Data = await getRes.json();

    // if (res.status.toString().startsWith("2")) {
    //   toast.success(res.message);
    //   router.reload();
    // }
  };
  const deleteQuest = async (questId: number, questName: string) => {
    const getRes = await fetch("/api/admin/quest/delete-quest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: questId, name: questName }),
    });
    const res: Data = await getRes.json();
    if (res.status.toString().startsWith("2")) {
      toast.success(res.message);
      router.reload();
    }
  };

  return (
    <div>
      <QuestModal show={show} setShow={setShow} quest={quest} />
      <h1>Quest</h1>
      <div className="flex flex-row items-center gap-x-2">
        <FloatingInput name="questName" id="questName" value={questName} onChange={setQuestName} label="Quest Name" />
        <select ref={factionId} className="text-black">
          <option defaultChecked>--Select Faction--</option>
          {factions &&
            factions.map((faction) => (
              <option key={faction.id} value={faction.id}>
                {faction.name}
              </option>
            ))}
        </select>
        <button type="button" className="px-2 border rounded-lg bg-green-500 text-white border-black" onClick={() => createQuest()}>
          Add
        </button>
      </div>
      <div className="">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Faction</th>
              <th>Actions</th>
            </tr>
          </thead>
          {quests && (
            <tbody>
              {quests.map((quest) => (
                <tr className="text-center" key={quest.id}>
                  <td>{quest.name}</td>
                  <td>{quest.faction.name}</td>
                  <td>
                    <button
                      className="px-2 border rounded-lg bg-red-500 text-white border-black"
                      onClick={() => deleteQuest(quest.id, quest.name)}
                    >
                      Delete
                    </button>
                    <button className="px-2 border rounded-lg bg-yellow-500 text-white border-black" onClick={() => openModal(quest)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              <tr></tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Quests;
