import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";
import { NextIntlProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps, router }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: NextPage) => page);

  /**
   * For context, next.js embraces both SSR and front end routing (typical SPA) to deliver smooth users experience. However, when a user navigate on the web app through next/router or next/link (Link component), the navigation is made through front end routing. Which means there is no HTTP GET request made to the server for that route, it only swap the react component to the new page and change the url showed on the url bar. This "fake" navigation is usually desired because it means users do not have to wait for network delay.

  However the problem appears when it comes to caching, because there is not request that service worker could intercept, nothing is cached. Users may landing on your home page and navigate to different pages without doing any caching. When the network is lost and users reload these pages using refresh button or re-open the browser, a network lost page from the browser is present, bummer! This behavior could leave users very confused as they could navigated the web app without problem in online and offline, when it come back offline, the web app stopped working.

  So we have to enforce a cache for each front-end caching. Yes, it adds additional network traffic which seems conflict of what we are trying to achieve with front end routing. But since the cache happens in service worker, it should have trivial impact on user experience or more specifically, page load.
   */
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "ononline" in window &&
      "onoffline" in window
    ) {
      setIsOnline(window.navigator.onLine);
      if (!window.ononline) {
        window.addEventListener("online", () => {
          setIsOnline(true);
        });
      }
      if (!window.onoffline) {
        window.addEventListener("offline", () => {
          setIsOnline(false);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      // @ts-ignore
      window.workbox !== undefined &&
      isOnline
    ) {
      // skip index route, because it's already cached under `start-url` caching object
      if (router.route !== "/") {
        // next-pwa injected workbox object
        // @ts-ignore
        const wb = window.workbox;
        wb.active.then(() => {
          wb.messageSW({ action: "CACHE_NEW_ROUTE" });
        });
      }
    }
  }, [isOnline, router.route]);

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
        <ThemeProvider attribute="class">
          <SessionProvider session={pageProps.session}>
            {getLayout(<Component {...pageProps} />)}
          </SessionProvider>
        </ThemeProvider>
      </NextIntlProvider>
    </>
  );
}

export default MyApp;
