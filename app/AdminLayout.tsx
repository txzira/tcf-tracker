"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <Link href={href} className="flex items-center h-10">
      {children}
    </Link>
  );
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  if (session?.user.role === "admin") {
    return (
      <div className="flex flex-col" id="admin-layout">
        <nav className="flex flex-row text-gray-100 ">
          <NavLink href="/admin">Admin Home</NavLink>
          <NavLink href="/admin/factions">Factions</NavLink>
          <NavLink href="/admin/items">Items</NavLink>
          <NavLink href="/admin/quests">Quests</NavLink>
          <NavLink href="/admin/quest-requirements">QuestRequirements</NavLink>
        </nav>
        <div className="mx-auto w-11/12">{children}</div>
      </div>
    );
  } else {
    return <div className="md:h-screen">Unauthorized User.</div>;
  }
};

export default AdminLayout;
