import { z } from "zod";
import { HowYouWillGetPaidSchema } from "./HowYouWillGetPaidSchema";
import { StockYourShopSchema } from "./StockYourShopSchema";
import { SetUpBillingSchema } from "./SetUpBillingSchema";

export const ShopSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[A-Za-z]*$/, "regex-error")
    .min(4, "min-4")
    .max(20, "max-20"),
  stockYourShop: StockYourShopSchema,
  setUpBilling: SetUpBillingSchema,
  howYouWillGetPaid: HowYouWillGetPaidSchema,
});

export type ShopType = z.infer<typeof ShopSchema>;
