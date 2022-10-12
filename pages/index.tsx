import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LoginButton from "../components/auth/LoginButton";
import AuthForm from "../components/auth/AuthForm";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const hello = trpc.hello.useQuery({ text: "client" });
  const { data: session } = useSession();

  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <p>{hello.data.greeting}</p> */}
      <LoginButton />
    </>
  );
};

export default Home;
