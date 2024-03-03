import { z } from "zod";
import { IdentifyVerificationType } from "@prisma/client";

export default z.object({
  uid: z.string({ required_error: "Firebase uid is required." }).trim(),
  photoURL: z.string().trim().optional(),
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be atlest 3 characters long.")
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .trim()
    .min(3, "Last namr must be atlest 3 characters long.")
    .optional()
    .or(z.literal("")),
  email: z.string({ required_error: "Email is required." }).trim().email(),
  contactNumber: z
    .object({
      countryCode: z.string(),
      number: z
        .string()
        .trim()
        .regex(/^\d+$/, "Must be a number.")
        .min(7, "Minimum has to be 7 characters")
        .max(15, "Maximum has to be 15 characters"),
    })
    .optional(),
  address: z
    .object({
      addressLine1: z
        .string({ required_error: "Address is required." })
        .trim()
        .min(5, "Address must be atleat 5 characters long."),
      addressLine2: z.string().optional(),
    })
    .optional()
    .nullable(),

  city: z.string().trim().optional(),
  postalCode: z.string().trim().optional(),
  province: z.string().trim().optional(),
  country: z.string().trim().optional(),
  identityVerification: z
    .object({
      type: z.nativeEnum(IdentifyVerificationType),
      value: z.string({ required_error: "Value is required." }).trim(),
      proof: z.array(z.string({ required_error: "Proof is required." }).trim()),
    })
    .optional()
    .nullable(),
});
