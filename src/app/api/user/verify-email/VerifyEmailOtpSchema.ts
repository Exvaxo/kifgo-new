import { z } from "zod";

export default z.object({
  otp: z
    .string({ required_error: "Otp is required." })
    .regex(/^\d+$/, "Must be a number.")
    .length(5, "Otp has to be 5 characters long."),
});
