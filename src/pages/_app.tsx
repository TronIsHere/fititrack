import { Toaster } from "@/components/ui/toaster";
import "@/styles/global.css";
import "@/styles/style.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
