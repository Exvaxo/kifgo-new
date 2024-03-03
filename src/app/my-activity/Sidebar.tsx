"use client";
import { Avatar } from "@/components/Avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const subLinks = [
    {
      name: "Summary",
      value: "summary",
    },
    {
      name: "Recently Viewed",
      value: "recently-viewed",
    },
    {
      name: "Offers",
      value: "offers",
    },
    {
      name: "Watchlist",
      value: "watchlist",
    },
    {
      name: "Saved Searches",
      value: "saved-searches",
    },
    {
      name: "Saved Sellers",
      value: "saved-sellers",
    },
  ];

  const pathname = usePathname();
  return (
    <>
      <div className="space-y-3">
        {subLinks.map((link) => (
          <Link
            key={link.value}
            href={link.value}
            className={`block text-sm font-semibold ${
              pathname.split("/")[2] === link.value
                ? "text-skin-primary"
                : "text-gray-800"
            } `}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
