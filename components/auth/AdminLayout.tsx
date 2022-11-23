import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  if (session?.user.role === "admin") {
    return (
      <div className="flex flex-col" id="admin-layout">
        <nav className="flex flex-row text-gray-100 ">
          <Link href="/admin">
            <a className="flex items-center h-10 bg-purple-600">Admin Home</a>
          </Link>
          <Link href="/admin/factions">
            <a className="flex items-center h-10">Factions</a>
          </Link>
          <Link href="/admin/items">
            <a className="flex items-center h-10">Items</a>
          </Link>
          <Link href="/admin/quests">
            <a className="flex items-center h-10">Quests</a>
          </Link>
          <Link href="/admin/quest-requirements">
            <a className="flex items-center h-10">QuestRequirements</a>
          </Link>
        </nav>
        <div className="mx-auto w-11/12">{children}</div>
      </div>
    );
  } else {
    return <div className="md:h-screen">Unauthorized User.</div>;
  }
};

export default AdminLayout;
