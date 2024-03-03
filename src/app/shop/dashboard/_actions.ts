"use server";
import { getCurrentUser } from "@/utilities/getCurrentUser";
import prisma from "../../../lib/prisma.config";

export async function getProductCount() {
  const decodedClaims = await getCurrentUser();
  const count = await prisma.product.count({
    where: {
      Shop: {
        userId: decodedClaims.id,
      },
    },
  });

  return count;
}
