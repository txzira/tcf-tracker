import React, { useState } from "react";
import { useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";

export const getStaticProps: GetServerSideProps = async () => {
  const factions = await prisma.faction.findMany();
  await prisma.$disconnect();

  return {
    props: { factions },
  };
};

const Index = () => {
  const { data: session } = useSession();

  if (session?.user.role === "admin") {
    return <div>Admin Homepage</div>;
  } else {
    return <div>Unauthorized User.</div>;
  }
};

export default Index;
