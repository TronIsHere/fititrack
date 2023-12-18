import { Toaster } from "@/components/ui/toasts/toaster";
import { store } from "@/store/store";
import "@/styles/global.css";
import "@/styles/style.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactNode } from "react";
import { Provider } from "react-redux";

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
      <Head>
        <title>Fitittrack</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Level Up Your Health with Fititrack: The Ultimate Fitness Gamification App!"
        />
        <meta
          name="twitter:title"
          content="Level Up Your Health with Fititrack: The Ultimate Fitness Gamification App!"
        />
        <meta
          name="twitter:description"
          content="Level Up Your Health with Fititrack: The Ultimate Fitness Gamification App!"
        />
        {/* <meta name="twitter:image" content="/images/waitlist.png" /> */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/favicon/site.webmanifest"></link>
      </Head>
      <Toaster />
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </>
  );
}
