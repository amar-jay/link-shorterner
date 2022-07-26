import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
// import { __prod } from "./consts";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/fetchUrl")) {
    console.log("returning ...");
    return;
  }

  //   res.cookies.set("_id", randomId, {
  //     httpOnly: true,
  //     sameSite: "strict",
  //     secure: __prod,
  //     maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  //   });

  //   console.log("cookie set");

  const slug = req.nextUrl.pathname.split("/").pop();

  const data = await (
    await fetch(`${req.nextUrl.origin}/api/fetchUrl/${slug}`)
  ).json();
}
