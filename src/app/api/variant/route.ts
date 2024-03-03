import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../privateRoute";
import { createVariant, getVariant, getVariants } from "./variant.service";

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
      const variants = await getVariants({
        select: {
          id: true,
          name: true,
          displayAs: true,
          createdAt: true,
          updatedAt: true,
          options: {
            select: {
              id: true,
              value: true,
            },
          },
          units: {
            select: {
              name: true,
              si_unit: true,
            },
          },
        },
      });

      return NextResponse.json(variants);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}
