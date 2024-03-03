"use server";

import { z } from "zod";
import prisma from "../lib/prisma.config";
import { isEmailAvailableSchema } from "./user/register/EmailCheckForm";

type Inputs = z.infer<typeof isEmailAvailableSchema>;
export async function isEmailAvailable(formData: Inputs) {
  const user = await prisma.user.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (user) {
    return `user-exists`;
  }
}

export async function isEmailValid(formData: Inputs) {
  const user = await prisma.user.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (!user) {
    return `no-user-found`;
  }
}
