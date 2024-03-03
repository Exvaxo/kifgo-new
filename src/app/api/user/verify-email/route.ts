import { NextRequest, NextResponse } from "next/server";

import { auth } from "firebase-admin";
import { Prisma } from "@prisma/client";
import { customInitApp } from "@/lib/firebaseAdmin.config";
import { deleteOtp, getOtp } from "../otp.service";
import privateRoute from "../../privateRoute";
import VerifyEmailOtpSchema from "./VerifyEmailOtpSchema";
import { updateUser } from "../user.service";

export async function POST(request: NextRequest) {
  return await privateRoute(async (user) => {
    const body = await request.json();

    const safeSchema = VerifyEmailOtpSchema.safeParse(body);

    if (!safeSchema.success) {
      const errors = safeSchema.error.issues.map((i) => i.message).join(",");
      return NextResponse.json(
        { message: "Validation failed.", errors },
        { status: 400 },
      );
    }

    type OtpWithUser = Prisma.OtpGetPayload<{
      include: { user: { select: { email: true } } };
    }>;

    const otp = (await getOtp({
      where: {
        userId_type: {
          userId: user.id,
          type: "EMAIL",
        },
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    })) as OtpWithUser;

    if (!otp) {
      return NextResponse.json(
        { message: "Verification code Not Requested." },
        { status: 403 },
      );
    }

    if (new Date() > otp.expiry) {
      return NextResponse.json(
        {
          error: "otp-expired",
          message:
            "The One-Time Password (OTP) you provided has expired. Please request a new OTP.",
        },
        { status: 401 },
      );
    }

    if (otp.otp !== parseInt(safeSchema.data.otp)) {
      return NextResponse.json(
        {
          error: "incorrect-otp",
          message: "The One-Time Password (OTP) you provided is incorrect.",
        },
        { status: 401 },
      );
    }

    await deleteOtp({
      where: {
        userId_type: {
          userId: user.id,
          type: "EMAIL",
        },
      },
    });

    customInitApp();
    await auth().updateUser(user.uid, {
      emailVerified: true,
    });

    await updateUser({
      data: {
        emailVerified: true,
      },
      where: {
        id: user.id,
      },
    });

    return NextResponse.json({ message: "Email verified." }, { status: 200 });
  });
}

export async function GET(request: NextRequest) {
  return await privateRoute(async (user, token) => {
    try {
      const otp = await getOtp({
        where: {
          userId_type: {
            userId: user.id,
            type: "EMAIL",
          },
        },
      });
      if (!otp) {
        return NextResponse.json(
          { message: "Verification code Not Requested." },
          { status: 403 },
        );
      }

      if (new Date() > otp.expiry) {
        return NextResponse.json(
          {
            error: "otp-expired",
            message:
              "The One-Time Password (OTP) has expired. Please request a new OTP.",
          },
          { status: 401 },
        );
      }

      return NextResponse.json({ resendIn: otp.resendIn });
    } catch (error: any) {
      if (error.code === "P2023") {
        return NextResponse.json(
          { message: "Invalid id provided." },
          { status: 400 },
        );
      }
      return NextResponse.json({ message: "server error" }, { status: 500 });
    }
  });
}
