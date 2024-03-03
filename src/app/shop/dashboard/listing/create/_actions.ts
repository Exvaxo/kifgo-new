"use server";

import {
  executeRawCategories,
  getAttrs,
  getCategories,
  getCategory,
  getPath,
} from "@/app/api/category/category.service";
import {
  createShipping,
  deleteShipping,
  getShipping,
  getShippings,
  updateShipping,
} from "@/app/api/shipping/shipping.service";
import { getCurrentUser } from "@/utilities/getCurrentUser";
import { Category, Prisma } from "@prisma/client";
import { CreateShippingProfileInputType } from "./Shipping";
import { CreatePolicyInputType } from "./Settings";
import {
  createPolicy,
  deletePolicy,
  getPolicies,
  getPolicy,
  updatePolicy,
} from "@/app/api/policy/policy.service";
import { getVariants } from "@/app/api/variant/variant.service";
import {
  createProduct,
  getProduct as gp,
} from "@/app/api/product/product.service";
import { StockYouShopType } from "@/app/schema/StockYourShopSchema";
import { getUser } from "@/app/api/user/user.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* 
  PRODUCT
*/

export async function getProduct(id: string) {
  try {
    return (await gp({
      where: {
        id,
      },
      include: {
        details: {
          include: {
            attributes: true,
            category: true,
          },
        },
        policy: true,
        settings: true,
        Shipping: true,
        Shop: true,
        shipping: true,
        variation: true,
      },
    })) as
      | Prisma.ProductGetPayload<{
          include: {
            details: {
              include: {
                attributes: true;
                category: true;
              };
            };
            policy: true;
            settings: true;
            Shipping: true;
            shipping: true;
            Variation: true;
            variation: true;
          };
        }>
      | undefined;
  } catch (error) {
    console.log(error);
  }
}

export async function createListing(data: StockYouShopType) {
  const decodedClaims = await getCurrentUser();

  const user = (await getUser({
    where: {
      id: decodedClaims.id,
    },
    select: {
      Shop: {
        select: {
          id: true,
        },
      },
    },
  })) as unknown as Prisma.UserGetPayload<{
    select: {
      Shop: {
        select: {
          id: true;
        };
      };
    };
  }>;

  const shopId = user.Shop[0]?.id;

  if (shopId) {
    const productDetails: Prisma.ProductDetailsCreateNestedOneWithoutProductInput =
      {
        create: {
          type: data.details.type,
          whatIsIt: data.details.whatIsIt,
          whenDidYouMakeIt: data.details.whenDidYouMakeIt,
          whoMadeIt: data.details.whoMadeIt,

          tags: data.details.tags,
          materials: data.details.materials,
          category: {
            connect: {
              id: data.details.categoryId,
            },
          },
        },
      };

    if (data.details.attributes.length > 0) {
      productDetails.create!.attributes = {
        createMany: {
          data: data.details.attributes.map((attr) =>
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

    const modifiedData:
      | (Prisma.Without<
          Prisma.ProductCreateInput,
          Prisma.ProductUncheckedCreateInput
        > &
          Prisma.ProductUncheckedCreateInput)
      | (Prisma.Without<
          Prisma.ProductUncheckedCreateInput,
          Prisma.ProductCreateInput
        > &
          Prisma.ProductCreateInput) = {
      about: data.about,
      pricing: {
        global: data.pricing.global as string,
        srilanka: data.pricing.srilanka as string,
        isGlobalPricing: data.pricing.isGlobalPricing,
        isVolumePricing: data.pricing.isVolumePricing,
        quantity: data.pricing.quantity as string,
        volumePricing: data.pricing.volumePricing,
      },
      policy: {
        connect: {
          id: data.settings?.policyId,
        },
      },
      details: productDetails,
      shipping: {
        create: {
          shipping: {
            connect: {
              id: data.shipping.profile,
            },
          },
        },
      },
      settings: {
        create: data.settings!,
      },

      Shop: {
        connect: {
          id: shopId,
        },
      },
    };

    if (data.variation && data.variation.length > 0) {
      modifiedData.variation = {
        createMany: {
          data: data.variation.map((variant) => {
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
      };
    }

    const product = await createProduct({
      data: modifiedData,
    });

    revalidatePath("/shop/dashboard/listing", "page");
    redirect("/shop/dashboard/listing");
    return product;
  }
}

/* 
  VARIANTS
*/

export async function loadVariants() {
  try {
    const variants = await getVariants({
      select: {
        id: true,
        name: true,
        displayAs: true,
        createdAt: true,
        updatedAt: true,
        options: {
          select: {
            id: true,
            value: true,
          },
        },
        units: {
          select: {
            name: true,
            si_unit: true,
          },
        },
      },
    });
    return variants;
  } catch (error) {
    console.log(error);
    return [];
  }
}

/* 
  CATEGORIES
*/

export async function loadCategorySuggestion(searchTerm: string) {
  try {
    let categories: Category[] = [];

    if (searchTerm === "") {
      categories = await getCategories({
        where: {},
        select: {
          id: true,
          title: true,
          parentId: true,
          description: true,
        },
        take: 5,
        skip: 0,
      });
    } else {
      const searchObj = {
        $search: {
          index: "category_search_index",
          text: {
            query: searchTerm,
            path: {
              wildcard: "*",
            },
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      };

      const pipeline: any[] = [];

      pipeline.push(searchObj);

      /*
       * By default prisma stroes ObjectId in the form of;
       * "_id": {
       *   "oid" : "6828368686499"
       * }
       * So converting it to string is required in order to match what the default prisma outputs.
       * This adds id,authorId and stringifies the _id in author object.
       */

      pipeline.push({
        $addFields: {
          id: {
            $toString: "$_id",
          },
          parentId: {
            $toString: "$parentId",
          },
        },
      });

      /*
       * Removes the _id property from the output, since we are having an id property instead.
       * This is done to match the default prisma output.
       */
      pipeline.push({
        $unset: ["_id"],
      });

      pipeline.push({
        $limit: 5,
      });

      pipeline.push({
        $skip: 0,
      });

      pipeline.push({
        $project: {
          id: true,
          parentId: true,
          description: true,
          title: true,
        },
      });

      categories = (await executeRawCategories({
        pipeline,
      })) as unknown as Category[];
    }

    const results = await Promise.all(
      categories.map(async (category) => {
        return {
          id: category.id,
          title: category.title,
          description: category.description,
          path: await getPath(category, [], {}),
        };
      }),
    );

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function loadRootCategories() {
  try {
    return await getCategories({
      where: { parent: null },
      select: {
        id: true,
        parentId: true,
        title: true,
      },
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function loadSubCategories(parentId: string) {
  try {
    const categories = await getCategories({
      where: {
        parent: {
          id: parentId,
        },
      },
      select: {
        id: true,
        parentId: true,
        title: true,
      },
    });

    const results = await Promise.all(
      categories.map(async (category) => {
        return {
          id: category.id,
          title: category.title,
          path: await getPath(category, [], {}),
        };
      }),
    );

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function loadAttributes(categoryId: string) {
  try {
    const category = (await getCategory({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        title: true,
        parentId: true,
        attributes: {
          select: {
            id: true,
            name: true,
            priority: true,
            isOptional: true,
            displayAs: true,
            options: true,
            Units: {
              select: {
                id: true,
                name: true,
                si_unit: true,
              },
            },
          },
        },
      },
    })) as unknown as Prisma.CategoryGetPayload<{
      select: {
        id: true;
        title: true;
        parentId: true;
        attributes: {
          select: {
            id: true;
            name: true;
            priority: true;
            isOptional: true;
            displayAs: true;
            options: true;
            Units: {
              select: {
                id: true;
                name: true;
                si_unit: true;
              };
            };
          };
        };
      };
    }>;

    const attrs = await getAttrs(category, [], {});

    return attrs;
  } catch (error) {
    console.log(error);
  }
}

/* 
  SHIPPING
*/

export async function createShippingProfile(
  body: CreateShippingProfileInputType,
) {
  try {
    const decodedClaims = await getCurrentUser();
    const shipping_profile = await createShipping({
      data: {
        ...body,
        User: {
          connect: {
            id: decodedClaims.id,
          },
        },
      },
    });

    return shipping_profile;
  } catch (error) {
    console.log(error);
  }
}

export async function updateShippingProfile(
  body: CreateShippingProfileInputType,
  id: string,
) {
  try {
    const decodedClaims = await getCurrentUser();
    const updated_shipping_profile = await updateShipping({
      where: {
        id,
        userId: decodedClaims.id,
      },
      data: {
        ...body,
      },
    });

    return updated_shipping_profile;
  } catch (error) {
    console.log(error);
  }
}

export async function getShippingProfiles() {
  try {
    const decodedClaims = await getCurrentUser();
    const shipping_profiles = (await getShippings({
      where: {
        userId: decodedClaims.id,
      },
      include: {
        _count: true,
      },
    })) as Prisma.ShippingGetPayload<{
      include: {
        _count: true;
      };
    }>[];

    return shipping_profiles;
  } catch (error) {
    console.log(error);
  }
}

export async function getShippingProfile(id: string) {
  try {
    const decodedClaims = await getCurrentUser();
    const shipping_profile = await getShipping({
      where: {
        id,
        userId: decodedClaims.id,
      },
    });

    return shipping_profile;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteShippingProfile(id: string) {
  try {
    const decodedClaims = await getCurrentUser();
    return await deleteShipping({
      where: {
        id,
        userId: decodedClaims.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

/* 
  POLICY
*/

export async function createPolicyProfile(body: CreatePolicyInputType) {
  try {
    const decodedClaims = await getCurrentUser();
    const shipping_profile = await createPolicy({
      data: {
        ...body,
        User: {
          connect: {
            id: decodedClaims.id,
          },
        },
      },
    });

    return shipping_profile;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePolicyProfile(
  body: CreatePolicyInputType,
  id: string,
) {
  try {
    const decodedClaims = await getCurrentUser();
    const updated_policy_profile = await updatePolicy({
      where: {
        id,
        userId: decodedClaims.id,
      },
      data: {
        ...body,
      },
    });

    return updated_policy_profile;
  } catch (error) {
    console.log(error);
  }
}

export async function getPolicyProfiles() {
  try {
    const decodedClaims = await getCurrentUser();
    const prolicyProfiles = (await getPolicies({
      where: {
        userId: decodedClaims.id,
      },
      include: {
        _count: true,
      },
    })) as Prisma.PolicyGetPayload<{
      include: {
        _count: true;
      };
    }>[];

    return prolicyProfiles;
  } catch (error) {
    console.log(error);
  }
}

export async function getPolicyProfile(id: string) {
  try {
    const decodedClaims = await getCurrentUser();
    const prolicyProfile = await getPolicy({
      where: {
        userId: decodedClaims.id,
        id,
      },
    });

    return prolicyProfile;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePolicyProfile(id: string) {
  try {
    const decodedClaims = await getCurrentUser();
    return await deletePolicy({
      where: {
        id,
        userId: decodedClaims.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
