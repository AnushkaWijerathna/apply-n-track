//This is the middleware, it checks if the user is authenticated and if not then it redirects to the sign-in page.
//This middleware is applied to all the routes in the app, so if a user tries to access any route without being authenticated, they will be redirected to the sign-in page.

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export default async function proxy(request: NextRequest) {
  const session = await getSession();

  const isSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUpPage = request.nextUrl.pathname.startsWith("/sign-up");

  if ((isSignInPage || isSignUpPage) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
