import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma.config";

export const createOtp = async (args: Prisma.OtpUpsertArgs) => {
  return await prisma.otp.upsert(args);
};

export const getOtp = async (where: Prisma.OtpFindUniqueArgs) => {
  return await prisma.otp.findUnique(where);
};

export const deleteOtp = async (where: Prisma.OtpDeleteArgs) => {
  return await prisma.otp.delete(where);
};
