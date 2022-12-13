import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "react-hot-toast";
import { trpc } from "../utils/trpc";
import { Session } from "next-auth";
import AdminLayout from "../components/auth/AdminLayout";
import Layout from "../components/Layout";
import path from "path";

const MyApp = ({ Component, pageProps: { session, ...pageProps }, router }: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Toaster />
        {router.pathname.startsWith("/admin") ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
