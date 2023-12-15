import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "@/components/ui/toasts/toaster";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Document() {
  const [darkState, setDarkState] = useState<boolean>(true);

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
