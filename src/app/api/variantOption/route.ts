import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../privateRoute";
import { createVariantOption } from "./variantOption.service";

/* 
    CREATE variat option
*/
export async function POST(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    try {
      const option = await createVariantOption({
        data: {
          value: "User entered color",
          Variant: {
            connect: {
              id: "654f92cdce34b042684ab1fa",
            },
          },
        },
      });

      return NextResponse.json({ option });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}
