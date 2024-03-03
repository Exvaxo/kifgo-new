import { customInitApp } from "@/lib/firebaseAdmin.config";
import privateRoute from "../../privateRoute";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "firebase-admin";
import { Role } from "@prisma/client";
import { updateUser } from "../../user/user.service";

customInitApp();
export async function POST(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user, token) => {
    await updateUser({
      where: {
        id: user.id,
      },
      data: {
        role: user.isOnBoardingComplete ? Role.SELLER : Role.USER,
      },
    });

    await auth().setCustomUserClaims(user.uid, {
      id: user.id,
      isOnBoardingComplete: user.isOnBoardingComplete,
      role: user.isOnBoardingComplete ? Role.SELLER : Role.USER,
    });

    return NextResponse.json(
      { message: "Admin user revoked." },
      { status: 200 },
    );
  });
}
