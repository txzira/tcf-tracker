import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  // const { data: session } = useSession();

  return <div className="h-screen">Home</div>;
};

export default Home;
