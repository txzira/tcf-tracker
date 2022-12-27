"use client";
import { Faction } from "@prisma/client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FloatingInput } from "../../../components/Form";
import { FactionModal } from "../../../components/Modal";
import { trpc } from "../../../utils/trpc";
import { useRouter } from "next/navigation";
import { z } from "zod";

function FactionTable({ factions }: { factions: Faction[] | null }) {
  const [factionName, setFactionName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [faction, setFaction] = useState<Faction>();

  const openModal = (faction: Faction) => {
    setFaction(faction);
    setShow(true);
  };

  const createFaction = async () => {
    if (factionName) {
      console.log("try");
      try {
        const response = await fetch("/api/admin/faction/crud", {
          method: "POST",

          body: JSON.stringify({ factionName }),
        });
        console.log(response);
        // await createFactionTrpc.mutateAsync({ name: factionName });
      } catch (err: any) {
        toast.error(err.message);
      }
    } else {
      toast.error("Empty faction name.");
    }
  };

  const deleteFaction = async (factionId: number, factionName: string) => {
    try {
      // await deleteFactionTrpc.mutateAsync({ name: factionName, factionId: factionId });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // useEffect(() => {
  //   if (createFactionTrpc.isSuccess) {
  //     toast.success(createFactionTrpc.data.message);
  //     useRouter().refresh();
  //   }
  //   if (deleteFactionTrpc.isSuccess) {
  //     toast.success(deleteFactionTrpc.data.message);
  //     useRouter().refresh();
  //   }
  // }, [createFactionTrpc]);

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
        {/* <FactionModal setShow={setShow} show={show} faction={faction} /> */}
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
