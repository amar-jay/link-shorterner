import type { NextPage } from "next";
import Head from "next/head";
import LinkContainer from "../components/LinkContainer";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col m-0 p-0 dark:bg-slate-700 flex-grow">
      <Head>
        <title>Link Shorterner</title>
        <meta name="description" content="A link shorterner generator app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="items-center justify-evenly flex h-[90vh] flex-col">
        <LinkContainer />
        <h1 className="text-2xl font-bold underline text-blue-800 dark:text-blue-500">
          Under Contruction 🚧
        </h1>
      </main>
    </div>
  );
};

export default Home;
