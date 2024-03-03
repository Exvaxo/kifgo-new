import { z } from "zod";

export default z.object({
  id: z.string({ required_error: "Id is required." }),
  otp: z
    .string({ required_error: "Otp is required." })
    .regex(/^\d+$/, "Must be a number.")
    .length(5, "Otp has to be 5 characters long."),
});
