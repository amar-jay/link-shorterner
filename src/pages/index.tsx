import type { NextPage } from "next";
import {useState} from 'react';
import {useRouter} from 'next/router';
import Head from "next/head";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LinkContainer = dynamic(() => import("../components/LinkContainer"), {
  ssr: false,
});

const AllLinksContainer = dynamic(() => import("../components/Alllinks"), {
  ssr: false,
});


const Home: NextPage = () => {
  const [page, setPage] = useState('index')
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
        {page === 'index'? 
          <>
        <Suspense>
          <LinkContainer />
        </Suspense>
          <button onClick={()=>setPage('allLinks')}  className="btn">Show all Links</button>
        </>
          :
          <>
          <Suspense>
            <AllLinksContainer/>
          </Suspense>
          <button onClick={()=>setPage('index')} className="btn">Create Link</button>
          </>
      }
      </main>
    </div>
  );
};

export default Home;
