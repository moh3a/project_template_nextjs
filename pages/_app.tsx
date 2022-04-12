import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { NextIntlProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: NextPage) => page);
  return (
    <>
      <Head>
        <title>moh3a repository</title>
        <meta
          name="description"
          content={`Template from moh3a's GitHub repository`}
        />
        <meta name="theme-color" content="#1b1f23" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <NextIntlProvider messages={pageProps.messages}>
        <SessionProvider session={pageProps.session}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </NextIntlProvider>
    </>
  );
}

export default MyApp;
