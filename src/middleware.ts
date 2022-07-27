import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, _: NextFetchEvent) {
  const slug = req.nextUrl.pathname.split("/").pop();
  if (slug?.includes('.')) {
    return
  }
  const slugFetch = await fetch(`${req.nextUrl.origin}/api/fetchUrl/${slug}`);
  if (slugFetch.status === 404) {
    return NextResponse.redirect(`${req.nextUrl.origin}/`);
  }
  const { data } = await slugFetch.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
//  return NextResponse.redirect(`${req.nextUrl.origin}/error/404`);
}

export const config = {
  matcher: "/:slug",
};
