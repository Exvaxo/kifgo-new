"use client";
import { BasicButton } from "@/components/Button";
import Checkbox from "@/components/form-elements/Checkbox";
import Input from "@/components/form-elements/Input";
import { Option, OptionLabel, Select } from "@/components/form-elements/Select";
import { cn } from "@/utilities/cn";
import isValid from "@/utilities/isValid";
import uppercaseFirstLetter from "@/utilities/uppercaseFirstLetter";
import { SelectGroup } from "@radix-ui/react-select";
import { nanoid } from "nanoid";
import {
  ComponentProps,
  Fragment,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { AvailableVariant, VariantSettings } from "./Variation";

export type VariantOption = {
  id: string;
  value: string;
  unit?: string;
  isEditable: boolean;
  variant: string;
  variantId: string;
};
interface IVariantSelect {
  label: string;
  variants: AvailableVariant[] | undefined | null;
  onVariantSelect: (variant: AvailableVariant | undefined) => void;
  onVariantSettingsChange: (key: keyof VariantSettings, value: boolean) => void;
  settings: VariantSettings;
  onVariantSelectedOptionsChange: (selectedOptions: VariantOption[]) => void;
  selectedVariant: AvailableVariant | undefined;
  selectedVariationOptions: VariantOption[];
  isLoading?: boolean;
}

const VariationSelect = ({
  label,
  variants,
  onVariantSelect,
  onVariantSettingsChange,
  isLoading = false,
  settings,
  onVariantSelectedOptionsChange,
  selectedVariant,
  selectedVariationOptions,
}: IVariantSelect) => {
  const [internalSelectedVariant, setInternalSelectedVariant] = useState<
    undefined | AvailableVariant
  >(selectedVariant);

  const internalVariants = useMemo(() => {
    return variants
      ? internalSelectedVariant
        ? [...variants, internalSelectedVariant]
        : variants
      : [];
  }, [variants]);

  const [
    selectedInternalVariationOptions,
    setSelectedInternalVariationOptions,
  ] = useState<VariantOption[]>(selectedVariationOptions);

  const defaultVariationOptions = useMemo(
    () => internalSelectedVariant?.options,
    [internalSelectedVariant],
  );

  const loadOptions = useMemo(() => {
    if (defaultVariationOptions) {
      return defaultVariationOptions.filter(
        (opt) =>
          !selectedInternalVariationOptions
            .map((o) => o.value.toLowerCase())
            .includes(opt.value.toLowerCase()),
      );
    }
  }, [defaultVariationOptions, selectedInternalVariationOptions]);

  const [selectDisplayValue, setSelectDisplayValue] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    onVariantSelectedOptionsChange(selectedInternalVariationOptions);
  }, [selectedInternalVariationOptions]);

  const customInputId = useId();

  return (
    <div className="">
      {!internalSelectedVariant && (
        <Select
          isLoading={isLoading}
          value={undefined}
          onValueChange={(id) => {
            const selected = variants && variants.find((v) => v.id === id);
            if (selected) {
              setInternalSelectedVariant(() => selected);
              onVariantSelect(selected);
            }
          }}
          label={label}
          placeholder="Select a variation"
        >
          {internalVariants.map((variant) => (
            <Option key={variant.id} value={variant.id}>
              {variant.name}
            </Option>
          ))}
        </Select>
      )}

      {internalSelectedVariant && (
        <div className="grid w-full grid-cols-1 items-start gap-10 md:grid-cols-2">
          <div className="">
            <div className="flex items-center justify-start gap-5">
              <h3 className="text-base font-medium text-gray-800">
                {internalSelectedVariant.name}
              </h3>

              <BasicButton
                onClick={() => {
                  setInternalSelectedVariant(undefined);
                  onVariantSelect(undefined);
                }}
                className={"text-red-600 hover:text-red-500 hover:underline"}
                variant={"ghost"}
              >
                Delete
              </BasicButton>
            </div>

            <div className="mt-5 space-y-4">
              <Checkbox
                name={`${internalSelectedVariant.name.toLowerCase()}_price`}
                value={settings.price ? "price" : ""}
                onChange={(value) => {
                  onVariantSettingsChange("price", value);
                }}
                label={`Prices vary for each ${internalSelectedVariant.name.toLowerCase()}`}
              />
              <Checkbox
                name={`${internalSelectedVariant.name.toLowerCase()}_quantity`}
                value={settings.quantity ? "quantity" : ""}
                onChange={(value) => {
                  onVariantSettingsChange("quantity", value);
                }}
                label={`Quantities vary for each ${internalSelectedVariant.name.toLowerCase()}`}
              />
              <Checkbox
                value={settings.sku ? "sku" : ""}
                onChange={(value) => {
                  onVariantSettingsChange("sku", value);
                }}
                label={`SKUs vary for each ${internalSelectedVariant.name.toLowerCase()}`}
              />
            </div>
          </div>

          <div>
            {internalSelectedVariant.displayAs === "SELECT" && (
              <Select
                label={internalSelectedVariant.name}
                placeholder="Select an option"
                value={selectDisplayValue}
                onValueChange={(val) => {
                  const newOption = {
                    id: nanoid(10),
                    value: val.toLowerCase(),
                    unit: internalSelectedVariant?.units[0]
                      ? internalSelectedVariant?.units[0]?.name
                      : "",
                    isEditable: false,
                    variant: internalSelectedVariant.name.toLowerCase(),
                    variantId: internalSelectedVariant.id,
                  };
                  if (val === "__ALL__") {
                    setSelectDisplayValue("");
                    setSelectedInternalVariationOptions((pv) => {
                      return [
                        ...pv,
                        ...(loadOptions?.map((option) => ({
                          id: nanoid(10),
                          value: option.value.toLowerCase(),
                          unit: newOption.unit,
                          isEditable: false,
                          variant: internalSelectedVariant.name.toLowerCase(),
                          variantId: internalSelectedVariant.id,
                        })) || []),
                      ];
                    });
                  } else if (val === "__CUSTOM__") {
                    setSelectDisplayValue("__CUSTOM__");
                    setTimeout(() => {
                      if (window) {
                        document?.getElementById(customInputId)?.focus();
                      }
                    }, 100);
                  } else {
                    setSelectedInternalVariationOptions((pv) => {
                      if (pv.length <= 0) {
                        return [newOption];
                      } else {
                        if (
                          !pv
                            .map((v) => v.value.toLowerCase())
                            .includes(val.toLowerCase())
                        ) {
                          return [...pv, newOption];
                        } else {
                          return pv;
                        }
                      }
                    });
                    setSelectDisplayValue("");
                  }
                }}
              >
                <SelectGroup>
                  {loadOptions && loadOptions.length > 0 && (
                    <>
                      <OptionLabel>
                        {internalSelectedVariant.name} options
                      </OptionLabel>
                      {loadOptions?.map((option) => (
                        <Option level={2} key={option.id} value={option.value}>
                          {option.value}
                        </Option>
                      ))}
                    </>
                  )}

                  {loadOptions && loadOptions?.length > 1 && (
                    <>
                      <OptionLabel>Add all options above</OptionLabel>
                      <Option level={2} value={"__ALL__"}>
                        Add all options
                      </Option>
                    </>
                  )}

                  <OptionLabel>None of these work?</OptionLabel>
                  <Option level={2} value={"__CUSTOM__"}>
                    Create a new option
                  </Option>
                </SelectGroup>
              </Select>
            )}

            {selectDisplayValue === "__CUSTOM__" && (
              <CustomInput
                id={customInputId}
                unit={
                  internalSelectedVariant?.units[0]
                    ? internalSelectedVariant?.units[0]?.name
                    : ""
                }
                onSave={(value) => {
                  setSelectedInternalVariationOptions((pv) => {
                    if (
                      !pv
                        .map((v) => v.value.toLowerCase())
                        .includes(value.toLowerCase())
                    ) {
                      return [
                        ...pv,
                        {
                          id: nanoid(10),
                          value: value.toLowerCase(),
                          unit: internalSelectedVariant?.units[0]
                            ? internalSelectedVariant?.units[0]?.name
                            : "",
                          isEditable: true,
                          variant: internalSelectedVariant.name.toLowerCase(),
                          variantId: internalSelectedVariant.id,
                        },
                      ];
                    } else {
                      return pv;
                    }
                  });
                }}
                className="mb-10 mt-7"
              />
            )}

            {internalSelectedVariant.displayAs === "INPUT" && (
              <InputOption
                units={internalSelectedVariant?.units}
                onSave={(payload) => {
                  setSelectedInternalVariationOptions((pv) => {
                    if (
                      !pv
                        .map(
                          (v) => v.value.toLowerCase() + v.unit?.toLowerCase(),
                        )
                        .includes(
                          payload.value.toLowerCase() +
                            payload.unit.toLowerCase(),
                        )
                    ) {
                      return [
                        ...pv,
                        {
                          id: nanoid(10),
                          value: payload.value.toLowerCase(),
                          unit: payload.unit.toLowerCase(),
                          isEditable: true,
                          variant: internalSelectedVariant.name.toLowerCase(),
                          variantId: internalSelectedVariant.id,
                        },
                      ];
                    } else {
                      return pv;
                    }
                  });
                }}
              />
            )}

            <div className="mt-5 flex w-full flex-wrap justify-end gap-5">
              {selectedInternalVariationOptions.map((option) => (
                <Fragment key={option.id}>
                  {option.isEditable ? (
                    <ChipInput
                      value={
                        option.unit
                          ? { value: option.value, unit: option.unit }
                          : option.value
                      }
                      onClose={() => {
                        setSelectedInternalVariationOptions((pv) =>
                          pv.filter((v) => v.id !== option.id),
                        );
                      }}
                      onSave={(value) => {
                        setSelectedInternalVariationOptions((pv) => {
                          if (
                            !pv
                              .map((v) => v.value.toLowerCase())
                              .includes(value.toLowerCase())
                          ) {
                            return pv.map((v) => {
                              if (v.id === option.id) {
                                v.value = value;
                              }
                              return v;
                            });
                          } else {
                            return pv.filter((pv) => pv.id !== option.id);
                          }
                        });
                      }}
                    />
                  ) : (
                    <ChipValue
                      value={
                        option.unit
                          ? { value: option.value, unit: option.unit }
                          : option.value
                      }
                      onClose={() => {
                        setSelectedInternalVariationOptions((pv) =>
                          pv.filter((v) => v.id !== option.id),
                        );
                      }}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface IChipValue {
  value: string | { value: string; unit: string };
  onClose: () => void;
}

const ChipValue = ({ onClose, value }: IChipValue) => {
  return (
    <div className="flex items-center justify-start">
      <div className="rounded-lg rounded-r-none bg-gray-100 px-3 py-2 text-sm text-gray-800">
        {typeof value === "string"
          ? uppercaseFirstLetter(value)
          : uppercaseFirstLetter(value.value)}

        {typeof value === "object" && value.unit && (
          <span className="mx-3 text-xs italic text-gray-600">
            {value.unit}
          </span>
        )}
      </div>
      <BasicButton
        onClick={onClose}
        wrapperClass="flex items-center justify-center"
        className={
          "rounded-lg rounded-l-none bg-gray-100 hover:bg-gray-100 hover:text-gray-700 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-700 md:py-2 md:pr-3"
        }
        variant={"ghost"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </BasicButton>
    </div>
  );
};

interface IChipInput {
  onClose: () => void;
  onSave: (value: string) => void;
  value: string | { value: string; unit: string };
}
const ChipInput = ({ onClose, onSave, value }: IChipInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [internalValue, setInternalValue] = useState(
    typeof value === "string" ? value : value.value,
  );
  const handleSave = () => {
    if (inputRef && inputRef.current) {
      if (inputRef.current?.outerText?.toLowerCase().length > 0) {
        if (
          internalValue.toLowerCase() !==
          inputRef.current?.outerText?.toLowerCase()
        ) {
          onSave(inputRef.current?.outerText?.toLowerCase());
        }
        setTimeout(() => {
          setIsDisabled(true);
        }, 100);
      } else {
        onClose();
      }
    }
  };
  return (
    <div className="rounded-r-0 flex max-w-full items-center justify-between rounded-lg bg-gray-100">
      <div
        role="textbox"
        contentEditable={!isDisabled}
        suppressContentEditableWarning={true}
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            e.preventDefault();
            handleSave();
          }
        }}
        onBlur={() => {
          handleSave();
        }}
        className="min-w-[2rem] max-w-full overflow-x-auto whitespace-nowrap border-0 border-none bg-transparent p-0 px-3 text-sm text-gray-800 shadow-none focus:outline-none"
      >
        {uppercaseFirstLetter(internalValue)}
      </div>

      {typeof value === "object" && value.unit && (
        <span className="mr-3 text-xs italic text-gray-600">{value.unit}</span>
      )}
      <div className="flex items-center justify-end">
        {!isDisabled ? (
          <BasicButton
            wrapperClass="flex items-center justify-center"
            className={
              "rounded-lg rounded-l-none bg-gray-100 hover:bg-gray-100 hover:text-gray-700 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-700 md:py-2 md:pr-3"
            }
            variant={"ghost"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10Zm-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.236L14.97 8.97a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </BasicButton>
        ) : (
          <>
            <BasicButton
              onClick={() => {
                setTimeout(() => {
                  inputRef?.current?.focus();
                }, 10);

                setTimeout(() => {
                  if (inputRef.current) {
                    const range = document?.createRange();
                    const selection = window.getSelection();
                    range.setStart(
                      inputRef.current,
                      inputRef.current.childNodes.length,
                    );
                    range.collapse(true);
                    if (selection) {
                      selection.removeAllRanges();
                      selection.addRange(range);
                    }
                  }
                }, 10);
                setIsDisabled(false);
              }}
              wrapperClass="flex items-center justify-center"
              className={
                "rounded-lg rounded-l-none bg-gray-100 hover:bg-gray-100 hover:text-gray-700 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-700 md:py-2 md:pr-3"
              }
              variant={"ghost"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114Zm9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13l.887-.887Z"
                />
              </svg>
            </BasicButton>

            <BasicButton
              onClick={onClose}
              wrapperClass="flex items-center justify-center"
              className={
                "rounded-lg rounded-l-none bg-gray-100 hover:bg-gray-100 hover:text-gray-700 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-700 md:py-2 md:pr-3"
              }
              variant={"ghost"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </BasicButton>
          </>
        )}
      </div>
    </div>
  );
};

interface ICustomInput extends ComponentProps<"div"> {
  id: string;
  onSave: (value: string) => void;
  unit?: string;
}

const CustomInput = ({ id, onSave, unit, className }: ICustomInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<undefined | string>(undefined);
  const [internalValue, setInternalValue] = useState("");
  const form_id = useId();
  return (
    <form
      id={form_id}
      name="custom_input"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isValid(internalValue?.trim()) && !error) {
          onSave(internalValue!.trim());
          setInternalValue("");
          setError("");
          inputRef.current?.focus();
        } else {
          setError("Please enter a value.");
        }
      }}
      className={cn(`w-full`, className)}
    >
      <div className="flex w-full items-end justify-end gap-2">
        <Input
          id={`${id}`}
          ref={inputRef}
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            if (20 - internalValue.length <= 0) {
              setError("Cannot exceed 20 characters.");
            } else {
              setError(undefined);
            }
          }}
          className="w-full"
          placeholder="Enter value"
          RightContainer={() => (
            <>
              <p className="absolute bottom-0 right-0 mb-[0.9rem] mr-3 whitespace-nowrap bg-white text-xs italic text-gray-400">
                {20 - internalValue.length >= 0 ? 20 - internalValue.length : 0}
              </p>
            </>
          )}
          error={error}
        />

        <BasicButton
          type="submit"
          className={"p-3 md:p-3.5"}
          variant={"secondary"}
        >
          Add
        </BasicButton>
      </div>
      {!error && (
        <p className="ml-1 mt-2 text-[0.62rem] text-gray-600">
          For peak discoverability, choose from the suggested options. Buyers
          aren’t able to filter their results based on custom options.
        </p>
      )}
    </form>
  );
};

interface IInputOption extends ComponentProps<"div"> {
  onSave: (payload: { value: string; unit: string }) => void;
  units?: {
    name: string;
    si_unit?: string;
  }[];
}

const InputOption = ({ units, onSave, className }: IInputOption) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<undefined | string>(undefined);
  const [internalValue, setInternalValue] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(units ? units[0].name : "");
  const form_id = useId();
  return (
    <form
      id={form_id}
      name="custom_input_option"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isValid(internalValue?.trim()) && !error) {
          onSave({ value: internalValue!.trim(), unit: selectedUnit });
          setInternalValue("");
          setError("");
          inputRef.current?.focus();
        } else {
          setError("Please enter a value.");
        }
      }}
      className={cn(`w-full`, className)}
    >
      <div className="flex w-full items-end justify-end gap-2">
        <Input
          ref={inputRef}
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            if (20 - internalValue.length <= 0) {
              setError("Cannot exceed 20 characters.");
            } else {
              setError(undefined);
            }
          }}
          className="w-full"
          placeholder="Enter value"
          RightContainer={() => (
            <>
              <p className="absolute bottom-0 right-0 mb-[0.9rem] mr-3 whitespace-nowrap bg-white text-xs italic text-gray-400">
                {20 - internalValue.length >= 0 ? 20 - internalValue.length : 0}
              </p>
            </>
          )}
          error={error}
        />
        {units && units.length > 0 && (
          <Select
            onValueChange={(unit) => setSelectedUnit(unit)}
            placeholder="Select a unit"
            value={selectedUnit}
          >
            {units.map((unit) => (
              <Option key={unit.name} value={unit.name}>
                {unit.name}
              </Option>
            ))}
          </Select>
        )}

        <BasicButton
          type="submit"
          className={"p-3 md:p-3.5"}
          variant={"secondary"}
        >
          Add
        </BasicButton>
      </div>
    </form>
  );
};
export default VariationSelect;
