import Link from "next/link";
import React from "react";
import LoginButton from "../components/auth/LoginButton";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex flex-col w-60 h-screen items-center relative">
      <Image className="blur-[3px] border-none scale-110" src="/images/tcf-image.jpg" layout="fill" objectFit="cover" />
      <div className="text-center w-full relative ">
        <Link href="/">
          <a className="w-full ">
            <Image src="/images/TCF-logo-nbg.png" priority={true} width={180} height={80} alt="logo" />
          </a>
        </Link>
        <div className="m-auto  w-10/12 border-b-[1px] "></div>
      </div>
      <div className="relative w-full text-center font-semibold  text-gray-100">
        <LoginButton />
        <div className="m-auto  w-10/12 border-b-[1px] "></div>
      </div>
      {session?.user.role && (
        <div className="relative w-full text-center font-semibold text-gray-100">
          <button className="h-16 w-full ">
            <Link href="/admin">
              <a>Admin</a>
            </Link>
          </button>
          <div className="m-auto  w-10/12 border-b-[1px] "></div>
        </div>
      )}
      <div className="relative w-full text-center font-semibold  text-gray-100">
        <button className="h-16 w-full">
          <Link href="/quests">
            <a>Quests</a>
          </Link>
        </button>
        <div className="m-auto  w-10/12 border-b-[1px] "></div>
      </div>
      <div className="relative w-full text-center font-semibold text-gray-100">
        <button className="h-16 w-full">
          <Link href="/">
            <a>Quarters</a>
          </Link>
        </button>
        <div className="m-auto  w-10/12 border-b-[1px] "></div>
      </div>
    </nav>
  );
};

export default Navbar;
