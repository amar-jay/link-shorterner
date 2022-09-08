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
  const url = __prod ? "https://links.themanan.me" : "http://localhost:3000";

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
        <div className="flex items-center justify-center px-6 py-3 dark:bg-slate-600 bg-slate-300 rounded-md">
          <h1 className="text-lg text-gray-600 cursor-default dark:text-black">{`${url}/${form.slug}`}</h1>
          <input
            type="button"
            value="Copy Link"
            className="p-1 ml-5 font-bold text-white bg-blue-300 rounded cursor-pointer dark:bg-blue-500 hover:shadow-2xl transition-all duration-200"
            onClick={() => {
              copy(`${url}/${form.slug}`);
              alert("Copied to clipboard!");
            }}
          />
        </div>
        <input
          type="button"
          value="Reset"
          className="px-5 py-2 ml-2 font-bold text-white bg-blue-300 rounded cursor-pointer dark:bg-blue-500 hover:shadow-2xl transition-all duration-200 "
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
        <span className="mb-2 font-medium text-center text-red-500">
          Slug already in use.
        </span>
      )}
      <div className="flex items-center m-5 md:md-3">
        <span className="mr-2 font-medium">{url}/</span>
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
          placeholder="slug"
          className="block w-full p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 rounded-md sm:text-sm focus:ring-1"
          value={form.slug}
          pattern={"^[-a-zA-Z0-9]+$"}
          title="Only alphanumeric characters and hypens are allowed. No spaces."
          required
        />
        <button
          className="btn ml-5"
          onClick={() => {
            const slug = nanoid().slice(0, 10);
            setForm({
              ...form,
              slug,
            });
            slugCheck.refetch();
          }}
        >Random</button>
      </div>
      <div className="flex items-center">
        <span className="mr-2 text-blue-500 font-lg">Link</span>
        <input
          type="url"
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="https://example.com/"
          className="block w-full p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 rounded-md sm:text-sm focus:ring-1"
          required
        />
      </div>
      <input
        type="submit"
        value="Create"
        className="btn py-3 mt-6 font-bold bg-blue-300 rounded cursor-pointer dark:bg-blue-500"
        disabled={slugCheck.isFetched && slugCheck.data?.used}
      />
    </form>
  );
};

export default CreateLinkForm;
