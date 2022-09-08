import type { NextPage } from "next";
import { useState } from "react";
import classNames from "classnames";
import { nanoid } from "nanoid";
import debounce from "lodash/debounce";
import { trpc, __prod } from "../utils/consts";
import copy from "copy-to-clipboard";

type Form = {
  slug: string;
  url: string;
};

const InputBox = ({state}: {state: any}) => {
  return <>
    <h1 className="font-extrabold my-4 text-xl text-slate-300"> Search a slug</h1>
    <input type="text" placeholder="slug" value={state[0]?.link ?? ""} onChange={(e) => state[1]({link:e.target.value})} className="block w-lg p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 rounded-md sm:text-sm focus:ring-1"
/>
  </>
}
const FetchAlllinks  = () => {
  const searchItem = useState<{link:string}>({link: ""})
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  // const url = window.location.origin;
  const url = __prod ? "https://links.themanan.me" : "http://localhost:3000";

  const fetchAllLinks = trpc.useQuery(["allLinks"], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const fetchALink = trpc.useQuery(["aLink", {slug: searchItem[0].link}], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });



  return (
    <>
     <div className="flex items-center m-5 md:md-3 flex-col">
        <InputBox state={searchItem} />
        <ul className="flex items-center justify-center px-6 py-3 my-6 dark:bg-slate-600 bg-slate-300 rounded-md">
          <li>
        {fetchALink.data?.aLink && <a href={fetchALink.data.aLink.url}>{fetchALink.data.aLink.url}</a> }
          </li>
        </ul>
     </div>
   </>
  );
};

export default FetchAlllinks;
