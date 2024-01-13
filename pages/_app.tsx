import "@/styles/reset.css";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import type { AppProps } from "next/app";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
