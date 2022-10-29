import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./env/server.mjs";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;
  const url = req.nextUrl.origin;

  if (pathname.startsWith("/account") && !session) {
    return NextResponse.redirect(`${url}/auth/signin`);
  }

  if (pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}