import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
// import * as gtag from "../libs/gtag";
// import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "../components/Loader/Loader";
import { UserProvider } from "../components/Authenticate/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  //   useEffect(() => {
  //     const handleRouteChange = (url: URL) => {
  //       //if (isProduction)
  //       gtag.pageview(url);
  //     };
  //     router.events.on("routeChangeComplete", handleRouteChange);
  //     return () => {
  //       router.events.off("routeChangeComplete", handleRouteChange);
  //     };
  //   }, [router.events]);

  return (
    <>
      <Loader />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
