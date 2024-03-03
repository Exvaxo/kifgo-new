import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma.config";

export const createNewShop = async (options: Prisma.ShopCreateArgs) => {
  return await prisma.shop.create(options);
};
