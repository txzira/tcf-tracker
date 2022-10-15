import React, { useState } from "react";
import toast from "react-hot-toast";
import { FloatingInput } from "../../Form";

const QuestCRUD = () => {
  const [questName, setQuestName] = useState("");
  const [factionId, setFactionId] = useState("");

  const createFaction = async () => {
    fetch("/api/admin/quest/create-quest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: questName, factionId }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status.toString().startsWith("2")) {
          toast.success(response.message);
        }
      });
  };

  return (
    <div>
      <h1>Quest</h1>
      <div className="flex flex-row items-center gap-x-2">
        <FloatingInput name="questName" id="questName" value={questName} onChange={setQuestName} label="Quest Name" />
        <FloatingInput name="factionId" id="factionId" value={factionId} onChange={setFactionId} label="Faction" />
        <button type="button" className="px-2 border rounded-lg bg-green-500 text-white border-black" onClick={createFaction}>
          Add
        </button>
      </div>
    </div>
  );
};

export default QuestCRUD;
