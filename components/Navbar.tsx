import Link from "next/link";
import React from "react";
import LoginButton from "../components/auth/LoginButton";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  // console.log(session);
  return (
    <div className="w-screen bg-black">
      <nav className="flex flex-row h-16 justify-center sticky ">
        <div>
          <button>
            <Link href="/">
              <Image src="/images/TCF_logo.jpg" width={110} height={64} alt="logo" />
            </Link>
          </button>
        </div>
        {session?.user.role && (
          <div className="flex h-16 items-center font-semibold bg-black text-gray-100">
            <button className="h-16 md:p-2">
              <Link href="/admin">
                <a>Admin</a>
              </Link>
            </button>
          </div>
        )}
        <div className="flex h-16 items-center font-semibold bg-black text-gray-100">
          <button className="h-16 md:p-2">
            <Link href="/">
              <a>Quest</a>
            </Link>
          </button>
        </div>
        <div className="flex h-16 items-center font-semibold bg-black text-gray-100">
          <button className="h-16 md:p-2">
            <Link href="/">
              <a>Quarters</a>
            </Link>
          </button>
        </div>
        <div className="flex h-16 items-center font-semibold bg-black text-gray-100">
          <LoginButton />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
