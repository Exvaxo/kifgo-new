import { cn } from "@/utilities/cn";
import React, { ComponentProps } from "react";

interface IBreadCrumb extends ComponentProps<"div"> {
  start?: boolean;
  end?: boolean;
  children: React.ReactNode;
}

const BreadCrumb = ({
  children,
  className,
  start = false,
  end = false,
}: IBreadCrumb) => {
  return (
    <div
      className={cn(
        `relative rounded-md bg-white px-3 py-1 text-xs font-medium text-skin-primary before:absolute ${
          start && "before:hidden"
        } ${
          end && "after:hidden"
        } before:inset-y-0 before:left-0 before:-ml-1 before:w-3 before:-skew-x-[15deg] before:rounded-l-md before:bg-inherit after:absolute after:inset-y-0 after:right-0 after:-mr-1 after:w-3 after:-skew-x-[15deg] after:rounded-r-md after:bg-inherit`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BreadCrumb;
