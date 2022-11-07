import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  if (session?.user.role === "admin") {
    return (
      <div className="flex flex-row" id="admin-layout">
        <nav className="flex flex-col">
          <Link href="/admin/factions">
            <a>Factions</a>
          </Link>
          <Link href="/admin/items">
            <a>Items</a>
          </Link>
          <Link href="/admin/quests">
            <a>Quests</a>
          </Link>
          <Link href="/admin/questrequirements">
            <a>QuestRequirements</a>
          </Link>
        </nav>
        <div>{children}</div>
      </div>
    );
  } else {
    return <div>Unauthorized User.</div>;
  }
};

export default AdminLayout;
