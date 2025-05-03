import "@/static/styles/globals.css";
import { metadata } from "@/theme.config";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={metadata.description} />
        <meta property="og:site_name" content={metadata.url} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta name="twitter:card" content={metadata.image} />
        <meta name="twitter:site" content={metadata.twitter_site} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <link rel="shortcut icon" href={metadata.favicon} type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <title>{metadata.title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
