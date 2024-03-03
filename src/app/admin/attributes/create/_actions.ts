"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma.config";
import { AttributeInput } from "./Form";
import { Prisma } from "@prisma/client";

export async function createAttribute(attribute: AttributeInput) {
  const createData:
    | (Prisma.Without<
        Prisma.AttributeCreateInput,
        Prisma.AttributeUncheckedCreateInput
      > &
        Prisma.AttributeUncheckedCreateInput)
    | (Prisma.Without<
        Prisma.AttributeUncheckedCreateInput,
        Prisma.AttributeCreateInput
      > &
        Prisma.AttributeCreateInput) = {
    name: attribute.name,
    displayAs: attribute.displayAs,
    description: attribute.description,
  };

  if (attribute.options && attribute.options.length > 0) {
    createData.options = {
      createMany: {
        data: attribute.options.map((opt) => ({
          name: opt.name,
        })),
      },
    };
  }

  if (attribute.units && attribute.units.length > 0) {
    createData.unitIds = {
      set: attribute.units,
    };
  }

  await prisma.attribute.create({
    data: createData,
  });

  revalidatePath("/admin/attributes");

  return { message: "created" };
}
