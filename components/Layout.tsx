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
        <main className="bg-gray-700 text-gray-100 h-full w-full">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
