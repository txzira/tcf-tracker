import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { Session } from "next-auth";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
