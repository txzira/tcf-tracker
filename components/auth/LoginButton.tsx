import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { IoMdFingerPrint } from "react-icons/io";

export const SignoutButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <button className="flex items-center justify-center h-16 w-full" onClick={() => signOut()}>
        Sign Out
      </button>
    );
  } else {
    return null;
  }
};

export const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return <div className="flex items-center justify-center h-16 w-full">{session.user.email}</div>;
  }
  return (
    <Link href="/login" className="flex items-center justify-center h-16 w-full">
      <IoMdFingerPrint />
      Sign In
    </Link>
  );
};
