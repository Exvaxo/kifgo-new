import { cn } from "@/utilities/cn";
import { Sub } from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";

interface ILink {
  href: string;
  children: (isActive: boolean) => React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: ILink) => {
  const isActive = usePathname() === href;
  return (
    <Link
      data-is-active={isActive}
      className={cn(
        `rounded-x block w-full rounded-xl px-3 py-2 text-sm font-medium text-gray-600 outline-none ring-skin-primary focus:outline-none focus-visible:ring-2 data-[is-active=true]:text-skin-primary ${
          isActive && "bg-skin-primary-light"
        }
    `,
        className,
      )}
      href={href}
    >
      {children(isActive)}
    </Link>
  );
};
export default NavLink;
