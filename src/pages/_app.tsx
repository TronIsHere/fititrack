import { Toaster } from "@/components/ui/toasts/toaster";
import "@/styles/global.css";
import "@/styles/style.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <>
      <Toaster />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
