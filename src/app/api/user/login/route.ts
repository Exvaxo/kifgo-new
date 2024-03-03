import { customInitApp } from "@/lib/firebaseAdmin.config";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../../privateRoute";

customInitApp();
export async function POST(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user, token) => {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth().createSessionCookie(token, {
      expiresIn,
    });

    const options = {
      name: "session",
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    //Add the cookie to the browser
    cookies().set(options);

    return NextResponse.json({ message: "User logged in." }, { status: 200 });
  });
}

export async function GET(request: NextRequest) {
  try {
    const session = cookies().get("session")?.value || "";

    //Validate if the cookie exist in the request
    if (!session) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }

    //Use Firebase Admin to validate the session cookie
    customInitApp();
    const decodedClaims = await auth().verifySessionCookie(session, true);
    const { customClaims } = await auth().getUser(decodedClaims.uid);

    if (!decodedClaims) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }

    return NextResponse.json(
      { ...decodedClaims, ...customClaims },
      { status: 200 },
    );
  } catch (error: any) {
    if (error.code === "auth/session-cookie-expired") {
      return NextResponse.json(
        { message: "Token expired", code: "token-expired" },
        { status: 401 },
      );
    }
    console.log({ error });
  }
}
