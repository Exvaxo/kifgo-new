"use client";
import { cn } from "@/utilities/cn";
import * as Cbx from "@radix-ui/react-checkbox";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ComponentProps, forwardRef, useEffect, useId } from "react";

interface ICheckbox extends Cbx.CheckboxProps {
  label?: string;
  onChange?: (e: any) => void;
  labelClass?: string;
}

const Checkbox = forwardRef(
  (
    { name, value = "", onChange, label, labelClass, ...rest }: ICheckbox,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const id = useId();
    const controls = useAnimationControls();

    useEffect(() => {
      if (value) {
        controls.start("checked");
      }
    }, [value]);

    return (
      <div className="group flex items-center justify-start">
        <Cbx.Root
          ref={ref}
          name={name}
          id={id}
          value={value}
          onCheckedChange={(e) => {
            onChange && onChange(value ? false : true);
          }}
          className={`flex aspect-square h-5 w-5 items-center justify-center rounded-md border-2 border-gray-300 p-1 transition duration-300 focus:outline-none focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-skin-primary group-hover:scale-110`}
          {...rest}
        >
          <AnimatePresence initial={false}>
            {value && (
              <motion.div
                initial={"unchecked"}
                animate={controls}
                exit={"unchecked"}
                variants={{
                  checked: {
                    opacity: 1,
                    scale: [0.9, 1, 1.3, 1],
                    backgroundColor: "#cd0a5d",
                    transition: { ease: "easeOut", duration: 0.2 },
                  },
                  unchecked: {
                    opacity: 0,
                    backgroundColor: "#ffffff",
                    transition: { ease: "easeIn", duration: 0.1 },
                  },
                }}
                className="bg-primaryColor h-5 w-5 rounded-md"
              >
                <Cbx.Indicator forceMount>
                  <span>
                    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
                      <motion.path
                        initial={"unchecked"}
                        animate={controls}
                        variants={{
                          checked: {
                            pathLength: 1,
                            transition: { ease: "easeOut", duration: 0.6 },
                          },
                          unchecked: {
                            pathLength: 0,
                            transition: { ease: "easeIn", duration: 0.1 },
                          },
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                </Cbx.Indicator>
              </motion.div>
            )}
          </AnimatePresence>
        </Cbx.Root>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "cursor-pointer select-none pl-2 text-sm text-gray-800",
              labelClass,
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
