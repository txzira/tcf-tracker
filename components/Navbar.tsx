import Link from "next/link";
import React from "react";
import LoginButton from "../components/auth/LoginButton";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  // console.log(session);
  return (
    <div className="w-screen">
      <div className="text-center bg-black text-white w-screen md:p-2.5">Header Content</div>
      <nav className="flex flex-row md:p-2">
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        {session?.user.role && (
          <div>
            <Link href="/admin">
              <a>Admin</a>
            </Link>
          </div>
        )}
        <div>
          <LoginButton />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
