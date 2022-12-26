"use client";
import Link from "next/link";
import React from "react";
import { LoginButton, SignoutButton } from "../components/auth/LoginButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BsClipboardCheck } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { AiFillHome, AiFillGold } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";

const NavContainer = ({ children }: { children: React.ReactNode }) => {
  return <nav className="block w-60 h-screen items-center relative overflow-hidden">{children}</nav>;
};

const NavItem = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <div className="flex items-center relative w-full h-16 font-semibold text-gray-100 ">
      <Link href={href} className="flex items-center rounded-md m-auto py-2 px-2 h-11/12 w-11/12 hover:bg-gray-800 focus:bg-white">
        {children}
      </Link>
    </div>
  );
};

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <NavContainer>
      <Image className="blur-[3px] border-none scale-110 object-cover " src="/images/tcf-image.jpg" fill={true} alt="Nav Background" />
      <div className="text-center w-full relative">
        <Link href="/" className="w-full">
          <Image src="/images/TCF-logo-nbg.png" priority={true} width={180} height={80} alt="logo" className="m-auto" />
        </Link>
        <div className="m-auto  w-10/12 border-b-[1px] "></div>
      </div>
      <div className="relative w-full font-semibold text-gray-100">
        <LoginButton />
        <div className="m-auto  w-10/12 border-b-[1px] "></div>
      </div>
      {session?.user.role === "admin" ? (
        <NavItem href="/admin">
          <div className="pr-6">
            <RiAdminFill size={25} />
          </div>
          Admin
        </NavItem>
      ) : null}
      <NavItem href="/quests">
        <div className="pr-6">
          <FaClipboardList size={25} />
        </div>
        Quests
      </NavItem>
      <NavItem href="/">
        <div className="pr-6">
          <AiFillHome size={25} />
        </div>
        Quarters
      </NavItem>
      <NavItem href="/">
        <div className="pr-6">
          <AiFillGold size={25} />
        </div>
        Items
      </NavItem>
      <div className="relative w-full font-semibold text-gray-100">
        <div className="m-auto  w-10/12 border-b-[1px] "></div>
        <SignoutButton />
      </div>
    </NavContainer>
  );
};

export default Navbar;
