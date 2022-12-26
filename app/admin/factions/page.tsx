import { GetServerSideProps } from "next";
import { Faction } from "@prisma/client";
import toast from "react-hot-toast";
import { FloatingInput } from "../../../components/Form";
import { Data } from "../../../types/response";
import router from "next/router";
import prisma from "../../../lib/prisma";
import { trpc } from "../../../utils/trpc";

import { FactionModal } from "../../../components/Modal";
import FactionTable from "./FactionTable";
import getToken from "../../../utils/getToken";

const getData = async () => {
  const token = await getToken();
  if (token?.role === "admin") {
    const factions = await prisma.faction.findMany();
    await prisma.$disconnect();
    return factions;
  } else return null;
};

const Factions = async ({ children }: { children: React.ReactNode }) => {
  const factions = await getData();
  return (
    <div>
      {" "}
      <FactionTable factions={factions} />
    </div>
  );
};

export default Factions;
