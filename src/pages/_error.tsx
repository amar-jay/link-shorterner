import { NextPage } from "next";
import * as React from "react";

const invalidSlug: NextPage = () => {
  return (
    <div className="flex m-0 p-0 dark:bg-slate-700 w-screen h-[90vh] justify-center items-center">
      <h1 className="text-2xl font-bold text-red-800 dark:text-red-500">
        Invalid Page ❌
      </h1>
    </div>
  );
};

export default invalidSlug;
