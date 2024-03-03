import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma.config";

export const createUser = async (data: Prisma.UserCreateArgs) => {
  return await prisma.user.create(data);
};

export const createUserIfNotExists = async (data: Prisma.UserUpsertArgs) => {
  return await prisma.user.upsert(data);
};

export const getUser = async (where: Prisma.UserFindUniqueArgs) => {
  return await prisma.user.findUnique(where);
};

const getUsers = async () => {};

export const updateUser = async (args: Prisma.UserUpdateArgs) => {
  return await prisma.user.update(args);
};

const deleteUser = async () => {};
