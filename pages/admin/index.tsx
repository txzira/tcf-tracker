import React, { useState } from "react";
import { useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return { props: {} };
};

const Index = () => {
  return <div>Admin Homepage</div>;
};

export default Index;
