import React from 'react'



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

const ShowAll  = ({data}) => {
  const searchItem = useState<{link:string}>({link: ""})
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  // const url = window.location.origin;
  const url = __prod ? "https://links.themanan.me" : "http://localhost:3000";

  const {data} = trpc.useQuery(["allLinks"], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="mb-24">
      <h1 className="font-extrabold my-4 text-center underline text-xl text-slate-300"> Show All links</h1>
     <table className="m-5 md:md-3 overflow-y-scroll">
        <tr>
          <th>Slug</th>
          <th>URL</th>
        </tr>
            {data?.links.map(e => (
          <tr className="py-4 border-y-3">
            <th className="text-slate-900">{e.slug}</th>
            <td className="py-4 px-2 w-28 rounded-md"><a href={e.url}>{e.url}</a></td>
            </tr>
            )) ?? <div>Cannot Fetch Data</div>}
     </table>
   </div>
  );
};

export async function getServerSideProps(context) {
  const data = await res.json()

  const fetchAllLinks = trpc.useQuery(["allLinks"], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (!fetchAllLinks.status !== "success") {
    return {
      redirect: {
        destination: '/error/404',
        permanent: false,
      },
    }
  }

  return {
    props: {data: {}}, // will be passed to the page component as props
  }
}
export default ShowAll
