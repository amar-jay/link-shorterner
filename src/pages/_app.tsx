import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Footer } from "../components/Footer";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="dark:bg-slate-700 m-0 relative max-h-screen">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
