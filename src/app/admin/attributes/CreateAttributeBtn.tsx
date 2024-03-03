"use client";
import { ButtonVariants } from "@/components/Button";
import { cn } from "@/utilities/cn";
import Link from "next/link";
import React from "react";

const CreateAttributeBtn = () => {
  return (
    <Link
      href={"/admin/attributes/create"}
      className={cn(
        ButtonVariants({
          variant: "primary",
          className: "block",
        }),
      )}
    >
      Create Attribute
    </Link>
  );
};

export default CreateAttributeBtn;
