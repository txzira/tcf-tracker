import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>The Cycle Frontier Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex flex-row">
        <header className="">
          <Navbar />
        </header>
        <main className="bg-gradient-to-b from-black to-gray-800 text-gray-100 h-screen w-full overflow-y-scroll">
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Layout;
