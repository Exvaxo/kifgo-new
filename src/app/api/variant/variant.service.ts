import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma.config";

export const createVariant = async (options: Prisma.VariantCreateArgs) => {
  return await prisma.variant.create(options);
};

export const getVariant = async (options: Prisma.VariantFindUniqueArgs) => {
  return await prisma.variant.findUnique(options);
};

export const getVariants = async (options: Prisma.VariantFindManyArgs) => {
  return await prisma.variant.findMany(options);
};
