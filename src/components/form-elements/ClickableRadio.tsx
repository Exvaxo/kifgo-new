"use client";
import React, { ComponentProps, useState } from "react";
import { RadioGroup, RadioOptionProps } from "@headlessui/react";
import { cn } from "@/utilities/cn";

interface IClickableRadio extends ComponentProps<typeof RadioGroup> {
  children: React.ReactNode;
  label: string;
}

const ClickableRadio = ({ children, label, ...rest }: IClickableRadio) => {
  return (
    <RadioGroup {...rest}>
      <RadioGroup.Label
        className={"mb-2 block text-xs font-medium text-gray-800 sm:text-sm"}
      >
        {label}
      </RadioGroup.Label>
      {children}
    </RadioGroup>
  );
};

interface IRadioOption extends ComponentProps<typeof RadioGroup.Option> {
  Body: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > & {
      checked: boolean;
    }
  >;
  value: string;
}

export const RadioOption = ({ Body, value, className }: IRadioOption) => {
  return (
    <RadioGroup.Option
      className={cn(className, "cursor-pointer")}
      value={value}
    >
      {({ checked }) => <Body checked={checked} />}
    </RadioGroup.Option>
  );
};

export default ClickableRadio;
