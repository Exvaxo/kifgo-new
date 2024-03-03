import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma.config";

export const createShipping = async (options: Prisma.ShippingCreateArgs) => {
  return await prisma.shipping.create(options);
};

export const updateShipping = async (options: Prisma.ShippingUpdateArgs) => {
  return await prisma.shipping.update(options);
};

export const getShippings = async (options: Prisma.ShippingFindManyArgs) => {
  return await prisma.shipping.findMany(options);
};

export const getShipping = async (options: Prisma.ShippingFindUniqueArgs) => {
  return await prisma.shipping.findUnique(options);
};

export const deleteShipping = async (options: Prisma.ShippingDeleteArgs) => {
  return await prisma.shipping.delete(options);
};
