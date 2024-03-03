import secureRandom from "@/utilities/secureRandom";
import { add } from "date-fns";
import { NextResponse, type NextRequest } from "next/server";
import { createOtp } from "../otp.service";
import { getUser } from "../user.service";
import { sendEmail } from "@/lib/nodemailer.config";
import { render } from "@react-email/render";
import ForgotPassword from "@/emails/ForgotPassword";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();

    const user = await getUser({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "No user found." }, { status: 404 });
    }

    const createdOtpObject = await createOtp({
      where: {
        userId_type: {
          userId: user.id,
          type: "RESET_PASSWORD",
        },
      },
      create: {
        user: {
          connect: {
            id: user.id,
          },
        },
        type: "RESET_PASSWORD",
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
      subject: "forgot password",
      template: render(
        ForgotPassword({ id: user.id, otp: createdOtpObject.otp }),
      ),
    });

    return NextResponse.json({
      id: user.id,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 },
    );
  }
}
