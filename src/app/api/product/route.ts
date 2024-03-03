import { NextResponse, type NextRequest } from "next/server";
import privateRoute from "../privateRoute";
import { Prisma } from "@prisma/client";
import { createProduct, getProduct } from "./product.service";

/* 
    CREATE product
*/
export async function POST(request: NextRequest, response: NextResponse) {
  return await privateRoute(async (user) => {
    try {
      const product = await createProduct({
        data: {
          about: {
            title: "ju",
            description: "dj",
            thumbnail: {
              highRes: {
                ref: "s",
                url: "d",
              },
              lowRes: {
                ref: "s",
                url: "d",
              },
            },
            images: [
              {
                highRes: {
                  ref: "s",
                  url: "d",
                },
                lowRes: {
                  ref: "s",
                  url: "d",
                },
              },
              {
                highRes: {
                  ref: "s",
                  url: "d",
                },
                lowRes: {
                  ref: "s",
                  url: "d",
                },
              },
              {
                highRes: {
                  ref: "s",
                  url: "d",
                },
                lowRes: {
                  ref: "s",
                  url: "d",
                },
              },
            ],
            personalization: {
              isPersonalization: false,
              prompt: "",
              isOptional: false,
            },
          },
          pricing: {
            srilanka: "200",
            quantity: "3",
          },
          details: {
            create: {
              type: "",
              whatIsIt: "",
              whenDidYouMakeIt: "",
              whoMadeIt: "",
              attributes: {
                createMany: {
                  data: [
                    {
                      attributeId: "",
                      unitId: "",
                      value: "",
                    },
                  ],
                },
              },
              category: {
                connect: {
                  id: "",
                },
              },
            },
          },
          variation: {
            createMany: {
              data: [
                {
                  variationId: "d",
                  variantSettings: {
                    price: true,
                    quantity: true,
                    sku: false,
                  },
                  combination: [
                    {
                      value: "2",
                      variant: "s",
                      variantId: "s",
                      isEditable: true,
                      unit: null,
                    },
                    {
                      value: "2",
                      variant: "s",
                      variantId: "s",
                      isEditable: true,
                      unit: null,
                    },
                  ],
                  isGroup: false,
                  visibility: true,
                },
              ],
            },
          },
          policy: {
            connect: {
              id: "",
            },
          },
          settings: {
            connect: {
              id: "",
            },
          },
          shipping: {
            connect: {
              id: "",
            },
          },
        },
      });
      return NextResponse.json({ product });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  });
}

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const product = (await getProduct({
      where: {
        id: "655392200dd6de8ca53377c6",
      },
      include: {
        variation: true,
      },
    })) as Prisma.ProductGetPayload<{ include: { variation: true } }> | null;

    const combinationMap: { [x: string]: string[] } = {};

    product?.variation.map((variant) => {
      variant.combination.map((combination) => {
        if (combination.variant in combinationMap) {
          combinationMap[combination.variant].push(combination.value);
        } else {
          combinationMap[combination.variant] = [combination.value];
        }
      });
    });

    const availableVariations = Object.entries(combinationMap).map(
      ([key, val]) => {
        return {
          variant: key,
          options: val,
        };
      },
    );

    return NextResponse.json({ product: { ...product, availableVariations } });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
