"use client";
import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

function capitalizeFirstLetter(word: string | null) {
  if (word === null) return;
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter?.toUpperCase();
  const remainingLetters = word.slice(1);
  const capitalizeWord = firstLetterCap + remainingLetters;
  return capitalizeWord;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-row">
        <header className="">
          <Navbar />
        </header>
        <main className="flex flex-col bg-gradient-to-b from-black to-gray-800 text-gray-100 h-screen w-screen overflow-y-scroll">
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
};

export const LayoutHeading = () => {
  return (
    <div className="flex flex-row justify-between w-full">
      <div>{capitalizeFirstLetter(usePathname()!.replace("/", ""))}</div>
      <div>hint</div>
      <div>Search</div>
    </div>
  );
};

export default Layout;
