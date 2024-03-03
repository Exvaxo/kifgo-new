import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../privateRoute";
import { Prisma } from "@prisma/client";
import { createAttribute, getAttributes } from "./attribute.service";

/* 
    !   Implement admin priviledge.
*/

export async function POST(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    try {
      const attribute = await createAttribute({
        data: {
          name: "Primary Color",
          displayAs: "SELECT",
          options: {
            createMany: {
              data: [
                {
                  name: "Pink",
                },
                {
                  name: "Red",
                },
                {
                  name: "Yellow",
                },
              ],
            },
          },

          // name: "Recycled",
          // displayAs: "RADIO",
          // options: {
          //   createMany: {
          //     data: [
          //       {
          //         name: "yes",
          //       },
          //       {
          //         name: "no",
          //       },
          //     ],
          //   },
          // },

          // name: "Material",
          // displayAs: "CHECKBOX",
          // options: {
          //   createMany: {
          //     data: [
          //       {
          //         name: "Rose gold",
          //       },
          //       {
          //         name: "Rubber",
          //       },
          //       {
          //         name: "Plastic",
          //       },
          //       {
          //         name: "Silver",
          //       },
          //     ],
          //   },
          // },

          // name: "Length",
          // displayAs: "INPUT",
          // unitIds: {
          //   set: [
          //     "65538ef2f45205456da2aa59",
          //     "65538ef2f45205456da2aa61",
          //     "65538ef2f45205456da2aa5a",
          //     "65538ef2f45205456da2aa5b",
          //     "65538ef2f45205456da2aa5c",
          //   ],
          // },
        },
      });
      return NextResponse.json({ attribute });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}

export async function GET(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    try {
      const attributes = await getAttributes({
        where: {},
      });
      return NextResponse.json({ attributes });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}
