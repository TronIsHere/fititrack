import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "@/components/ui/toaster";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>
          Sign Up Now for Early Access and Enjoy Your Free Month Premium
        </title>
        <link rel="canonical" href="http://fitittrack.com/waitlist" />
        <meta
          name="description"
          content="Get early access and join the waitlist to claim your free month premium. Sign up now!"
        />
        <meta
          name="twitter:title"
          content="Sign Up Now for Early Access and Enjoy Your Free Month Premium "
        />
        <meta
          name="twitter:description"
          content="Track your fitness journey and grow your character"
        />
        <meta name="twitter:image" content="/images/waitlist.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
