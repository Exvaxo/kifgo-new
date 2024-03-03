import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma.config";

export const createUnit = async (options: Prisma.UnitCreateArgs) => {
  return await prisma.unit.create(options);
};

export const createUnits = async (options: Prisma.UnitCreateManyArgs) => {
  return await prisma.unit.createMany(options);
};

export const getUnits = async (options: Prisma.UnitFindManyArgs) => {
  return await prisma.unit.findMany(options);
};
