"use server";

import {
  $Enums,
  AttributeOptions,
  Category,
  Prisma,
  Unit,
} from "@prisma/client";
import prisma from "../../../lib/prisma.config";
import { writeFileSync } from "fs";

export interface NestedCategory extends Category {
  subCategories: NestedCategory[];
}

export const createCategory = async (options: Prisma.CategoryCreateArgs) => {
  return await prisma.category.create(options);
};

export const getCategories = async (options: Prisma.CategoryFindManyArgs) => {
  return await prisma.category.findMany(options);
};

export const getCategory = async (options: Prisma.CategoryFindUniqueArgs) => {
  return await prisma.category.findUnique(options);
};

export const executeRawCategories = async (
  options: Prisma.CategoryAggregateRawArgs,
) => {
  return await prisma.category.aggregateRaw(options);
};

export const getPath = async (
  category: null | Category,
  categoryPath: string[] = [],
  map: any,
): Promise<string[]> => {
  if (!category) return categoryPath;

  categoryPath.unshift(category.title);

  let parent = null;

  if (category.parentId) {
    if (category.parentId in map) {
      parent = map[category.parentId];
    } else {
      parent = await getCategory({
        where: {
          id: category.parentId,
        },
        select: {
          id: true,
          title: true,
          description: true,
          parentId: true,
        },
      });

      map[category.parentId] = parent;

      // const cpm = JSON.parse(
      //   JSON.stringify(
      //     (await import("../../../../categoryChildParentMap.json")).default,
      //   ),
      // );

      // writeFileSync(
      //   "categoryChildParentMap.json",
      //   JSON.stringify({ ...cpm, ...map }),
      // );
    }
  }
  return getPath(parent, categoryPath, map);
};

export const getAttrs = async (
  category: null | Prisma.CategoryGetPayload<{
    select: {
      id: true;
      title: true;
      parentId: true;
      attributes: {
        select: {
          id: true;
          name: true;
          priority: true;
          isOptional: true;
          displayAs: true;
          options: true;
          Units: {
            select: {
              id: true;
              name: true;
              si_unit: true;
            };
          };
        };
      };
    };
  }>,

  attrs: {
    id: string;
    priority: number | null;
    name: string;
    isOptional: boolean;
    displayAs: $Enums.DisplayAs;
    options: AttributeOptions[];
    Units: Prisma.UnitGetPayload<{
      select: {
        id: true;
        name: true;
        si_unit: true;
      };
    }>[];
  }[] = [],
  map: any,
): Promise<typeof attrs> => {
  if (!category) {
    const removedDulplicates: typeof attrs = [];

    attrs.forEach((attr) => {
      if (!removedDulplicates.map((d) => d.id).includes(attr.id)) {
        removedDulplicates.push(attr);
      }
    });

    return removedDulplicates;
  }
  const categoryAttributes = category.attributes.flat(3);

  attrs.unshift(...categoryAttributes);

  let parent = null;

  if (category.parentId) {
    if (category.parentId in map) {
      parent = map[category.parentId];
    } else {
      parent = await getCategory({
        where: {
          id: category.parentId,
        },
        select: {
          id: true,
          title: true,
          parentId: true,
          attributes: {
            select: {
              id: true,
              name: true,
              priority: true,
              isOptional: true,
              displayAs: true,
              options: true,
              Units: {
                select: {
                  id: true,
                  name: true,
                  si_unit: true,
                },
              },
            },
          },
        },
      });

      map[category.parentId] = parent;

      // const cpm = JSON.parse(
      //   JSON.stringify(
      //     (await import("../../../../attrsChildParentMap.json")).default,
      //   ),
      // );

      // writeFileSync(
      //   "attrsChildParentMap.json",
      //   JSON.stringify({ ...cpm, ...map }),
      // );
    }
  }
  return getAttrs(parent, attrs, map);
};
