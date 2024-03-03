import { z } from "zod";
import { ImageType, Video } from "./MediaSchema";
import { isValid } from "date-fns";

export const StockYourShopSchema = z
  .object({
    about: z.object({
      title: z
        .string()
        .trim()
        .min(4, "Minimum number of characters is 4.")
        .max(150, "Maximum number of characters is 150."),

      showSku: z.boolean().default(false),

      sku: z
        .string()
        .trim()
        .regex(/^[A-Za-z1-9 ]*$/, "Please use only Alphabets and numbers.")
        .min(1, "Minimum has to 1 character.")
        .max(50, "Maximum has to 50 character.")
        .optional()
        .or(z.literal(""))
        .nullable(),

      images: z
        .array(ImageType)
        .min(1, "You must add atleast 1 image.")
        .max(10, "Maximum number of images is 10."),

      thumbnail: ImageType,

      video: Video.optional().nullable(),

      description: z
        .string()
        .trim()
        .min(4, "Minimum number of characters is 4."),

      personalization: z
        .object({
          isPersonalization: z.boolean().default(false),
          prompt: z
            .string()
            .trim()
            .min(4, "Minimum number of characters is 4.")
            .max(300, "Maximum number of characters is 300.")
            .optional()
            .or(z.literal(""))
            .nullable(),
          isOptional: z.boolean().default(false),
        })
        .optional()
        .nullable()
        .refine((data) => !(data?.isPersonalization && !data?.prompt), {
          message: "Personalization is required.",
          path: ["prompt"],
        }),
    }),

    pricing: z
      .object({
        isGlobalPricing: z.boolean().default(false),
        isVolumePricing: z.boolean().default(false),
        srilanka: z
          .string()
          .trim()
          .min(1, "Price in Sri Lanka is required.")
          .transform(Number)
          .pipe(
            z
              .number({ invalid_type_error: "Invalid currency format." })
              .min(50, "Price must be above 50."),
          )
          .transform(String)
          .pipe(z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid currency format."))
          .optional()
          .or(z.literal(""))
          .or(z.number())
          .nullable(),

        global: z
          .string()
          .trim()
          .optional()
          .or(z.literal(""))
          .transform(Number)
          .pipe(
            z
              .number({ invalid_type_error: "Invalid currency format." })
              .min(50, "Price must be above 50."),
          )
          .transform(String)
          .pipe(z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid currency format."))
          .or(z.number())
          .optional()
          .or(z.literal(""))
          .nullable(),

        quantity: z
          .string({ required_error: "Quantity is required." })
          .trim()
          .min(1, "Quantity is required.")
          .transform(Number)
          .pipe(
            z
              .number({ invalid_type_error: "Invalid number." })
              .min(1, "Must be greater than 1."),
          )
          .transform(String)
          .optional()
          .or(z.literal(""))
          .or(z.number())
          .nullable(),

        volumePricing: z.array(
          z.object({
            quantity: z
              .string({ required_error: "Quantity is required." })
              .trim()
              .regex(
                /^(2|3|4|5|6|7|8|9|[3-9]\d+|\d{2,})$/,
                "Must be a number greater than 1.",
              )
              .optional()
              .or(z.literal(""))
              .nullable(),

            discount: z
              .string({ required_error: "Discount is required." })
              .trim()
              .regex(/^([1-9]|[1-7][0-9]|80)$/, "Percentage must be (0 - 80).")
              .optional()
              .or(z.literal(""))
              .nullable(),
          }),
        ),
      })

      .refine(
        (data) =>
          !(
            data.isVolumePricing &&
            data.volumePricing.some(
              (price) => !price.quantity || !price.discount,
            )
          ),
        {
          message: "Volume pricing is required.",
          path: [`volumePricing`],
        },
      ),

    details: z.object({
      type: z.string().trim(),
      whoMadeIt: z.string().trim(),
      whatIsIt: z.string().trim(),
      whenDidYouMakeIt: z.string().trim(),
      categoryId: z
        .string({ required_error: "Category is required." })
        .trim()
        .min(1, "Category is required."),
      attributes: z.array(
        z.object({
          attributeId: z.string().trim(),
          value: z.string().trim(),
          unitId: z.string().optional().nullable(),
        }),
      ),
      tags: z.array(z.string().trim()),
      materials: z.array(z.string().trim()),
    }),

    variation: z
      .array(
        z
          .object({
            variationId: z.string(),
            isGroup: z.boolean().default(false),
            isSelected: z.boolean().default(false),
            visibility: z.boolean().default(true),

            variantSettings: z.object({
              price: z.boolean().default(false),
              quantity: z.boolean().default(false),
              sku: z.boolean().default(false),
            }),

            sku: z
              .string()
              .trim()
              .regex(
                /^[A-Za-z1-9 ]*$/,
                "Please use only Alphabets and numbers.",
              )
              .min(1, "Minimum has to 1 character.")
              .max(50, "Maximum has to 50 character.")
              .optional()
              .or(z.literal(""))
              .nullable()
              .default(null),

            pricing: z
              .object({
                srilanka: z
                  .string()
                  .trim()
                  .transform(Number)
                  .optional()
                  .or(z.literal(""))
                  .pipe(
                    z.number({
                      invalid_type_error: "Invalid currency format.",
                    }), // .min(50, "Price must be above 50."),
                  )
                  .transform(String)
                  .pipe(
                    z
                      .string()
                      .regex(/^-?\d+(\.\d+)?$/, "Invalid currency format."),
                  )
                  .optional()
                  .or(z.literal(""))
                  .nullable(),

                global: z
                  .string()
                  .trim()
                  .optional()
                  .or(z.literal(""))
                  .transform(Number)
                  .pipe(
                    z.number({
                      invalid_type_error: "Invalid currency format.",
                    }),
                  )
                  .transform(String)
                  .pipe(
                    z
                      .string()
                      .regex(/^-?\d+(\.\d+)?$/, "Invalid currency format."),
                  )
                  .optional()
                  .or(z.literal(""))
                  .nullable(),
              })
              .optional()
              .nullable(),

            quantity: z
              .string()
              .trim()
              .transform(Number)
              .pipe(
                z
                  .number({ invalid_type_error: "Invalid number." })
                  .min(0, "Must be greater than 0.")
                  .max(999, "Must be less than 999."),
              )
              .transform(String)
              .optional()
              .or(z.literal(""))
              .or(z.number())
              .nullable(),

            sold: z
              .string()
              .trim()
              .regex(/^\d+$/, "Must be a number.")
              .optional()
              .or(z.literal(""))
              .or(z.number())
              .nullable(),

            combination: z.array(
              z.object({
                variant: z.string().trim(),
                variantId: z.string().trim(),
                value: z.string().trim(),
                unit: z
                  .string()
                  .trim()
                  .optional()
                  .or(z.literal(""))
                  .nullable()
                  .default(null),
                isEditable: z.boolean().default(false),
              }),
            ),
          })
          .refine(
            (data) => {
              if (data.variantSettings.price && data.visibility) {
                if (
                  data.pricing?.srilanka !== null &&
                  data.pricing?.srilanka !== undefined &&
                  parseInt(data.pricing.srilanka) < 50
                ) {
                  return false;
                }
              }

              return true;
            },
            {
              message: "Price must be greater than 50",
              path: ["pricing.srilanka"],
            },
          ),
      )
      .default([]),

    shipping: z.object({
      profile: z
        .string({ required_error: "Shipping profile is required." })
        .trim()
        .min(1, "Refund policy is required."),
    }),

    settings: z
      .object({
        policyId: z
          .string({ required_error: "Refund policy is required." })
          .trim()
          .min(1, "Refund policy is required."),
        section: z.string().trim().optional().nullable(),
        featured: z.boolean().default(false),
      })
      .optional()
      .nullable(),
  })
  .refine(
    (data) =>
      !(
        data.pricing.isGlobalPricing &&
        !data.pricing.global &&
        !data.variation.some((vari) => vari.variantSettings.price)
      ),
    {
      message: "Global pricing is required.",
      path: ["pricing.global"],
    },
  );

export type StockYouShopType = z.infer<typeof StockYourShopSchema>;
