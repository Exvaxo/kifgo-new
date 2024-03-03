"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

export type Tab = {
  name: string;
  value: string;
};

interface ITabs {
  tabs: Tab[];
  onClick?: (tab: string) => void;
}
const Tabs = ({ tabs, onClick }: ITabs) => {
  const pathname = usePathname();
  const activeTab = useMemo(() => pathname.split("/")[1], [pathname]);
  const router = useRouter();

  return (
    <div className="flex space-x-5 md:space-x-10">
      {tabs.map((tab) => (
        <Link
          href={`/${tab.value}`}
          key={tab.value}
          className={`${
            activeTab === tab.value
              ? "text-skin-primary"
              : "text-gray-700 hover:text-gray-700/60"
          } relative rounded-full text-[0.7rem] font-medium transition focus-visible:outline-2 md:text-sm`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span className="relative z-20 transition-colors duration-200">
            {tab.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
