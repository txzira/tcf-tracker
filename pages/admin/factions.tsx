import { GetServerSideProps } from "next";
import React, { useRef } from "react";
import { Faction } from "@prisma/client";
import toast from "react-hot-toast";
import { FloatingInputRef } from "../../components/Form";
import { Data } from "../../types/response";
import router from "next/router";
import prisma from "../../lib/prisma";
import { getToken } from "next-auth/jwt";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
  if (token?.role === "admin") {
    const factions = await prisma.faction.findMany();
    await prisma.$disconnect();
    console.log(factions);

    console.log("token", token);
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
  const factionName = useRef<HTMLInputElement>(null);
  const createFaction = async (event: any) => {
    event.preventDefault();
    console.log(factionName.current?.value);
    const getRes = await fetch("/api/admin/faction/create-faction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: factionName.current?.value }),
    });
    const res: Data = await getRes.json();

    if (res.status.toString().startsWith("2")) {
      toast.success(res.message);
      router.reload();
    }
  };
  return (
    <div>
      <h1>Faction</h1>
      <div className="flex flex-row items-center gap-x-2">
        <FloatingInputRef name="factionName" id="factionName" ref={factionName} label="Faction Name" />
        <button
          type="button"
          className="px-2 border rounded-lg bg-green-500 text-white border-black"
          onClick={(event) => createFaction(event)}
        >
          Add
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          {factions && (
            <tbody>
              {factions.map((faction) => (
                <tr className="text-center" key={faction.id}>
                  <td>{faction.name}</td>
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
