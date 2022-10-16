import React, { useState } from "react";
import toast from "react-hot-toast";
import { FloatingInput } from "../Form";

const FactionCRUD = () => {
  const [factionName, setFactionName] = useState("");
  const createFaction = async () => {
    fetch("/api/admin/faction/create-faction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: factionName }),
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
      <h1>Faction</h1>
      <div className="flex flex-row items-center gap-x-2">
        <FloatingInput name="factionName" id="factionName" value={factionName} onChange={setFactionName} label="Faction Name" />
        <button type="button" className="px-2 border rounded-lg bg-green-500 text-white border-black" onClick={createFaction}>
          Add
        </button>
      </div>
    </div>
  );
};

export default FactionCRUD;
