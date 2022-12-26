import { GetServerSideProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import { Faction } from "@prisma/client";
import toast from "react-hot-toast";
import { FloatingInput } from "../../components/Form";
import { Data } from "../../types/response";
import router from "next/router";
import prisma from "../../lib/prisma";
import { trpc } from "../../utils/trpc";

import { getToken } from "next-auth/jwt";
import { FactionModal } from "../../components/Modal";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
  if (token?.role === "admin") {
    const factions = await prisma.faction.findMany();
    await prisma.$disconnect();
    // console.log(factions);

    // console.log("token", token);
    return {
      props: { factions },
    };
  } else {
    return {
      props: {},
    };
  }
};

const Factions = ({ factions }: { factions: Faction[] }) => {
  const [factionName, setFactionName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [faction, setFaction] = useState<Faction>();
  const createFactionTrpc = trpc.createFaction.useMutation();
  const deleteFactionTrpc = trpc.deleteFaction.useMutation();

  const openModal = (faction: Faction) => {
    setFaction(faction);
    setShow(true);
  };

  const createFaction = async () => {
    if (factionName) {
      try {
        await createFactionTrpc.mutateAsync({ name: factionName });
      } catch (err: any) {
        toast.error(err.message);
      }
    } else {
      toast.error("Empty faction name.");
    }
  };

  const deleteFaction = async (factionId: number, factionName: string) => {
    try {
      await deleteFactionTrpc.mutateAsync({ name: factionName, factionId: factionId });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (createFactionTrpc.isSuccess) {
      toast.success(createFactionTrpc.data.message);
      router.reload();
    }
    if (deleteFactionTrpc.isSuccess) {
      toast.success(deleteFactionTrpc.data.message);
      router.reload();
    }
  }, [createFactionTrpc]);

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
};

export default Factions;
