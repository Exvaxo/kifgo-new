import * as Collapsible from "@radix-ui/react-collapsible";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface ICollapsible {
  defaultState?: boolean;
  children: React.ReactNode;
  title?: string | undefined | null;
}

const CollapsibleContainer = ({
  children,
  defaultState = true,
  title,
}: ICollapsible) => {
  const [open, setOpen] = useState(defaultState);
  const controls = useAnimationControls();

  useEffect(() => {
    if (open) {
      controls.start("open");
    }
  }, [open, controls]);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="my-3 w-full flex-1"
    >
      <Collapsible.Trigger asChild>
        <button className="flex items-center justify-start gap-2">
          <div className="flex flex-shrink-0 items-center">
            <span className="text-xs font-medium">
              {title
                ? (open ? "collapse" : "expand") + " all of " + title
                : open
                ? "click to collapse"
                : "click to expand"}
            </span>
          </div>

          <div className="aspect-square rounded-full bg-blue-100 p-1 text-blue-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3 w-3 text-gray-800 ${
                open ? "rotate-0" : "rotate-180"
              } transition-all duration-150`}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12.37 8.165l6.43 6.63c.401.414.158 1.205-.37 1.205H5.57c-.528 0-.771-.79-.37-1.205l6.43-6.63a.499.499 0 0 1 .74 0Z"
              />
            </svg>
          </div>
        </button>
      </Collapsible.Trigger>

      <AnimatePresence>
        {open && (
          <Collapsible.Content forceMount className="pt-3">
            <motion.div
              initial={"initial"}
              animate={controls}
              exit={"close"}
              variants={{
                initial: {
                  opacity: 0,
                },
                open: {
                  opacity: 1,
                  transition: { ease: "easeOut", duration: 0.2 },
                },
                close: {
                  opacity: 0,
                  transition: { ease: "easeOut", duration: 0.3 },
                },
              }}
            >
              {children}
            </motion.div>
          </Collapsible.Content>
        )}
      </AnimatePresence>
    </Collapsible.Root>
  );
};

export default CollapsibleContainer;
