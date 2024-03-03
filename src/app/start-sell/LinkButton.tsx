"use client";
import { ButtonVariants } from "@/components/Button";
import { cn } from "@/utilities/cn";
import Link from "next/link";
import React from "react";

const LinkButton = () => {
  return (
    <Link
      href={"/shop/onboarding/shop-name"}
      className={cn(
        ButtonVariants({
          variant: "unstyled",
          className: "block w-max bg-white",
        }),
      )}
    >
      Open shop
    </Link>
  );
};

export default LinkButton;
