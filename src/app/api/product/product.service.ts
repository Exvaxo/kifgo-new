"use server";
import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma.config";

export const createProduct = async (options: Prisma.ProductCreateArgs) => {
  return await prisma.product.create(options);
};

export const getProduct = async (options: Prisma.ProductFindUniqueArgs) => {
  return await prisma.product.findUnique(options);
};

export const updateProduct = async (options: Prisma.ProductUpdateArgs) => {
  return await prisma.product.update(options);
};

export const deleteProductDb = async (options: Prisma.ProductDeleteArgs) => {
  return await prisma.product.delete(options);
};

export const deleteProductSettings = async (
  options: Prisma.ProductSettingsDeleteManyArgs,
) => {
  return await prisma.productSettings.deleteMany(options);
};

export const deleteProductShipping = async (
  options: Prisma.ProductShippingDeleteManyArgs,
) => {
  return await prisma.productShipping.deleteMany(options);
};

export const deleteProductDetails = async (
  options: Prisma.ProductDetailsDeleteManyArgs,
) => {
  return await prisma.productDetails.deleteMany(options);
};

export const deleteProductAttribute = async (
  options: Prisma.ProductAttributeDeleteManyArgs,
) => {
  return await prisma.productAttribute.deleteMany(options);
};
