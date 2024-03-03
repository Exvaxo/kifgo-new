import { auth } from "firebase-admin";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../../privateRoute";
import UserSchema from "../UserSchema";
import { createUserIfNotExists, updateUser } from "../user.service";

export async function POST(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user, token) => {
    const body = await request.json();

    const safeSchema = UserSchema.safeParse({ uid: user.uid, ...body });

    if (!safeSchema.success) {
      const errors = safeSchema.error.issues.map((i) => i.message).join(",");
      return NextResponse.json(
        { message: "Validation failed.", errors },
        { status: 400 },
      );
    }

    const {
      email,
      photoURL,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      province,
      country,
      contactNumber,
      identityVerification,
    } = safeSchema.data;

    const createdUser = await createUserIfNotExists({
      where: {
        email,
      },
      create: {
        email,
        photoURL,
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        country,
        contactNumber,
        identityVerification,
      },
      update: {},
    });

    if (user.email_verified) {
      await updateUser({
        where: {
          email,
        },
        data: {
          emailVerified: true,
        },
      });
    }

    await auth().updateUser(user.uid, {
      displayName: firstName,
    });

    await auth().setCustomUserClaims(user.uid, {
      id: createdUser.id,
      role: user.role ? user.role : "USER",
      isOnBoardingComplete: user?.isOnBoardingComplete ? true : false,
    });

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

    return NextResponse.json({ message: "User created" }, { status: 201 });
  });
}
