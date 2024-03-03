"use server";
import { getAttributes } from "@/app/api/attribute/attribute.service";
import prisma from "../../../lib/prisma.config";
import { getUnits } from "@/app/api/unit/unit.service";
import { DisplayAs, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateAttributeName(id: string, name: string) {
  await prisma.attribute.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  revalidatePath("/admin/attributes");

  return { message: "updated" };
}

export async function updateAttributeDescription(
  id: string,
  description?: string,
) {
  await prisma.attribute.update({
    where: {
      id,
    },
    data: {
      description,
    },
  });

  revalidatePath("/admin/attributes");

  return { message: "updated" };
}

export async function updateAttributeDisplayAs(
  id: string,
  displayAs: DisplayAs,
) {
  await prisma.attribute.update({
    where: {
      id,
    },
    data: {
      displayAs,
    },
  });

  revalidatePath("/admin/attributes");

  return { message: "updated" };
}

export async function updateAttributeOption(
  name: string,
  attributeId: string,
  id?: string,
) {
  if (id) {
    await prisma.attributeOptions.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  } else {
    await prisma.attributeOptions.create({
      data: {
        name,
        attribute: {
          connect: {
            id: attributeId,
          },
        },
      },
    });
  }
  revalidatePath("/admin/attributes");
}

export async function updateUnits(id: string, unitIds: string[]) {
  await prisma.attribute.update({
    where: {
      id,
    },
    data: {
      unitIds,
    },
  });
  revalidatePath("/admin/attributes");
}

export async function fetchAttributes() {
  return (await getAttributes({
    include: {
      Units: {
        select: {
          id: true,
          name: true,
        },
      },
      options: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: true,
    },
  })) as unknown as Prisma.AttributeGetPayload<{
    include: {
      Units: {
        select: {
          id: true;
          name: true;
        };
      };
      options: {
        select: {
          id: true;
          name: true;
        };
      };
      _count: true;
    };
  }>[];
}

export async function fetchUnits() {
  return await getUnits({});
}

export async function deteleAttributeOption(id: string) {
  await prisma.attributeOptions.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/attributes");
}

export async function deteleAttribute(id: string) {
  await prisma.attribute.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/attributes");
}
