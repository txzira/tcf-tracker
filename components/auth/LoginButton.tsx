import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="h-16 w-full">
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
  return (
    <>
      <Link href="/auth">
        <a>Sign In</a>
      </Link>
    </>
  );
};

export default LoginButton;
