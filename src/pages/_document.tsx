import { Head, Html, Main, NextScript } from "next/document";
import { useState } from "react";

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
