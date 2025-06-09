/** @format */

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // 1. Redirect old hash-based URLs to new dynamic routes
  if (url.pathname === "/berita" && url.hash) {
    const hash = url.hash.slice(1);
    const parts = hash.split("/");

    if (parts.length >= 2) {
      const idPart = parts[0];
      const tagPart = parts[1];
      const idMatch = idPart.match(/fst-(\d+)/);

      if (idMatch) {
        const encodedTag = encodeURIComponent(
          tagPart.toLowerCase().replace(/\s+/g, "-")
        );
        url.pathname = `/berita/detail/${idMatch[1]}/${encodedTag}`;
        url.hash = "";
        return NextResponse.redirect(url);
      }
    }
  }

  // 2. Redirect old search param URLs to dynamic routes
  if (
    url.pathname === "/berita/detail" &&
    url.searchParams.has("id") &&
    url.searchParams.has("tag")
  ) {
    const id = url.searchParams.get("id");
    const tag = url.searchParams.get("tag");

    if (id && tag) {
      const encodedTag = encodeURIComponent(
        tag.toLowerCase().replace(/\s+/g, "-")
      );
      url.pathname = `/berita/detail/${id}/${encodedTag}`;
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  // 3. Handle special characters in tag parameter
  const beritaDetailMatch = url.pathname.match(
    /^\/berita\/detail\/(\d+)\/(.+)$/
  );
  if (beritaDetailMatch) {
    const [, id, tag] = beritaDetailMatch;

    // Decode dan re-encode tag untuk consistency
    try {
      const decodedTag = decodeURIComponent(tag);
      const cleanTag = decodedTag.toLowerCase().replace(/\s+/g, "-");
      const reEncodedTag = encodeURIComponent(cleanTag);

      if (tag !== reEncodedTag) {
        url.pathname = `/berita/detail/${id}/${reEncodedTag}`;
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.log({ error });
      // Invalid encoding, redirect to berita list
      return NextResponse.redirect(new URL("/berita", request.url));
    }
  }

  // 4. Security headers
  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    "/berita/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
