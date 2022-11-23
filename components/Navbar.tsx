import Link from "next/link";
import React from "react";
import { LoginButton, SignoutButton } from "../components/auth/LoginButton";
import { useSession } from "next-auth/react";
import Image from "next/image";

const NavItem = ({ label, href }: { label: string; href: string }) => {
  const { data: session } = useSession();

  return (
    <div className="relative w-full font-semibold  text-gray-100">
      <Link href={href}>
        <a className="flex items-center justify-center h-16 w-full">{label}</a>
      </Link>
      <div className="m-auto  w-10/12 border-b-[1px] "></div>
    </div>
  );
};

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
      <div className="relative w-full  font-semibold  text-gray-100">
        <LoginButton />
        <div className="m-auto  w-10/12 border-b-[1px] "></div>
      </div>
      {session?.user.role && <NavItem label="Admin" href="/admin" />}
      <NavItem label="Quests" href="/quests" />
      <NavItem label="Quarters" href="/" />
      <NavItem label="Items" href="/" />

      <div className="relative w-full font-semibold text-gray-100">
        <SignoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
