"use client";
import React from "react";
import { trpc } from "../utils/trpc";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import AdminLayout from "./AdminLayout";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./globals.css";

function capitalizeFirstLetter(word: string | null) {
  if (word === null) return;
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter?.toUpperCase();
  const remainingLetters = word.slice(1);
  const capitalizeWord = firstLetterCap + remainingLetters;
  return capitalizeWord;
}

const LayoutHeading = () => {
  return (
    <div className="flex flex-row justify-between w-full">
      <div>{capitalizeFirstLetter(usePathname()!.replace("/", ""))}</div>
      <div>hint</div>
      <div>Search</div>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-row">
        <header className="">
          <Navbar />
        </header>
        <main className="flex flex-col bg-gradient-to-b from-black to-gray-800 text-gray-100 h-screen w-screen overflow-y-scroll" id="main">
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Layout>
            <Toaster />
            {usePathname()?.startsWith("/admin") ? (
              <AdminLayout>{children}</AdminLayout>
            ) : (
              <>
                <LayoutHeading />
                <div className="h-full w-full">{children}</div>
              </>
            )}
          </Layout>
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
