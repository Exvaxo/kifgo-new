"use server";

import {
  getCategories,
  getCategory,
} from "@/app/api/category/category.service";
import { revalidatePath } from "next/cache";
import prisma from "../../../lib/prisma.config";
import { Prisma } from "@prisma/client";
import isValid from "@/utilities/isValid";

export async function checkEligibityToDelete(id: string) {
  try {
    const cat = (await getCategory({
      where: {
        id,
      },
      select: {
        _count: true,
      },
    })) as unknown as Prisma.CategoryGetPayload<{
      select: {
        _count: true;
      };
    }>;

    return cat._count.ProductDetails > 0 ? false : true;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCategories() {
  try {
    return await getCategories({
      where: {},
      include: {
        attributes: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateCategoryName(id: string, title: string) {
  const cat = await prisma.category.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  revalidatePath("/admin/categories");
  return cat;
}

export async function updateCategoryAttributes(
  id: string,
  attributes: string[],
) {
  const cat = await prisma.category.update({
    where: {
      id,
    },
    data: {
      attributeIds: attributes,
    },
  });

  revalidatePath("/admin/categories");
  return cat;
}

export async function createCategory(parentId?: string | null) {
  if (!parentId) {
    return null;
  }

  const cat = await prisma.category.create({
    data: {
      title: "",
      parent: {
        connect: {
          id: parentId,
        },
      },
    },
  });

  revalidatePath("/admin/categories");
  return cat;
}

export async function createRootCategory() {
  const cat = await prisma.category.create({
    data: {
      title: "",
    },
  });

  revalidatePath("/admin/categories");
  return cat;
}

export async function deleteCategoryDb(id: string) {
  await prisma.category.delete({
    where: {
      id,
    },
  });
}

export async function loadAttributes(searchTerm?: string) {
  const whereObj: Prisma.AttributeWhereInput = {};

  if (isValid(searchTerm)) {
    whereObj.OR = [
      {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    ];
  }

  return await prisma.attribute.findMany({
    where: whereObj,
    orderBy: {
      name: "asc",
    },
  });
}
