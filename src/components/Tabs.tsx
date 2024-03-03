"use client";
import * as T from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { useState } from "react";

interface ITabs {
  tabs: { name: string; value: string }[];
}
const Tabs = ({ tabs }: ITabs) => {
  const [selectedTab, setSetselectedTab] = useState(tabs[0].value);

  return (
    <T.Root
      onValueChange={(v) => setSetselectedTab(v)}
      defaultValue={tabs[0].value}
    >
      <T.List className="flex flex-wrap space-x-3" aria-label="tabs example">
        {tabs.map((tab) => (
          <T.Trigger
            className="relative rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 transition focus-visible:outline-2 data-[state='active']:text-skin-primary"
            key={tab.value}
            value={tab.value}
          >
            <span className="relative z-20 transition-colors duration-200">
              {tab.name}
            </span>
            {tab.value === selectedTab && (
              <motion.div
                layoutId="bubble"
                className="absolute inset-x-0 z-10 mt-2 h-px rounded-full bg-skin-primary"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </T.Trigger>
        ))}
      </T.List>
      <T.Content value="tab1">Tab one content</T.Content>
      <T.Content value="tab2">Tab two content</T.Content>
      <T.Content value="tab3">Tab three content</T.Content>
    </T.Root>
  );
};

export default Tabs;
