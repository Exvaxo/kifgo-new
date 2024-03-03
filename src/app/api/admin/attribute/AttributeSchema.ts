import { DisplayAs } from "@prisma/client";
import { z } from "zod";

export default z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be greater than 3 characters long."),
  displayAs: z.nativeEnum(DisplayAs),
  description: z.string().trim().optional(),
  options: z
    .array(
      z.object({
        id: z.string().trim().optional(),
        name: z.string({ required_error: "Option is required." }).trim(),
      }),
    )
    .optional(),
  units: z.array(z.string()).optional(),
});
