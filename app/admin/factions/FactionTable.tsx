"use client";
import { Faction } from "@prisma/client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FloatingInput } from "../../../components/Form";

import { trpc } from "../../../utils/trpc";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { FactionModal } from "./FactionModal";

function FactionTable({ factions }: { factions: Faction[] | null }) {
  const [factionName, setFactionName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [faction, setFaction] = useState<Faction>();
  const router = useRouter();

  const openModal = (faction: Faction) => {
    setFaction(faction);
    setShow(true);
  };

  const createFaction = async () => {
    if (factionName) {
      try {
        const response = await fetch("/api/admin/faction/crud", {
          method: "POST",

          body: JSON.stringify({ action: "create", factionName }),
        });
        const json = await response.json();
        toast.success(`${json.message}`);
      } catch (error: any) {
        toast.error(error.message);
      }
      router.refresh();
    } else {
      toast.error("Empty faction name.");
    }
  };

  const deleteFaction = async (factionId: number, factionName: string) => {
    try {
      console.log("try2");
      const response = await fetch("/api/admin/faction/crud", {
        method: "POST",
        body: JSON.stringify({ action: "delete", factionName, factionId }),
      });
      const json = await response.json();
      toast.success(json.message);
    } catch (error: any) {
      toast.error(error.message);
    }
    router.refresh();
  };

  return (
    <div>
      <h1>Faction</h1>
      <pre>{factionName}</pre>
      <form className="flex flex-row items-center gap-x-2">
        <FloatingInput name="factionName" id="factionName" value={factionName} label="Faction Name" onChange={setFactionName} />
        <button type="button" className="px-2 border rounded-lg bg-green-500 text-white border-black" onClick={createFaction}>
          Add
        </button>
      </form>
      <div>
        <FactionModal setShow={setShow} show={show} faction={faction} />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          {factions && (
            <tbody>
              {factions.map((faction) => (
                <tr className="text-center" key={faction.id}>
                  <td>{faction.name}</td>
                  <td>
                    <button className="m-2 bg-yellow-500 rounded-lg px-2" type="button" onClick={() => openModal(faction)}>
                      Edit
                    </button>
                    <button
                      className="m-2 bg-red-600 rounded-lg px-2"
                      type="button"
                      onClick={() => deleteFaction(faction.id, faction.name)}
                    >
                      Delete
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
}
export default FactionTable;
