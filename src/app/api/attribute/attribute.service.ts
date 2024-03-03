"use server";
import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma.config";

export const createAttribute = async (options: Prisma.AttributeCreateArgs) => {
  return await prisma.attribute.create(options);
};

export const getAttributes = async (options: Prisma.AttributeFindManyArgs) => {
  return await prisma.attribute.findMany(options);
};

export const updateAttributeOption = async (
  options: Prisma.AttributeOptionsUpdateWithWhereUniqueWithoutAttributeInput,
) => {
  return await prisma.attributeOptions.update(options);
};
