import type { NextPage } from "next";
import {useState} from 'react';
import {useRouter} from 'next/router';
import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LinkContainer = dynamic(() => import("../components/LinkContainer"), {
  ssr: false,
});

const AllLinksContainer = dynamic(() => import("../components/ShowAll.tsx"), {
  ssr: false,
});

const SearchContainer = dynamic(() => import("../components/Search"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [page, setPage] = useState('index')
const ButtonSet = () => (
  <div className="mt-12">
    <button onClick={()=>setPage('index')}  className="btn mr-4">Create a Link</button>
    <button onClick={()=>setPage('allLinks')}  className="btn mr-4">Show all Links</button>
    <button onClick={()=>setPage('search')}  className="btn mr-4">Search</button>
  </div>
)
  return (
    <div className="flex flex-col overflow-y-scroll h-screen flex-grow px-12 md:p-0 m-0 dark:bg-slate-700">
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

      <main className="items-center justify-evenly flex flex-1 flex-col">
        {page === 'index' &&
          <>
        <Suspense>
          <LinkContainer />
        </Suspense>
              <ButtonSet/>
        </>
        }
        { page === 'allLinks' &&
          <>
              <ButtonSet/>
          <Suspense>
            <AllLinksContainer/>
          </Suspense>
          </>
      }
        { page === 'search' &&
          <>
          <Suspense>
            <SearchContainer/>
          </Suspense>
              <ButtonSet/>
          </>
      }
 
      </main>
    </div>
  );
};

export default Home;
