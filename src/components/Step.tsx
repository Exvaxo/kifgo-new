"use client";
import React, { forwardRef } from "react";
import { AnimatedCheckIcon } from "./AnimatedCheckIcon";
import { VariantProps, cva } from "class-variance-authority";
import { Button as Btn, ButtonProps } from "react-aria-components";
import { BasicButton, Button } from "./Button";
import { cn } from "@/utilities/cn";

const variants = {
  variant: {
    active: "border-2 border-gray-800 p-4 px-6 text-gray-800 shadow-lg",
    complete:
      "bg-gradient-to-br from-[#020912] to-[#020912] shadow-md text-white",
    deactive: "border border-gray-300 text-gray-400",
  },
};

const defaultStyles = `w-full disabled:bg-transparent`;

const StepVariants = cva(defaultStyles, {
  variants,
  defaultVariants: {
    variant: "deactive",
  },
});

interface IStep extends ButtonProps, VariantProps<typeof StepVariants> {
  onClick?: () => void;
  step: number;
  text: string;
}

const Step = forwardRef<HTMLButtonElement, IStep>(
  ({ step, text, variant, className, onClick }, ref) => {
    return (
      <BasicButton
        onClick={onClick}
        disabled={variant === "deactive"}
        variant={"ghost"}
        wrapperClass="w-full max-w-xs flex items-center justify-center"
        className={cn(StepVariants({ variant, className }))}
      >
        <div className="flex w-full items-center justify-between px-4 py-4">
          <p className="text-sm font-medium">{text}</p>
          <AnimatedCheckIcon step={step} status={variant!} />
        </div>
      </BasicButton>
    );
  },
);

Step.displayName = "Step";
export default Step;
