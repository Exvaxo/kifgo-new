"use client";

import * as P from "@radix-ui/react-popover";
import { Button } from "./Button";
import Switch from "./form-elements/Switch";
import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { cn } from "@/utilities/cn";

interface IPoppover {
  children: React.ReactNode;
  Trigger: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >;
  align?: "center" | "start" | "end" | undefined;
}
const Poppover = ({ children, Trigger, align }: IPoppover) => {
  const [open, setOpen] = useState(false);
  return (
    <MotionConfig
      transition={{ type: "spring", bounce: 0.3, duration: open ? 1.2 : 0.8 }}
    >
      <P.Root modal open={open} onOpenChange={(v) => setOpen(v)}>
        <Trigger />

        <AnimatePresence initial={false}>
          <P.Portal forceMount>
            {open && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                className="relative z-[99999999999999999]"
                variants={{
                  closed: { opacity: 0 },
                  open: { opacity: 1 },
                }}
              >
                <P.Content
                  asChild
                  forceMount
                  align={align}
                  className="relative my-2 rounded-xl border bg-white p-3 shadow-sm"
                >
                  {children}
                </P.Content>
              </motion.div>
            )}
          </P.Portal>
        </AnimatePresence>
      </P.Root>
    </MotionConfig>
  );
};

interface ITrigger {
  children: React.ReactNode;
}
export const Trigger = ({ children }: ITrigger) => {
  return <P.Trigger asChild>{children}</P.Trigger>;
};

export default Poppover;
