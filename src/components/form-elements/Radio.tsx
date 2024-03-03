import { cn } from "@/utilities/cn";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  FormEvent,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { useController } from "react-hook-form";

const RadioContext = createContext({ selectedValue: "", error: "" });

const useRadioValue = () => useContext(RadioContext);

interface IRadio extends RadioGroup.RadioGroupItemProps {
  control: any;
  name: string;
  label?: string;
  error?: string;
  ErrorIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  TopRightContainer?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
}
const Radio = ({
  label,
  name,
  control,
  error = "",
  ErrorIcon,
  children,
  TopRightContainer,
  className,
  onChange,
  ...rest
}: IRadio) => {
  const id = useId();
  const { field } = useController({
    name,
    control,
  });

  const [selectedValue, setSelectedValue] = useState<string>(field.value);

  useEffect(() => {
    setSelectedValue(field.value);
  }, [field]);

  const errorText = useAnimationControls();

  useEffect(() => {
    if (error) {
      errorText.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 },
      });
    }
  }, [error]);

  return (
    <div className="relative flex flex-col items-start justify-start gap-2">
      <AnimatePresence>
        {label && (
          <motion.div className="mb-2 flex h-6 w-full items-center justify-between">
            <div className="flex items-center justify-start gap-2">
              {/* error icon */}
              {error && (
                <div className="pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={errorText}
                    exit={{ opacity: 0, scale: 0 }}
                    className="rounded-full"
                  >
                    <svg className="h-5 w-5 text-red-600" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                </div>
              )}

              {/* end of error icon */}
              {label && (
                <label
                  htmlFor={id}
                  className="block text-xs font-medium text-gray-800 sm:text-sm"
                >
                  {label}
                </label>
              )}
            </div>

            {TopRightContainer && <TopRightContainer />}
          </motion.div>
        )}
      </AnimatePresence>

      <RadioGroup.Root
        value={selectedValue}
        onValueChange={(e: string) => {
          setSelectedValue(e);
          if (onChange && typeof onChange === "function") {
            const val = e as unknown as FormEvent<HTMLButtonElement>;
            onChange(val);
          }
          field.onChange(e);
        }}
        className={cn(`flex gap-5`, className)}
      >
        <RadioContext.Provider value={{ selectedValue, error }}>
          {children}
        </RadioContext.Provider>
      </RadioGroup.Root>
      <motion.div
        initial={{ opacity: 0 }}
        animate={errorText}
        className="absolute inset-x-0 -bottom-6"
      >
        <p className="w-full text-left text-[0.65rem] text-red-600">{error}</p>
      </motion.div>
    </div>
  );
};

interface IRadioItem extends RadioGroup.RadioGroupItemProps {
  label?: string;
  Label?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
}
export const RadioItem = forwardRef(
  (
    { value, label, Label, ...rest }: IRadioItem,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const id = useId();

    const { selectedValue, error } = useRadioValue();

    return (
      <motion.div className="group relative inset-0 flex gap-2">
        <RadioGroup.Item
          className={`absolute flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition duration-300 group-hover:scale-110
          ${
            error
              ? "border-red-500 focus:ring-red-600"
              : "border-gray-300 focus:ring-skin-primary"
          }
          `}
          ref={ref}
          id={id}
          value={value}
          {...rest}
        >
          <AnimatePresence>
            {value === selectedValue && (
              <motion.div
                key={value}
                whileHover={"hover"}
                initial={"unchecked"}
                animate={"checked"}
                exit={"unchecked"}
                variants={{
                  checked: {
                    scale: [0.5, 1, 1.2, 1],
                    opacity: 1,
                    transition: { ease: "easeOut", duration: 0.3 },
                  },
                  unchecked: {
                    scale: 0,
                    opacity: 0,
                    transition: { ease: "easeIn", duration: 0.2 },
                  },
                }}
                className="h-3 w-3 rounded-full"
              >
                <RadioGroup.Indicator
                  forceMount
                  className="flex h-full w-full items-center justify-center rounded-full bg-skin-primary"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </RadioGroup.Item>
        <label
          className="relative cursor-pointer select-none pl-7 text-sm text-gray-800"
          htmlFor={id}
        >
          {label && label}

          {Label && <Label />}
        </label>
      </motion.div>
    );
  },
);

RadioItem.displayName = "RadioItem";
Radio.displayName = "Radio";
export default Radio;
