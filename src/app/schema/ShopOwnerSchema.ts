import { z } from "zod";

export const ShopOwnerSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required." })
    .trim()
    .min(3, "Name must be alteast 3 characters long."),
  lastName: z
    .string({ required_error: "Last name is required." })
    .trim()
    .min(3, "Name must be alteast 3 characters long."),
  dateOfBirth: z
    .string({ required_error: "Date of birth is required." })
    .trim()
    .min(1, "Date of birth is required.")
    .transform((str) => new Date(str))
    .or(z.undefined()),
  nic: z
    .string({ required_error: "Nic is required." })
    .trim()
    .min(1, "Nic is required."),
  address: z.object({
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
    phone: z.object({
      countryCode: z
        .string({ required_error: "Country code is required." })
        .trim()
        .min(2, "Country code is required."),
      number: z
        .string({ required_error: "Country code is required." })
        .trim()
        .regex(/^\d+$/, "Must be a number.")
        .min(7, "Minimum has to be 7 characters")
        .max(15, "Maximum has to be 15 characters"),
    }),
  }),
});

export type ShopOwnerType = z.infer<typeof ShopOwnerSchema>;
