import type { AppProps } from "next/app";
import { __prod } from "../utils/consts";
import "../styles/globals.css";
import { Footer } from "../components/Footer";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[trpc]";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="relative h-screen m-0 dark:bg-slate-700">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

function getBaseUrl() {
  // if (process.browser) return ""; // Browser should use current path

  return __prod
    ? "https://themanan.me"
    : `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
    };
  },
  ssr: false
})(MyApp);
