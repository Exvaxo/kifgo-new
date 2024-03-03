import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../../privateRoute";
import { auth } from "firebase-admin";

export async function GET(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    await auth().setCustomUserClaims(user.uid, {
      isOnBoardingComplete: false,
      id: user.id,
    });

    return NextResponse.json({ user });
  });
}
