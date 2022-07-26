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

const CreateLinkForm: NextPage = () => {
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  // const url = window.location.origin;
  const url = __prod ? "https://links.themanan.com" : "http://localhost:3000";

  const slugCheck = trpc.useQuery(["checkSlug", { slug: form.slug }], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const createSlug = trpc.useMutation(["createSlug"]);

  // TODO: use debounce to prevent spamming the server
  // const slugInput = classNames(input, {
  //   "border-red-500": slugCheck.isFetched && slugCheck.data!.used,
  //   "text-red-500": slugCheck.isFetched && slugCheck.data!.used,
  // });

  if (createSlug.status === "success") {
    // if (true) {
    return (
      <>
        <div className="flex justify-center items-center dark:bg-slate-600 bg-slate-300 py-3 px-6 rounded-md">
          <h1 className="text-gray-600 text-lg dark:text-black cursor-default">{`${url}/${form.slug}`}</h1>
          <input
            type="button"
            value="Copy Link"
            className="rounded bg-blue-300 p-1 font-bold cursor-pointer ml-5 text-white dark:bg-blue-500 hover:shadow-2xl transition-all duration-200"
            onClick={() => {
              copy(`${url}/${form.slug}`);
            }}
          />
        </div>
        <input
          type="button"
          value="Reset"
          className="rounded bg-blue-300 py-2 px-5 font-bold cursor-pointer ml-2 text-white dark:bg-blue-500 hover:shadow-2xl transition-all duration-200 "
          onClick={() => {
            createSlug.reset();
            setForm({ slug: "", url: "" });
          }}
        />
      </>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createSlug.mutate({ ...form });
      }}
      className="flex flex-col justify-center sm:w-2/3 md:w-1/2 lg:w-1/3"
    >
      {slugCheck.data?.used && (
        <span className="font-medium mb-2 text-center text-red-500">
          Slug already in use.
        </span>
      )}
      <div className="flex items-center mb-3">
        <span className="font-medium mr-2">{url}/</span>
        <input
          type="text"
          onChange={(e) => {
            setForm({
              ...form,
              slug: e.target.value,
            });
            debounce(slugCheck.refetch, 100);
          }}
          minLength={1}
          placeholder="rothaniel"
          className="p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
          value={form.slug}
          pattern={"^[-a-zA-Z0-9]+$"}
          title="Only alphanumeric characters and hypens are allowed. No spaces."
          required
        />
        <input
          type="button"
          value="Random"
          className="rounded bg-blue-300 p-1 font-bold cursor-pointer ml-5 text-white dark:bg-blue-500 "
          onClick={() => {
            const slug = nanoid();
            setForm({
              ...form,
              slug,
            });
            slugCheck.refetch();
          }}
        />
      </div>
      <div className="flex items-center">
        <span className="font-lg mr-2 text-blue-500">Link</span>
        <input
          type="url"
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="https://google.com"
          className="p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
          required
        />
      </div>
      <input
        type="submit"
        value="Create"
        className="rounded bg-blue-300 py-3 font-bold cursor-pointer mt-6 dark:bg-blue-500"
        disabled={slugCheck.isFetched && slugCheck.data!.used}
      />
    </form>
  );
};

export default CreateLinkForm;
