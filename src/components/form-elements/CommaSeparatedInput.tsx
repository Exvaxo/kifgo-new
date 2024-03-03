import { Fragment, forwardRef, useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  ControllerRenderProps,
  FieldValues,
  useController,
} from "react-hook-form";
import isValid from "../../utilities/isValid";
import { BasicButton, Button } from "../Button";

interface ICommaSeparatedInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  error?: string;
  label?: string;
  onChangeHandler?: (values: string[]) => void;
  ErrorIcon?: React.FC<React.SVGProps<HTMLDivElement>>;
  TopRightCont?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  RightContainer?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  SubLabel?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  BeforeLabel?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  AfterLabel?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  control?: any;
}

const CommaSeparatedInput = forwardRef(
  (
    {
      name,
      error,
      label,
      SubLabel,
      type = "text",
      ErrorIcon,
      TopRightCont,
      RightContainer,
      BeforeLabel,
      AfterLabel,
      className,
      control,
      onChangeHandler,
      ...rest
    }: ICommaSeparatedInput,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    let field: ControllerRenderProps<FieldValues, string> | null = null;

    const controller = useController({
      name,
      control,
    });

    field = controller.field;

    const [value, setValue] = useState<string>("");
    const [chips, setChips] = useState<string[]>(
      isValid(field?.value) && field ? field.value : []
    );

    const id = useId();

    const inputAnimation = useAnimationControls();
    const errorText = useAnimationControls();

    useEffect(() => {
      if (error) {
        inputAnimation.start({
          x: [-2, 0, 2, 0, -2],
          transition: { repeat: 5, duration: 0.15 },
        });

        errorText.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5 },
        });
      }
    }, [error]);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      //@ts-ignore
      if (e.nativeEvent.data !== ",") {
        //@ts-ignore
        setValue(() => e.target.value);
      } else {
        setChips((pv) =>
          //@ts-ignore
          [...pv, e.target.value.split(",")[0]]
        );
        setValue("");
      }
    };

    const deleteSpecificChip = (index: number) => {
      setChips((pv) => pv.filter((_, idx) => idx !== index));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (value.length > 0) return;
        e.preventDefault();
        setChips((pv) => {
          return pv.slice(0, pv.length - 1);
        });
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (isValid(value)) {
          setChips((pv) =>
            //@ts-ignore
            [...pv, e.target.value.split(",")[0]]
          );
          setValue("");
        }
      }
    };

    const handleBlur = () => {
      if (isValid(value)) {
        setChips((pv) =>
          //@ts-ignore
          [...pv, value.split(",")[0]]
        );
        setValue("");
      }
    };

    useEffect(() => {
      field?.onChange(chips);
      if (onChangeHandler && typeof onChangeHandler === "function") {
        onChangeHandler(chips);
      }
    }, [chips]);

    return (
      <div className="relative w-full">
        <AnimatePresence>
          {label && (
            <>
              <motion.div className="flex h-6 items-center justify-start gap-2">
                {/* error icon */}
                {error && (
                  <div className="pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={errorText}
                      exit={{ opacity: 0, scale: 0 }}
                      className=""
                    >
                      {ErrorIcon ? (
                        <ErrorIcon />
                      ) : (
                        <div className="rounded-full bg-red-100 p-1">
                          <svg
                            className="h-4 w-4 text-red-600"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </motion.div>
                  </div>
                )}
                {/* end of error icon */}

                {/* beforeLabel */}
                {BeforeLabel && (
                  <div className="pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className=""
                    >
                      <BeforeLabel />
                    </motion.div>
                  </div>
                )}
                {/* end of beforeLabel */}

                {label && (
                  <motion.div className="">
                    <label
                      htmlFor={id}
                      className="block text-xs font-medium text-gray-800 sm:text-sm"
                    >
                      {label}
                    </label>
                  </motion.div>
                )}

                {/* AfterLabel */}
                {AfterLabel && (
                  <div className="pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className=""
                    >
                      <AfterLabel />
                    </motion.div>
                  </div>
                )}
                {/* end of AfterLabel */}
              </motion.div>

              {SubLabel && <SubLabel />}
            </>
          )}
        </AnimatePresence>

        <motion.div
          animate={inputAnimation}
          initial={{ x: 0 }}
          className="relative"
        >
          <div
            className={`${
              isValid(chips) && chips.length > 0 ? "p-1.5" : "p-3"
            } ${
              label && "mt-2"
            } flex w-full flex-wrap items-center justify-start gap-5 rounded-xl border transition duration-300 focus-within:outline-none focus-within:ring-2 
      ${
        error
          ? "border-red-500 focus-within:border-transparent focus-within:ring-red-600"
          : "border-gray-300 focus-within:border-transparent focus-within:ring-blue-600"
      }
      `}
          >
            {/* chips */}
            {isValid(chips) && chips.length > 0 && (
              <div className="flex flex-wrap items-center justify-start gap-3">
                {chips.map((chip, idx) => (
                  <Fragment key={idx}>
                    {chip.length > 0 && (
                      <div className="flex items-center justify-center rounded-md bg-skin-primary/10 p-2 text-sm leading-none text-skin-primary">
                        {chip}
                        <BasicButton
                          wrapperClass="flex items-center justify-center"
                          variant={"ghost"}
                          className={
                            "ml-2 rounded-sm bg-transparent p-0 text-skin-primary hover:bg-transparent hover:text-skin-primary/90 data-[pressed]:bg-transparent data-[pressed]:text-skin-primary/90 md:p-0"
                          }
                          onClick={() => deleteSpecificChip(idx)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M6.871 19.499c.93.501 2.044.501 4.271.501h2.637c3.875 0 5.813 0 7.017-1.172C22 17.657 22 15.771 22 12c0-3.771 0-5.657-1.204-6.828C19.592 4 17.654 4 13.78 4h-2.637c-2.227 0-3.341 0-4.27.501c-.93.502-1.52 1.42-2.701 3.259L3.49 8.82C2.497 10.366 2 11.14 2 12c0 .86.497 1.634 1.49 3.18l.68 1.06c1.181 1.838 1.771 2.757 2.701 3.259Zm4.16-10.53A.75.75 0 0 0 9.97 10.03L11.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L13 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L14.06 12l1.97-1.97a.75.75 0 0 0-1.06-1.06L13 10.94l-1.97-1.97Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </BasicButton>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
            {/*end of chips */}

            {/* input */}
            <input
              ref={ref}
              type={type}
              className="flex-1 border-none bg-transparent text-sm text-gray-800 outline-none focus:outline-none"
              onInput={handleInput}
              value={value}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              {...rest}
            />
            {/* end of input */}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={errorText}
          className="absolute inset-x-0 -bottom-5"
        >
          <p className="w-full text-left text-[0.65rem] text-red-600">
            {error}
          </p>
        </motion.div>
      </div>
    );
  }
);

CommaSeparatedInput.displayName = "CommaSeparatedInput";
export default CommaSeparatedInput;
