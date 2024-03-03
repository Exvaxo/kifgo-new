import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma.config";

export const createVariantOption = async (
  options: Prisma.VariantOptionCreateArgs,
) => {
  return await prisma.variantOption.create(options);
};
