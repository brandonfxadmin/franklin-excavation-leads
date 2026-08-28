import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && pathname !== "/dashboard/login") {
        const cookie = req.cookies.get("fe_admin_auth")?.value;
        if (cookie !== "ok") {
                const url = req.nextUrl.clone();
                url.pathname = "/dashboard/login";
                url.searchParams.set("next", pathname);
                return NextResponse.redirect(url);
        }
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
