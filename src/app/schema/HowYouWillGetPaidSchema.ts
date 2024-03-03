import { SellerType } from "@prisma/client";
import { z } from "zod";
import { ShopOwnerSchema } from "./ShopOwnerSchema";

export const HowYouWillGetPaidSchema = z.object({
  bankLocation: z
    .string({ required_error: "Bank location is required." })
    .trim()
    .regex(/^[A-Za-z1-9 ]*$/, "Please use only Alphabets and numbers."),
  typeOfSeller: z.nativeEnum(SellerType),

  individual: z
    .object({
      personalInformation: z.object({
        firstName: z
          .string({ required_error: "First name is required." })
          .trim()
          .regex(/^[A-Za-z1-9 ]*$/, "Please use only Alphabets and numbers.")
          .min(3, "Name must be alteast 3 characters long."),
        lastName: z
          .string({ required_error: "Last name is required." })
          .trim()
          .regex(/^[A-Za-z1-9 ]*$/, "Please use only Alphabets and numbers.")
          .min(3, "Name must be alteast 3 characters long."),
        dateOfBirth: z
          .string({ required_error: "Date of birth is required." })
          .trim()
          .min(1, "Date of birth is required.")
          .transform((str) => new Date(str)),
        nationality: z
          .string({ required_error: "Nationality is required." })
          .trim()
          .regex(/^[A-Za-z1-9 ]*$/, "Please use only Alphabets and numbers.")
          .min(1, "Nationality is required."),
        nic: z
          .string({ required_error: "Nic is required." })
          .trim()
          .min(1, "Nic is required."),
        countryOfResidence: z
          .string({ required_error: "Country of residence is required." })
          .trim()
          .regex(/^[A-Za-z1-9 ]*$/, "Please use only Alphabets and numbers.")
          .min(1, "Country of residence is required."),
      }),
      taxPayerAddress: z.object({
        streetAddress: z
          .string({ required_error: "Street address is required." })
          .trim()
          .min(5, "Address must be atleast 5 characters long."),
        other: z.string().trim().optional(),
        city: z
          .string({ required_error: "City is required." })
          .trim()
          .regex(/^[A-Za-z1-9 ]*$/, "Please use only Alphabets and numbers.")
          .min(1, "City is required."),
        postalCode: z
          .string({ required_error: "Postal code is required." })
          .trim()
          .min(1, "Postal code is required."),
        state: z
          .string({ required_error: "State / Province is required." })
          .trim()
          .regex(/^[A-Za-z1-9 ]*$/, "Please use only Alphabets and numbers.")
          .min(1, "State / Province is required."),
        businessPhoneNumber: z.object({
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
    })
    .optional()
    .nullable()
    .default(null),

  business: z
    .object({
      businessInformation: z.object({
        businessType: z.string().trim().optional(),
        nameOfLegalEntity: z
          .string({ required_error: "Name of legal entity is required." })
          .trim()
          .min(1, "Name of legal entity is required."),
        businessRegistrationNumber: z
          .string({
            required_error: "Business registration number is required.",
          })
          .trim()
          .min(1, "Business registration number is required."),
      }),
      businessAddress: z.object({
        country: z
          .string({ required_error: "Country is required." })
          .trim()
          .min(1, "Country is required."),
        streetAddress: z
          .string({ required_error: "Address is required." })
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
        businessPhoneNumber: z.object({
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
      primaryOwner: ShopOwnerSchema,
      additionalOwner: z.array(ShopOwnerSchema),
    })
    .optional()
    .nullable()
    .default(null)
    .or(z.literal(null)),

  bankInformation: z.object({
    fullNameOnAccount: z
      .string({ required_error: "Full name of account is required." })
      .trim()
      .min(3, "Name must be atleast 3 characters long."),

    accountNumber: z
      .string({ required_error: "Account number is required." })
      .trim()
      .min(1, "Account number is required."),

    swift_bic: z
      .string({ required_error: "SWIFT/BIC is required." })
      .trim()
      .min(1, "SWIFT/BIC is required."),

    name: z
      .string({ required_error: "Bank name is required." })
      .trim()
      .min(3, "Name must be atleast 3 characters long."),

    city: z
      .string({ required_error: "City is required." })
      .trim()
      .min(1, "City is required."),

    state: z
      .string({ required_error: "State / Province is required." })
      .trim()
      .min(1, "State / Province is required."),
  }),
});

export type HowYouWillGetPaidType = z.infer<typeof HowYouWillGetPaidSchema>;
