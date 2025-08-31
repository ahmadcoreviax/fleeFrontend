// middleware.js
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Sirf /fleetxmng/* (fleetxmng ke baad kuch bhi) pages pr run kare
  // if (pathname.startsWith("/fleetxmng") && pathname !== "/fleetxmng") {
  //   const token = req.cookies.get("token")?.value;

  // if (!token) {
  //   return NextResponse.redirect(new URL("/fleetxmng", req.url));
  // }

  // try {
  // backend verify
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/accessverify`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ token }),
  //   }
  // );

  //     if (res.status === 200) {
  //       return NextResponse.next();
  //     } else {
  //       return NextResponse.redirect(new URL("/fleetxmng", req.url));
  //     }
  //   } catch (error) {
  //     return NextResponse.redirect(new URL("/fleetxmng", req.url));
  //   }
  // }

  // return NextResponse.next();
}

// Match only fleetxmng and its nested routes
export const config = {
  matcher: ["/fleetxmng/:path*"],
};
