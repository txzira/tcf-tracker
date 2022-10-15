import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
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
