import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-screen">
      <div className="text-center bg-black text-white w-screen md:p-2.5">Header Content</div>
      <nav className=" md:p-2">
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
