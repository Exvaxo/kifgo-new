import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../privateRoute";
import { Category, Prisma } from "@prisma/client";
import {
  createCategory,
  executeRawCategories,
  getCategories,
  getPath,
} from "./category.service";

/* 
    !   Implement admin priviledge.
*/

export async function POST(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    try {
      const category = await createCategory({
        data: {
          // title: "Room decor",
          // attributes: {
          //   connect: [
          //     {
          //       id: "657712782f619339a4e695f1",
          //     },
          //     {
          //       id: "6577139deecb041068a4c040",
          //     },
          //   ],
          // },
          // description: "Room decoration",
          // tags: {
          //   set: ["decor", "room"],
          // },

          //   title: "Clothing",
          //   attributes: {
          //     connect: [
          //       {
          //         id: "657712782f619339a4e695f1",
          //       },
          //       {
          //         id: "6577139deecb041068a4c040",
          //       },
          //     ],
          //   },
          //   description: "All clothes",
          //   tags: {
          //     set: ["cloth", "dress"],
          //   },

          title: "Mens Jwellery",
          parent: {
            connect: {
              id: "657af61c7f89834b606b4a6d",
            },
          },
          description: "Mens jwellery",
          tags: {
            set: ["gold", "men", "jwellery"],
          },
          // attributes: {
          //   connect: [
          //     {
          //       id: "657713a9eecb041068a4c043",
          //     },
          //   ],
          // },

          //   title: "Womens clothing",
          //   parent: {
          //     connect: {
          //       id: "657713c8eecb041068a4c048",
          //     },
          //   },
          //   description: "Womens clothings",
          //   tags: {
          //     set: ["men", "cloth", "women"],
          //   },
          //   attributes: {
          //     connect: [
          //       {
          //         id: "657713a9eecb041068a4c043",
          //       },
          //     ],
          //   },
          // },

          // title: "Shudi",
          // parent: {
          //   connect: {
          //     id: "6577fff441bf7e67d09a0320",
          //   },
          // },
          // description: "Womens clothings shudidar",
          // tags: {
          //   set: ["shudi", "cloth", "women"],
          // },
          // attributes: {
          //   connect: [
          //     {
          //       id: "657713a9eecb041068a4c043",
          //     },
          //   ],
          // },
        },
      });
      return NextResponse.json({ category });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}

export async function GET(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    try {
      const categories = await getCategories({
        where: {
          parent: null,
        },
      });

      return NextResponse.json({ categories });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}
