"use client";
import React from "react";
import "./globals.css";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Layout, { LayoutHeading } from "../components/Layout";
import AdminLayout from "../components/auth/AdminLayout";
import { usePathname } from "next/navigation";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-row">
        <SessionProvider>
          <Layout>
            <Toaster />
            {usePathname()?.startsWith("/admin") ? (
              <AdminLayout>{children}</AdminLayout>
            ) : (
              <>
                <LayoutHeading />

                {children}
              </>
            )}
          </Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
