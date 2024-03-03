import { NextRequest, NextResponse } from "next/server";
import privateRoute from "../../../privateRoute";
import { sendEmail } from "@/lib/nodemailer.config";
import { render } from "@react-email/components";
import ForgotPassword from "@/emails/ForgotPassword";
import secureRandom from "@/utilities/secureRandom";
import { add } from "date-fns";
import { createOtp } from "../../otp.service";

export async function POST(request: NextRequest) {
  return await privateRoute(async (user) => {
    if (user.email_verified) {
      return NextResponse.json(
        {
          message: "Email already verified.",
        },
        { status: 401 },
      );
    }
    const createdOtpObject = await createOtp({
      where: {
        userId_type: {
          userId: user.id,
          type: "EMAIL",
        },
      },
      create: {
        user: {
          connect: {
            id: user.id,
          },
        },
        type: "EMAIL",
        otp: secureRandom(),
        expiry: add(new Date(), { minutes: 10 }),
        resendIn: add(new Date(), { minutes: 2 }),
      },
      update: {
        otp: secureRandom(),
        expiry: add(new Date(), { minutes: 10 }),
        resendIn: add(new Date(), { minutes: 2 }),
      },
    });

    sendEmail({
      to: "thuvaraganuidesigns@gmail.com",
      subject: "verify email",
      template: render(
        ForgotPassword({ id: user.id, otp: createdOtpObject.otp }),
      ),
    });

    return NextResponse.json({
      message: "Verify email sent.",
    });
  });
}
