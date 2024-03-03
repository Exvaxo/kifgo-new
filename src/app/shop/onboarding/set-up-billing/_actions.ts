"use server";
/* 
  SHOP
*/

import { createNewShop } from "@/app/api/shop/shop.service";
import { ShopType } from "@/app/schema/ShopSchema";
import { getCurrentUser } from "@/utilities/getCurrentUser";
import { Prisma, ProductVariation } from "@prisma/client";
import { auth } from "firebase-admin";

export async function createShop(data: ShopType) {
  try {
    const decodedClaims = await getCurrentUser();

    const productDetails: Prisma.ProductDetailsCreateNestedOneWithoutProductInput =
      {
        create: {
          type: data.stockYourShop.details.type,
          whatIsIt: data.stockYourShop.details.whatIsIt,
          whenDidYouMakeIt: data.stockYourShop.details.whenDidYouMakeIt,
          whoMadeIt: data.stockYourShop.details.whoMadeIt,

          tags: data.stockYourShop.details.tags,
          materials: data.stockYourShop.details.materials,
          category: {
            connect: {
              id: data.stockYourShop.details.categoryId,
            },
          },
        },
      };

    if (data.stockYourShop.details.attributes.length > 0) {
      productDetails.create!.attributes = {
        createMany: {
          data: data.stockYourShop.details.attributes.map((attr) =>
            attr.unitId
              ? {
                  attributeId: attr.attributeId || "",
                  unitId: attr.unitId,
                  value: attr.value || "",
                }
              : {
                  attributeId: attr.attributeId || "",
                  value: attr.value || "",
                },
          ),
        },
      };
    }

    const modifiedProduct:
      | Prisma.ProductCreateNestedManyWithoutShopInput
      | undefined = {
      create: {
        about: data.stockYourShop.about,
        pricing: {
          global: data.stockYourShop.pricing.global as string,
          srilanka: data.stockYourShop.pricing.srilanka as string,
          isGlobalPricing: data.stockYourShop.pricing.isGlobalPricing,
          isVolumePricing: data.stockYourShop.pricing.isVolumePricing,
          quantity: data.stockYourShop.pricing.quantity as string,
          volumePricing: data.stockYourShop.pricing.volumePricing,
        },
        policy: {
          connect: {
            id: data.stockYourShop.settings?.policyId,
          },
        },
        details: productDetails,
        shipping: {
          create: {
            shipping: {
              connect: {
                id: data.stockYourShop.shipping.profile,
              },
            },
          },
        },
        settings: {
          create: data.stockYourShop.settings!,
        },
      },
    };

    if (
      data.stockYourShop.variation &&
      data.stockYourShop.variation.length > 0
    ) {
      modifiedProduct.create! = {
        ...modifiedProduct.create!,
        variation: {
          createMany: {
            data: data.stockYourShop.variation.map((variant) => {
              let obj: any;
              obj = {
                variationId: variant.variationId,
                variantSettings: variant.variantSettings,
                combination: variant.combination,
                isGroup: variant.isGroup,
                isSelected: variant.isSelected,
                quantity: parseInt((variant.quantity as string) || "0"),
                sku: variant.sku,
                sold: parseInt((variant.sold as string) || "0"),
                visibility: variant.visibility,
              };

              if (variant.pricing) {
                obj.pricing = {
                  global: variant.pricing?.global,
                  srilanka: variant.pricing?.srilanka,
                };
              }

              return obj;
            }),
          },
        },
      };
    }

    const shop = await createNewShop({
      data: {
        name: data.name,
        howYouWillGetPaid: data.howYouWillGetPaid,
        setUpBilling: data.setUpBilling,
        products: modifiedProduct,
        user: {
          connect: {
            id: decodedClaims.id,
          },
        },
      },
    });

    await auth().setCustomUserClaims(decodedClaims.uid, {
      isOnBoardingComplete: true,
      id: decodedClaims.id,
    });

    return shop;
  } catch (error) {
    console.log(error);
  }
}
