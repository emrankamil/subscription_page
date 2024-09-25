import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req, res) {
    // if (
    //   req.nextUrl.pathname.startsWith("/auth/signup") &&
    //   req.nextauth.token?.role !== "admin"
    // ) {
    //   return NextResponse.rewrite(new URL("/Denied", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/"],
};
