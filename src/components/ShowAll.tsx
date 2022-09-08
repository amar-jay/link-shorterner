import React from 'react'
import { useState } from "react";

import { trpc, __prod } from "../utils/consts";

const ShowAll: React.FC<{}> = () => {

  const { data } = trpc.useQuery(["allLinks"], {
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

        {data?.links.map((e, key) => (
          <tr className="py-4 border-y-3" key={key}>

            <th className="text-slate-900">{e.slug}</th>
            <td className="py-4 px-2 w-28 rounded-md"><a href={e.url ?? ""}>{e.url}</a></td>
          </tr>
        )) ?? <div>Cannot Fetch Data</div>}
      </table>
    </div>
  );
};


export default ShowAll
