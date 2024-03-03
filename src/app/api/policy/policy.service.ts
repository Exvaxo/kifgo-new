"use server";
import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma.config";

export const createPolicy = async (options: Prisma.PolicyCreateArgs) => {
  return await prisma.policy.create(options);
};

export const updatePolicy = async (options: Prisma.PolicyUpdateArgs) => {
  return await prisma.policy.update(options);
};

export const getPolicies = async (options: Prisma.PolicyFindManyArgs) => {
  return await prisma.policy.findMany(options);
};

export const getPolicy = async (options: Prisma.PolicyFindUniqueArgs) => {
  return await prisma.policy.findUnique(options);
};

export const deletePolicy = async (options: Prisma.PolicyDeleteArgs) => {
  return await prisma.policy.delete(options);
};
