import { NextRequest, NextResponse } from "next/server";
import { deleteOtp, getOtp } from "../../otp.service";
import ForgotPasswordOtpSchema from "../ForgotPasswordOtpSchema";
import { auth } from "firebase-admin";
import { Prisma } from "@prisma/client";
import { customInitApp } from "@/lib/firebaseAdmin.config";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const safeSchema = ForgotPasswordOtpSchema.safeParse(body);

  if (!safeSchema.success) {
    const errors = safeSchema.error.issues.map((i) => i.message).join(",");
    return NextResponse.json(
      { message: "Validation failed.", errors },
      { status: 400 }
    );
  }

  type OtpWithUser = Prisma.OtpGetPayload<{
    include: { user: { select: { email: true } } };
  }>;
  const otp = (await getOtp({
    where: {
      userId_type: {
        userId: safeSchema.data.id,
        type: "RESET_PASSWORD",
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
      { status: 403 }
    );
  }

  if (new Date() > otp.expiry) {
    return NextResponse.json(
      {
        error: "otp-expired",
        message:
          "The One-Time Password (OTP) you provided has expired. Please request a new OTP.",
      },
      { status: 401 }
    );
  }

  if (otp.otp !== parseInt(safeSchema.data.otp)) {
    return NextResponse.json(
      {
        error: "incorrect-otp",
        message: "The One-Time Password (OTP) you provided is incorrect.",
      },
      { status: 401 }
    );
  }

  await deleteOtp({
    where: {
      userId_type: {
        userId: safeSchema.data.id,
        type: "RESET_PASSWORD",
      },
    },
  });

  customInitApp();
  const link = await auth().generatePasswordResetLink(otp.user.email);
  const code = link.split("oobCode=")[1].split("&apiKey")[0];

  return NextResponse.json({ message: "OTP verified.", code }, { status: 200 });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      const errors = "Id is required.";
      return NextResponse.json(
        { message: "Validation failed.", errors },
        { status: 400 }
      );
    }
    const otp = await getOtp({
      where: {
        userId_type: {
          userId: id,
          type: "RESET_PASSWORD",
        },
      },
    });
    if (!otp) {
      return NextResponse.json(
        { message: "Verification code Not Requested." },
        { status: 403 }
      );
    }

    if (new Date() > otp.expiry) {
      return NextResponse.json(
        {
          error: "otp-expired",
          message:
            "The One-Time Password (OTP) you provided has expired. Please request a new OTP.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({ createdAt: otp.createdAt });
  } catch (error: any) {
    if (error.code === "P2023") {
      return NextResponse.json(
        { message: "Invalid id provided." },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
