import { customInitApp } from "@/lib/firebaseAdmin.config";
import { auth } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export default async function privateRoute(
  fn: (
    user: DecodedIdToken,
    token: string,
  ) => Promise<NextResponse<unknown>> | NextResponse<unknown>,
): Promise<NextResponse<unknown>> {
  customInitApp();
  const authorization = headers().get("Authorization");
  let token: string | null = null;

  if (authorization?.startsWith("Bearer ")) {
    token = authorization.split("Bearer ")[1];
  }

  if (!token) {
    return NextResponse.json(
      { error: "invalid-token", message: "Invalid token" },
      { status: 401 },
    );
  }

  try {
    const decodedToken = await auth().verifyIdToken(token, true);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "not-authorized", message: "Not Authorized" },
        { status: 401 },
      );
    }

    return await fn(decodedToken, token);
  } catch (error: any) {
    console.log({ error });
    if (error.code === "auth/id-token-expired") {
      return NextResponse.json(
        { error: "token-expired", message: "Token Expired" },
        { status: 401 },
      );
    }
    if (error.code === "auth/user-disabled") {
      return NextResponse.json(
        { error: "user-disabled", message: "User Disabled" },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { error: "not-authorized", message: "Not Authorized" },
      { status: 401 },
    );
  }
}
