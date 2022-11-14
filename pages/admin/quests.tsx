import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FloatingInputRef } from "../../components/Form";
import { Data } from "../../types/response";
import prisma from "../../lib/prisma";
import { Faction, Quest } from "@prisma/client";
import Modal from "../../components/Modal";
import { getToken } from "next-auth/jwt";

type quest = Quest & { faction: Faction };

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
  if (token?.role === "admin") {
    const quests = await prisma.quest.findMany({ include: { faction: true, questRequirement: true } });
    const factions = await prisma.faction.findMany();
    console.log(factions);
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
  const [show, setShow] = useState(false);
  const name = useRef<HTMLInputElement>(null);
  const factionId = useRef<HTMLSelectElement>(null);
  console.log(quests);
  console.log(factions);
  const createQuest = async () => {
    const getRes = await fetch("/api/admin/quest/create-quest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.current?.value, factionId: factionId.current?.value }),
    });
    const res: Data = await getRes.json();

    if (res.status.toString().startsWith("2")) {
      toast.success(res.message);
      router.reload();
    }
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

  const updateQuest = async () => {
    const getRes = await fetch("/api/admin/quest/update-quest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ id: questId, name: questName, factionId: factionId }),
    });
    const res: Data = await getRes.json();
    if (res.status.toString().startsWith("2")) {
      toast.success(res.message);
      router.reload();
    }
  };

  return (
    <div>
      <Modal show={show} setShow={setShow} />
      <h1>Quest</h1>
      <div className="flex flex-row items-center gap-x-2">
        <FloatingInputRef name="questName" id="questName" ref={name} label="Quest Name" />
        <select ref={factionId} className="text-black">
          <option defaultChecked>--Select Faction--</option>
          {factions &&
            factions.map((faction) => (
              <option key={faction.id} value={faction.id}>
                {faction.name}
              </option>
            ))}
        </select>
        <button type="button" className="px-2 border rounded-lg bg-green-500 text-white border-black" onClick={createQuest}>
          Add
        </button>
      </div>
      <div>
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
                    <button className="px-2 border rounded-lg bg-yellow-500 text-white border-black" onClick={() => setShow(!show)}>
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
