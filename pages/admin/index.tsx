import React, { useState } from "react";
import { useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return { props: {} };
};

const Index = () => {
  return <div className="h-screen">Admin Homepage</div>;
};

export default Index;
