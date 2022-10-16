import React, { useState } from "react";
import { useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { Faction } from "@prisma/client";
import FactionCRUD from "../../components/admin/Faction";
import QuestCRUD from "../../components/admin/Quest";
import QuestRequirement from "../../components/admin/QuestRequirement";
import prisma from "../../lib/prisma";

export const getStaticProps: GetServerSideProps = async () => {
  const factions = await prisma.faction.findMany();
  await prisma.$disconnect();

  console.log(factions);
  return {
    props: { factions },
  };
};

const Index = ({ factions }: { factions: Faction[] }) => {
  console.log(factions);
  const { data: session } = useSession();

  if (session?.user.role === "admin") {
    return (
      <>
        <FactionCRUD />
        <QuestCRUD />
        <QuestRequirement />
      </>
    );
  } else {
    return <div>Unauthorized User.</div>;
  }
};

export default Index;
