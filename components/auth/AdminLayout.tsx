import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  if (session?.user.role === "admin") {
    return (
      <div className="flex flex-row " id="admin-layout">
        <nav className="flex flex-col md:h-screen bg-black text-gray-100 ">
          <button className="bg-purple-600 h-10 ">
            <Link href="/admin">
              <a>Admin Home</a>
            </Link>
          </button>
          <button>
            <Link href="/admin/factions">
              <a>Factions</a>
            </Link>
          </button>
          <button>
            <Link href="/admin/items">
              <a>Items</a>
            </Link>
          </button>
          <button>
            <Link href="/admin/quests">
              <a>Quests</a>
            </Link>
          </button>
          <Link href="/admin/quest-requirements">
            <a>QuestRequirements</a>
          </Link>
        </nav>
        <div className="mx-auto w-2/3">{children}</div>
      </div>
    );
  } else {
    return <div className="md:h-screen">Unauthorized User.</div>;
  }
};

export default AdminLayout;
