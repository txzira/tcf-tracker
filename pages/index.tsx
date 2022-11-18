import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LoginButton from "../components/auth/LoginButton";
import AuthForm from "../components/auth/AuthForm";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className="h-screen">
      {/* <p>{hello.data.greeting}</p> */}
      <LoginButton />
    </div>
  );
};

export default Home;
