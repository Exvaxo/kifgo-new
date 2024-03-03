"use server";

import { getCurrentUser } from "@/utilities/getCurrentUser";
import prisma from "../../../../lib/prisma.config";
import { Prisma } from "@prisma/client";
import {
  deleteProductAttribute,
  deleteProductDb,
  deleteProductDetails,
  deleteProductSettings,
  deleteProductShipping,
  getProduct,
  updateProduct,
} from "@/app/api/product/product.service";
import { bucket } from "@/lib/firebaseAdmin.config";
import { revalidatePath } from "next/cache";

type Options = {
  page: number;
  size: number;
};

export async function getProducts({ page, size }: Options): Promise<
  | Prisma.ProductGetPayload<{
      include: {
        details: true;
        variation: true;
      };
    }>[]
  | undefined
> {
  try {
    const decodedClaims = await getCurrentUser();
    const products = await prisma.product.findMany({
      where: {
        Shop: {
          userId: decodedClaims.id,
        },
      },
      include: {
        details: true,
        variation: true,
      },
      skip: (page - 1) * size,
      take: size,
    });

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: string) {
  try {
    const decodedClaims = await getCurrentUser();

    const product = await getProduct({
      where: {
        id,
        Shop: {
          userId: decodedClaims.id,
        },
      },
    });

    if (product) {
      //delete from firebase
      const refs: string[] = [];
      refs.push(
        ...product.about.images
          .filter((img) => img.highRes.ref)
          .map((img) => img.highRes.ref!),
      );
      refs.push(
        ...product.about.images
          .filter((img) => img.lowRes.ref)
          .map((img) => img.lowRes.ref!),
      );
      if (product.about.video) {
        refs.push(product.about.video?.ref!);
      }
      refs.push(product.about.thumbnail.highRes.ref!);
      refs.push(product.about.thumbnail.lowRes.ref!);

      for (const ref of refs) {
        await bucket.file(ref).delete();
      }

      await updateProduct({
        where: {
          id,
          Shop: {
            userId: decodedClaims.id,
          },
        },
        data: {
          variation: {
            deleteMany: {
              productId: id,
            },
          },
        },
      });

      await deleteProductDb({
        where: {
          id,
          Shop: {
            userId: decodedClaims.id,
          },
        },
      });

      await deleteProductAttribute({
        where: {
          productDetailsId: product?.productDetailsId,
        },
      });

      await deleteProductShipping({
        where: {
          id: product.productShippingId,
        },
      });

      await deleteProductDetails({
        where: {
          id: product?.productDetailsId,
        },
      });

      await deleteProductSettings({
        where: {
          id: product?.productSettingsId,
        },
      });
    }
    revalidatePath("/shop/dashboard/listing", "page");
  } catch (error) {
    console.log(error);
  }
}
