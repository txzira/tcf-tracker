import Link from "next/link";
import React from "react";
import { LoginButton, SignoutButton } from "../components/auth/LoginButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BsClipboardCheck } from "react-icons/bs";
import { AiOutlineHome, AiOutlineGold } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import { IconContext } from "react-icons";

const NavItem = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const { data: session } = useSession();

  return (
    <div className="relative w-full font-semibold  text-gray-100">
      <Link href={href}>
        <a className="flex items-center justify-center h-16 w-full">{children}</a>
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
      {session?.user.role === "admin" ? (
        <NavItem href="/admin">
          <RiAdminLine color="white" />
          Admin
        </NavItem>
      ) : null}
      <NavItem href="/quests">
        <BsClipboardCheck />
        Quests
      </NavItem>
      <NavItem href="/">
        <AiOutlineHome />
        Quarters
      </NavItem>
      <NavItem href="/">
        <AiOutlineGold />
        Items
      </NavItem>

      <div className="relative w-full font-semibold text-gray-100">
        <SignoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
