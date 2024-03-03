import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "../utilities/cn";
import { ComponentProps } from "react";

interface IAvatar extends ComponentProps<"img"> {
  Fallback: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
}
const Avatar = ({ src, alt, Fallback, className }: IAvatar) => {
  return (
    <RadixAvatar.Root className="flex-shrink-0">
      <RadixAvatar.Image
        className={`${cn(
          `aspect-square h-full w-full rounded-full border object-cover`,
          className,
        )} `}
        src={src}
        alt={alt || "image"}
      />
      <RadixAvatar.Fallback className="AvatarFallback" delayMs={600}>
        <Fallback />
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

interface IFallback extends ComponentProps<"div"> {
  children: React.ReactNode;
}
const Fallback = ({ children, className }: IFallback) => {
  return (
    <div
      className={`${cn(
        `flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 font-medium uppercase tracking-wider`,
        className,
      )}`}
    >
      {children}
    </div>
  );
};

export { Avatar, Fallback };
