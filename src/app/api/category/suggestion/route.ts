import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import privateRoute from "../../privateRoute";
import { executeRawCategories, getPath } from "../category.service";

export async function GET(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    try {
      const searchTerm = request.nextUrl.searchParams.get("query");

      const searchObj = {
        $search: {
          index: "category_search",
          compound: {
            should: [
              {
                autocomplete: {
                  query: searchTerm,
                  path: "title",
                  tokenOrder: "any",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
              {
                autocomplete: {
                  query: searchTerm,
                  path: "description",
                  tokenOrder: "any",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
            ],
          },
        },
      };

      const pipeline: any[] = [];

      pipeline.push(searchObj);

      /*
       * By default prisma stroes ObjectId in the form of;
       * "_id": {
       *   "oid" : "6828368686499"
       * }
       * So converting it to string is required in order to match what the default prisma outputs.
       * This adds id,authorId and stringifies the _id in author object.
       */
      pipeline.push({
        $addFields: {
          id: {
            $toString: "$_id",
          },
          parentId: {
            $toString: "$parentId",
          },
        },
      });

      /*
       * Removes the _id property from the output, since we are having an id property instead.
       * This is done to match the default prisma output.
       */
      pipeline.push({
        $unset: ["_id"],
      });

      pipeline.push({
        $project: {
          id: true,
          parentId: true,
          description: true,
          title: true,
        },
      });

      const categories = (await executeRawCategories({
        pipeline,
      })) as unknown as Category[];

      const results = await Promise.all(
        categories.map(async (category) => {
          return {
            id: category.id,
            name: category.title,
            description: category.description,
            path: await getPath(category, [], {}),
          };
        }),
      );

      return NextResponse.json({ results });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}
