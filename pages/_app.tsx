import "../styles/globals.css";
import type { AppProps } from "next/app";

import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "../utils/trpc";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
