import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Heather&apos;s Portfolio</title>
        <meta name="description" content="Online Graphic Design Portfolio" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
