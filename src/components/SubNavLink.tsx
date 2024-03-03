import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ISubNavLink {
  href: string;
  children: (isActive: boolean) => React.ReactNode;
  className?: string;
}
const SubNavLink = ({ href, children, className }: ISubNavLink) => {
  const isActive = usePathname() === href;
  return (
    <div className="group flex items-center justify-start gap-3">
      <div
        className={`aspect-square w-2 rounded-full ${
          isActive
            ? "bg-skin-primary"
            : "bg-transparent group-hover:bg-skin-primary"
        } `}
      ></div>
      <Link
        className={`text-xs font-medium text-gray-600 ${
          isActive
            ? "text-skin-primary"
            : "text-gray-600 hover:text-skin-primary"
        } `}
        href={href}
      >
        {children(isActive)}
      </Link>
    </div>
  );
};

export default SubNavLink;
