import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "@/components/ui/toasts/toaster";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
