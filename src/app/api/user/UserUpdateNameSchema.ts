import { z } from "zod";

export default z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be atlest 3 characters long."),
  lastName: z
    .string()
    .trim()
    .min(3, "Last name must be atlest 3 characters long."),
});
