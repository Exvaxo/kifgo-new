import { z } from "zod";

export const SetUpBillingSchema = z.object({
  billingAddress: z.object({
    country: z
      .string({ required_error: "Country is required." })
      .trim()
      .min(1, "Country is required."),
    streetAddress: z
      .string({ required_error: "Street address is required." })
      .trim()
      .min(5, "Address must be atleast 5 characters long."),
    other: z.string().trim().optional(),
    city: z
      .string({ required_error: "City is required." })
      .trim()
      .min(1, "City is required."),
    postalCode: z
      .string({ required_error: "Postal code is required." })
      .trim()
      .min(1, "Postal code is required."),
    state: z
      .string({ required_error: "State / Province is required." })
      .trim()
      .min(1, "State / Province is required."),
  }),
});

export type SetUpBillingType = z.infer<typeof SetUpBillingSchema>;
