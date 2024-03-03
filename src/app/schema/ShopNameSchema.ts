import { z } from "zod";

export const ShopNameSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9]*$/, "regex-error")
    .min(4, "min-4")
    .max(20, "max-20"),
});

export type ShopNameType = z.infer<typeof ShopNameSchema>;
