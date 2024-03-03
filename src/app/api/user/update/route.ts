import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../../privateRoute";

import { updateUser } from "../user.service";
import UserUpdateNameSchema from "../UserUpdateNameSchema";

export async function POST(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    const body = await request.json();

    const safeSchema = UserUpdateNameSchema.safeParse(body);
    if (!safeSchema.success) {
      const errors = safeSchema.error.issues.map((i) => i.message).join(",");
      return NextResponse.json(
        { message: "Validation failed.", errors },
        { status: 400 },
      );
    }

    const { firstName, lastName } = safeSchema.data;

    await updateUser({
      data: {
        firstName,
        lastName,
      },
      where: {
        id: user.id,
      },
    });

    return NextResponse.json({ message: "Updated." }, { status: 200 });
  });
}
