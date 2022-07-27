import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LinkContainer = dynamic(() => import("../components/LinkContainer"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className="flex flex-col flex-grow p-0 m-0 dark:bg-slate-700">
      <Head>
        <title>Link Shorterner</title>
        <meta name="description" content="A link shorterner generator app" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="A link Shorterner" />
        <meta name="author" content="Amar Jay" />
        <meta name="twitter:title" content="A link Shorterner" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@amarjay" />
        <meta property="og:site_name" content="A link Shorterner App" />
        <meta name="og:title" content="A link Shorternerr" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="items-center justify-evenly flex h-[90vh] flex-col">
        <Suspense>
          <LinkContainer />
        </Suspense>
        <h1 className="text-2xl font-bold text-blue-800 underline dark:text-blue-500">
          Shortern your link with ease
        </h1>
      </main>
    </div>
  );
};

export default Home;
