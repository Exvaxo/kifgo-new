import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../privateRoute";
import { createVariant, getVariant } from "./variant.service";

/* 
    CREATE variant
*/
export async function POST(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    try {
      const variant = await createVariant({
        data: {
          name: "Primay color",
          displayAs: "SELECT",
          options: {
            createMany: {
              data: [
                {
                  value: "Red",
                },
                {
                  value: "Green",
                },
                {
                  value: "Yellow",
                },
                {
                  value: "Pink",
                },
                {
                  value: "Black",
                },
                {
                  value: "Magenta",
                },
                {
                  value: "White",
                },
              ],
            },
          },
        },
      });

      return NextResponse.json({ variant });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}

/* 
    GET variants
*/
export async function GET(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    try {
      const variants = await getVariant({
        where: {
          id: "6553911e0dd6de8ca53377bd",
        },
        include: {
          units: {
            select: {
              name: true,
              si_unit: true,
            },
          },
          options: {
            select: {
              id: true,
              value: true,
            },
          },
        },
      });

      return NextResponse.json({ variants });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}
