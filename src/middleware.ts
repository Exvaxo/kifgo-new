import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  const onlyPublicRoutes = [
    "/user/signin",
    "/user/forgot-password",
    "/user/register",
    "/user/forgot-password/verify-otp",
    "/user/reset-password",
  ];

  const isOnlyPublic = onlyPublicRoutes.includes(request.nextUrl.pathname);

  if (!session && !isOnlyPublic) {
    let url = "/user/signin";
    url += `?callback=${request.nextUrl.pathname}`;

    return NextResponse.redirect(new URL(url, request.url));
  }

  if (session && isOnlyPublic) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  if (session && !isOnlyPublic) {
    //Call the authentication endpoint
    const responseAPI = await fetch(`${process.env.BASE_URL}/api/user/login`, {
      headers: {
        Cookie: `session=${session?.value}`,
      },
      cache: "no-store",
    });

    //Return to /signin if token is not authorized
    if (responseAPI.status !== 200) {
      let url = "/user/signin";
      url += `?callback=${request.nextUrl.pathname}`;

      return NextResponse.redirect(new URL(url, request.url));
    }

    const user = await responseAPI.json();

    if (
      request.nextUrl.pathname.includes("/shop/onboarding") &&
      user.isOnBoardingComplete
    ) {
      let url = "/shop/dashboard";
      return NextResponse.redirect(new URL(url, request.url));
    }

    if (
      request.nextUrl.pathname.includes("/shop/dashboard") &&
      !user.isOnBoardingComplete
    ) {
      let url = "/shop/onboarding/shop-name";
      return NextResponse.redirect(new URL(url, request.url));
    }

    if (
      request.nextUrl.pathname.includes("admin") &&
      user.role !== Role.ADMIN
    ) {
      let url = "/shop/dashboard";
      return NextResponse.redirect(new URL(url, request.url));
    }

    NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/protected/:paths*",
    "/user/:paths*",
    "/shop/:paths*",
    "/admin/:paths*",
  ],
};
