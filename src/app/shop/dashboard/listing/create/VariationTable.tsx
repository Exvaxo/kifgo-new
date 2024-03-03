"use client";

import { StockYouShopType } from "@/app/schema/StockYourShopSchema";
import { BasicButton, Button } from "@/components/Button";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import Checkbox from "@/components/form-elements/Checkbox";
import Input from "@/components/form-elements/Input";
import Switch from "@/components/form-elements/Switch";
import uppercaseFirstLetter from "@/utilities/uppercaseFirstLetter";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps, forwardRef, useMemo, useState } from "react";
import {
  UseFormRegisterReturn,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

const VariationTable = ({}: {}) => {
  const {
    register,
    watch,
    setError,
    control,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<StockYouShopType>();

  const groupVariations = useMemo(() => {
    if (!watch("variation")) return [];

    const variations = watch("variation");
    return variations.filter((variation) => variation.isGroup);
  }, [watch("variation")]);

  const groupHeadings = useMemo(() => {
    if (!groupVariations || groupVariations.length < 0) return [];

    const heads = [];

    if (
      !(
        groupVariations[0]?.variantSettings.sku &&
        !groupVariations[0].variantSettings.price &&
        !groupVariations[0].variantSettings.quantity
      )
    ) {
      heads.push("_checkbox");
    }

    heads.push(
      ...groupVariations
        .map((v) => v.combination.map((comb) => comb.variant))
        .flat(3),
    );

    if (groupVariations[0]?.variantSettings.sku) {
      heads.push("sku");
    }

    if (groupVariations[0]?.variantSettings.price) {
      heads.push("price");

      if (watch("pricing.isGlobalPricing")) {
        heads.push("Global price");
      }
    }

    if (groupVariations[0]?.variantSettings.quantity) {
      heads.push("quantity");
    }

    heads.push("r-visibility");

    return Array.from(new Set(heads));
  }, [groupVariations, watch("pricing.isGlobalPricing")]);

  const individualVariants = useMemo(() => {
    if (!watch("variation") || watch("variation").length < 0) return [];

    const heads = watch("variation")
      .map((v) => v.combination.map((comb) => comb.variant))
      .flat(3);

    return Array.from(new Set(heads));
  }, [watch("variation")]);

  const [isGroupSomethingSelected, setIsGroupSomethingSelected] =
    useState(false);

  const isIndivisualSomethingSelected = (key: string) => {
    const variations = JSON.parse(
      JSON.stringify(watch("variation") || []),
    ) as StockYouShopType["variation"];

    return (
      variations &&
      variations
        .filter(
          (variant) =>
            variant.combination[0].variant === key && variant.visibility,
        )
        .some((v) => v.isSelected)
    );
  };

  const updateIsGroupSomethingSelected = () => {
    const variations = JSON.parse(
      JSON.stringify(watch("variation")),
    ) as StockYouShopType["variation"];
    setIsGroupSomethingSelected((pv) => {
      const selected = variations.filter((v) => v.isSelected && v.visibility);
      const newV = selected.length > 0;

      if (pv === newV) return pv;
      else return newV;
    });
  };

  const isAllIndividualSelected = (key: string) => {
    const variations = JSON.parse(
      JSON.stringify(watch("variation") || []),
    ) as StockYouShopType["variation"];

    return (
      variations &&
      variations
        .filter(
          (variant) =>
            variant.combination[0].variant === key && variant.visibility,
        )
        .every((v) => v.isSelected)
    );
  };

  const isAllGroupSelected = () => {
    const variations = JSON.parse(
      JSON.stringify(watch("variation") || []),
    ) as StockYouShopType["variation"];

    return (
      variations &&
      variations.filter((v) => v.visibility).every((v) => v.isSelected)
    );
  };

  const getActualIndex = (variantId: string, value: string) => {
    const variations = watch("variation");
    return variations.findIndex(
      (v) =>
        v.combination[0].variantId === variantId &&
        v.combination[0].value === value,
    );
  };

  const getActualIndexUsingId = (id: string) => {
    const variations = watch("variation");
    return variations.findIndex((v) => v.variationId === id);
  };

  const getGroupSelectedVariants = () => {
    const variations = JSON.parse(
      JSON.stringify(watch("variation")),
    ) as StockYouShopType["variation"];
    return variations.filter((v) => v.isSelected && v.visibility);
  };

  const getIndividualSelectedVariants = (key: string) => {
    const variations = JSON.parse(
      JSON.stringify(watch("variation") || []),
    ) as StockYouShopType["variation"];

    return variations.filter(
      (variant) =>
        variant.combination[0].variant === key &&
        variant.visibility &&
        variant.isSelected,
    );
  };

  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const UpdatePriceSchema = z.object({
    srilanka: z
      .string({ required_error: "Price in Sri Lanka is required." })
      .trim()
      .min(1, "Price in Sri Lanka is required.")
      .transform(Number)
      .pipe(z.number({ invalid_type_error: "Invalid currency format." }).min(0))
      .transform(String)
      .pipe(z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid currency format."))
      .default("0")
      .optional()
      .or(z.literal("")),

    global: z
      .string()
      .trim()
      .transform(Number)
      .pipe(
        z
          .number({ invalid_type_error: "Invalid currency format." })
          .min(50, "Global price must be above 50."),
      )
      .transform(String)
      .pipe(z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid currency format."))
      .optional()
      .or(z.literal("")),
  });

  type UpdatePriceInputs = z.infer<typeof UpdatePriceSchema>;

  const updatePriceMethods = useForm<UpdatePriceInputs>({
    mode: "all",
    resolver: zodResolver(UpdatePriceSchema),
  });

  const UpdateQuantitySchema = z.object({
    quantity: z
      .string()
      .trim()
      .transform(Number)
      .pipe(
        z
          .number({ invalid_type_error: "Invalid number." })
          .min(0, "Must be greater than 0.")
          .max(999, "Must be less than 999."),
      )
      .transform(String)
      .optional()
      .or(z.literal("")),
  });

  type UpdateQuantityInput = z.infer<typeof UpdateQuantitySchema>;

  const updateQuantityMethods = useForm<UpdateQuantityInput>({
    mode: "all",
    resolver: zodResolver(UpdateQuantitySchema),
  });

  const [rerenderGroupTable, setRerenderGroupTable] = useState(0);

  return (
    <>
      {groupVariations && groupVariations.length > 0 && (
        <div className="relative w-full">
          <AnimatePresence initial={false}>
            {isGroupSomethingSelected && (
              <motion.div
                initial={{ translateY: 30 }}
                animate={{ translateY: 1 }}
                exit={{ translateY: 30 }}
                className="absolute left-0 top-0 -mt-8"
              >
                <SelectedControls
                  isPrice={getGroupSelectedVariants().some(
                    (v) => v.variantSettings.price,
                  )}
                  isQuantity={getGroupSelectedVariants().some(
                    (v) => v.variantSettings.quantity,
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Table
            key={rerenderGroupTable}
            tdClass="py-0"
            isEntireTableSelected={isAllGroupSelected()}
            onEntireTableSelectChange={(v) => {
              const variations = JSON.parse(
                JSON.stringify(watch("variation") || []),
              ) as StockYouShopType["variation"];
              if (v) {
                variations
                  .filter((v) => v.visibility)
                  .map((variation) => (variation.isSelected = true));
              } else {
                variations
                  .filter((v) => v.visibility)
                  .map((variation) => (variation.isSelected = false));
              }
              setValue("variation", variations);
              updateIsGroupSomethingSelected();
            }}
            className={`relative inset-0 max-h-[30rem] rounded-xl border-t-0 shadow-none transition-all duration-100 ${
              isGroupSomethingSelected && "rounded-tl-none"
            }`}
            tableHeadClass={`bg-gray-800 text-white border-t-0 `}
            datas={groupVariations.map((variation, index) => {
              let row = [];

              if (
                !(
                  variation?.variantSettings.sku &&
                  !variation.variantSettings.price &&
                  !variation.variantSettings.quantity
                )
              ) {
                row.push(
                  <Checkbox
                    disabled={!variation.visibility}
                    value={variation.isSelected ? "t" : ""}
                    onChange={(val) => {
                      setValue(`variation.${index}.isSelected`, val);
                      updateIsGroupSomethingSelected();
                    }}
                    key={index + "check_box"}
                  />,
                );
              }

              variation.combination.forEach((v) => {
                row.push(<div key={index + "value"}>{v.value}</div>);
              });

              if (variation.variantSettings.sku) {
                row.push(
                  <div key={index + "sku"} className="py-3">
                    <SkuInput
                      disabled={!variation.visibility}
                      register={register(`variation.${index}.sku`)}
                      {...register(`variation.${index}.sku`)}
                      placeholder="Enter SKU"
                      error={
                        errors.variation &&
                        errors.variation[index] &&
                        (errors.variation[index]?.sku?.message as string)
                      }
                    />
                  </div>,
                );
              }

              if (variation.variantSettings.price) {
                row.push(
                  <div key={index + "price"} className="">
                    <PriceInput
                      disabled={!variation.visibility}
                      register={register(`variation.${index}.pricing.srilanka`)}
                      priceFor="SRILANKA"
                      placeholder="Price"
                      error={
                        errors.variation &&
                        errors.variation[index] &&
                        (errors.variation[index]?.pricing?.srilanka
                          ?.message as string)
                      }
                      {...register(`variation.${index}.pricing.srilanka`)}
                    />
                  </div>,
                );

                if (watch("pricing.isGlobalPricing")) {
                  row.push(
                    <div key={index + "pricing"} className="w-full">
                      <PriceInput
                        disabled={!variation.visibility}
                        register={register(`variation.${index}.pricing.global`)}
                        priceFor="SRILANKA"
                        placeholder="Price"
                        error={
                          errors.variation &&
                          errors.variation[index] &&
                          (errors.variation[index]?.pricing?.global
                            ?.message as string)
                        }
                        {...register(`variation.${index}.pricing.global`)}
                      />
                    </div>,
                  );
                }
              }

              if (variation.variantSettings.quantity) {
                row.push(
                  <div key={index + "quantity"} className="">
                    <QuantityInput
                      disabled={!variation.visibility}
                      register={register(`variation.${index}.quantity`)}
                      enteredValue={
                        (watch(`variation.${index}.quantity`) as string) || ""
                      }
                      {...register(`variation.${index}.quantity`)}
                      placeholder="Qty"
                      className="w-20"
                      error={
                        errors.variation &&
                        errors.variation[index] &&
                        (errors.variation[index]?.quantity?.message as string)
                      }
                    />
                  </div>,
                );
              }

              row.push(
                <div key={index + "visibility"} className="flex justify-end">
                  <Switch
                    defaultSelected={watch(`variation.${index}.visibility`)}
                    onChange={(val) => {
                      setValue(`variation.${index}.visibility`, val);
                      if (!val) {
                        setValue(`variation.${index}.isSelected`, val);
                      }
                    }}
                  />
                </div>,
              );

              return row;
            })}
            headings={groupHeadings}
          />
        </div>
      )}

      {(!groupVariations || groupVariations.length <= 0) && (
        <div className="space-y-10">
          {individualVariants.length > 0 &&
            individualVariants.map((variantName) => (
              <div className="relative" key={variantName}>
                <AnimatePresence initial={false}>
                  {isIndivisualSomethingSelected(variantName) && (
                    <motion.div
                      initial={{ translateY: 30 }}
                      animate={{ translateY: 1 }}
                      exit={{ translateY: 30 }}
                      className="absolute left-0 top-0 -mt-1"
                    >
                      <SelectedControls
                        variant={variantName}
                        isPrice={getIndividualSelectedVariants(
                          variantName,
                        ).some((v) => v.variantSettings.price)}
                        isQuantity={getIndividualSelectedVariants(
                          variantName,
                        ).some((v) => v.variantSettings.quantity)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <h3 className="mb-3 text-sm font-medium text-gray-800">
                  {uppercaseFirstLetter(variantName)}
                </h3>
                <Table
                  tdClass="py-0"
                  isEntireTableSelected={isAllIndividualSelected(variantName)}
                  onEntireTableSelectChange={(v) => {
                    const variations = JSON.parse(
                      JSON.stringify(watch("variation") || []),
                    ) as StockYouShopType["variation"];
                    if (v) {
                      variations
                        .filter(
                          (variant) =>
                            variant.combination[0].variant === variantName &&
                            variant.visibility,
                        )
                        .map((variation) => (variation.isSelected = true));
                    } else {
                      variations
                        .filter(
                          (variant) =>
                            variant.combination[0].variant === variantName,
                        )
                        .map((variation) => (variation.isSelected = false));
                    }
                    setValue("variation", variations);
                  }}
                  className={`relative inset-0 max-h-[30rem] rounded-xl border-t-0 shadow-none transition-all duration-100 ${
                    isIndivisualSomethingSelected(variantName) &&
                    "rounded-tl-none"
                  }`}
                  tableHeadClass="bg-gray-800 text-white"
                  datas={watch("variation")
                    .filter(
                      (variant) =>
                        variant.combination[0].variant === variantName,
                    )
                    .map((variation) => {
                      const index = getActualIndex(
                        variation.combination[0].variantId,
                        variation.combination[0].value,
                      );
                      let row = [];

                      if (
                        !(
                          variation?.variantSettings.sku &&
                          !variation.variantSettings.price &&
                          !variation.variantSettings.quantity
                        )
                      ) {
                        row.push(
                          <Checkbox
                            disabled={!variation.visibility}
                            value={variation.isSelected ? "t" : ""}
                            onChange={(val) => {
                              setValue(`variation.${index}.isSelected`, val);
                            }}
                            name={`variation.${index}.${variantName}`}
                            key={index + "checkbox"}
                          />,
                        );
                      }

                      row.push(
                        <div key={index + "value"} className="">
                          {variation.combination[0].value}
                        </div>,
                      );

                      if (variation.variantSettings.sku) {
                        row.push(
                          <div key={index + "sku"} className="w-full py-2">
                            <SkuInput
                              disabled={!variation.visibility}
                              register={register(`variation.${index}.sku`)}
                              {...register(`variation.${index}.sku`)}
                              placeholder="Enter SKU"
                              error={
                                errors.variation &&
                                errors.variation[index] &&
                                (errors.variation[index]?.sku
                                  ?.message as string)
                              }
                            />
                          </div>,
                        );
                      }

                      if (variation.variantSettings.price) {
                        row.push(
                          <div key={index + "pricing"} className="w-full">
                            <PriceInput
                              disabled={!variation.visibility}
                              register={register(
                                `variation.${index}.pricing.srilanka`,
                              )}
                              priceFor="SRILANKA"
                              placeholder="Price"
                              error={
                                errors.variation &&
                                errors.variation[index] &&
                                (errors.variation[index]?.pricing?.srilanka
                                  ?.message as string)
                              }
                              {...register(
                                `variation.${index}.pricing.srilanka`,
                              )}
                            />
                          </div>,
                        );

                        if (watch("pricing.isGlobalPricing")) {
                          row.push(
                            <div key={index + "pricing"} className="w-full">
                              <PriceInput
                                disabled={!variation.visibility}
                                register={register(
                                  `variation.${index}.pricing.global`,
                                )}
                                priceFor="SRILANKA"
                                placeholder="Price"
                                error={
                                  errors.variation &&
                                  errors.variation[index] &&
                                  (errors.variation[index]?.pricing?.global
                                    ?.message as string)
                                }
                                {...register(
                                  `variation.${index}.pricing.global`,
                                )}
                              />
                            </div>,
                          );
                        }
                      }

                      if (variation.variantSettings.quantity) {
                        row.push(
                          <div key={index + "quantity"} className="">
                            <QuantityInput
                              disabled={!variation.visibility}
                              enteredValue={
                                (watch(
                                  `variation.${index}.quantity`,
                                ) as string) || ""
                              }
                              register={register(`variation.${index}.quantity`)}
                              {...register(`variation.${index}.quantity`)}
                              placeholder="Qty"
                              className="w-20"
                              error={
                                errors.variation &&
                                errors.variation[index] &&
                                (errors.variation[index]?.quantity
                                  ?.message as string)
                              }
                            />
                          </div>,
                        );
                      }

                      row.push(
                        <div
                          key={index + "visibility"}
                          className="flex justify-end"
                        >
                          <Switch
                            defaultSelected={watch(
                              `variation.${index}.visibility`,
                            )}
                            onChange={(val) => {
                              setValue(`variation.${index}.visibility`, val);
                              if (!val) {
                                setValue(`variation.${index}.isSelected`, val);
                              }
                            }}
                          />
                        </div>,
                      );

                      return row;
                    })}
                  headings={((): string[] => {
                    const variant = watch("variation").find(
                      (variant) =>
                        variant.combination[0].variant === variantName,
                    );

                    const heads = [];

                    if (
                      !(
                        variant?.variantSettings.sku &&
                        !variant.variantSettings.price &&
                        !variant.variantSettings.quantity
                      )
                    ) {
                      heads.push("_checkbox");
                    }
                    heads.push("options");

                    if (variant?.variantSettings.sku) {
                      heads.push("sku");
                    }

                    if (variant?.variantSettings.price) {
                      heads.push("price");
                      if (watch("pricing.isGlobalPricing")) {
                        heads.push("Global price");
                      }
                    }

                    if (variant?.variantSettings.quantity) {
                      heads.push("quantity");
                    }

                    heads.push("r-visibility");

                    return Array.from(new Set(heads));
                  })()}
                />
              </div>
            ))}
        </div>
      )}

      <Modal
        className="max-w-lg p-0 sm:p-0"
        open={
          !!(
            (isGroupSomethingSelected && searchParams.has("change-price")) ||
            (searchParams.has("change-price") &&
              searchParams.get("variant") &&
              isIndivisualSomethingSelected(searchParams.get("variant") || ""))
          )
        }
        onOpenChange={(open) => {
          if (open) {
            router.push(`${path}?change-price=open`, {
              scroll: false,
            });
          } else {
            router.push(path, { scroll: false });
          }
        }}
      >
        <div className="sticky inset-x-0 top-0 z-[999999999999999] bg-white p-4 pb-3 sm:p-6 sm:pb-3">
          <div className="relative w-full">
            <div className="absolute right-0 top-0">
              <Modal.Close asChild>
                <BasicButton
                  variant={"ghost"}
                  className={"text-gray-400 hover:text-gray-500"}
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
              </Modal.Close>
            </div>
            <Modal.Title className="text-base font-medium text-gray-800 sm:text-lg">
              Update Price
            </Modal.Title>
            <Modal.Description className="mt-1 max-w-xs text-xs text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
              non alias consequuntur!
            </Modal.Description>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            updatePriceMethods.handleSubmit((values) => {
              let selected: StockYouShopType["variation"] = [];

              if (isGroupSomethingSelected) {
                selected = getGroupSelectedVariants();
              }

              if (
                searchParams.get("variant") &&
                isIndivisualSomethingSelected(searchParams.get("variant") || "")
              ) {
                selected = getIndividualSelectedVariants(
                  searchParams.get("variant") || "",
                );
              }

              selected.forEach((variant) => {
                const actualIndex = getActualIndexUsingId(variant.variationId);

                if (values.srilanka) {
                  setValue(
                    `variation.${actualIndex}.pricing.srilanka`,
                    values.srilanka,
                  );
                }

                if (values.global) {
                  setValue(
                    `variation.${actualIndex}.pricing.global`,
                    values.global,
                  );
                }

                setValue(`variation.${actualIndex}.isSelected`, false);
              });

              setIsGroupSomethingSelected(false);
              updatePriceMethods.reset();
              router.push(path, { scroll: false });
            })();
          }}
          className="mt-5 px-6 pb-6"
        >
          <div className="flex w-full items-center justify-between gap-5">
            <Input
              {...updatePriceMethods.register("srilanka")}
              className="w-full"
              label="Srilanka"
              inputClass="pl-10 bg-white"
              LeadingIcon={() => (
                <svg
                  className="ml-3 h-5 w-5 text-gray-600"
                  viewBox="0 0 227 94"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.227273 94V0.909088H14.2727V81.9091H56.4545V94H0.227273ZM72.4773 94V0.909088H86.5227V45.3636H87.6591L126.705 0.909088H144.386L106.841 42.8182L144.523 94H127.614L97.5227 52.4091L86.5227 65.0455V94H72.4773ZM157.477 94V0.909088H190.659C197.871 0.909088 203.856 2.15151 208.614 4.63636C213.402 7.12121 216.977 10.5606 219.341 14.9545C221.705 19.3182 222.886 24.3636 222.886 30.0909C222.886 35.7879 221.689 40.803 219.295 45.1364C216.932 49.4394 213.356 52.7879 208.568 55.1818C203.811 57.5758 197.826 58.7727 190.614 58.7727H165.477V46.6818H189.341C193.886 46.6818 197.583 46.0303 200.432 44.7273C203.311 43.4242 205.417 41.5303 206.75 39.0455C208.083 36.5606 208.75 33.5758 208.75 30.0909C208.75 26.5758 208.068 23.5303 206.705 20.9545C205.371 18.3788 203.265 16.4091 200.386 15.0455C197.538 13.6515 193.795 12.9545 189.159 12.9545H171.523V94H157.477ZM203.432 52L226.432 94H210.432L187.886 52H203.432Z"
                    fill="black"
                  />
                </svg>
              )}
              error={
                updatePriceMethods.formState.errors.srilanka &&
                (updatePriceMethods.formState.errors.srilanka
                  ?.message as string)
              }
            />
            {watch("pricing.isGlobalPricing") && (
              <Input
                {...updatePriceMethods.register("global")}
                className="w-full"
                label="Global"
                inputClass="pl-10 bg-white"
                LeadingIcon={() => (
                  <svg
                    className="ml-3 h-5 w-5 text-gray-600"
                    viewBox="0 0 227 94"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.227273 94V0.909088H14.2727V81.9091H56.4545V94H0.227273ZM72.4773 94V0.909088H86.5227V45.3636H87.6591L126.705 0.909088H144.386L106.841 42.8182L144.523 94H127.614L97.5227 52.4091L86.5227 65.0455V94H72.4773ZM157.477 94V0.909088H190.659C197.871 0.909088 203.856 2.15151 208.614 4.63636C213.402 7.12121 216.977 10.5606 219.341 14.9545C221.705 19.3182 222.886 24.3636 222.886 30.0909C222.886 35.7879 221.689 40.803 219.295 45.1364C216.932 49.4394 213.356 52.7879 208.568 55.1818C203.811 57.5758 197.826 58.7727 190.614 58.7727H165.477V46.6818H189.341C193.886 46.6818 197.583 46.0303 200.432 44.7273C203.311 43.4242 205.417 41.5303 206.75 39.0455C208.083 36.5606 208.75 33.5758 208.75 30.0909C208.75 26.5758 208.068 23.5303 206.705 20.9545C205.371 18.3788 203.265 16.4091 200.386 15.0455C197.538 13.6515 193.795 12.9545 189.159 12.9545H171.523V94H157.477ZM203.432 52L226.432 94H210.432L187.886 52H203.432Z"
                      fill="black"
                    />
                  </svg>
                )}
                error={
                  updatePriceMethods.formState.errors.global &&
                  (updatePriceMethods.formState.errors.global
                    ?.message as string)
                }
              />
            )}
          </div>

          <div className="mt-10 flex flex-col items-end justify-end gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-end">
            <Button
              onClick={() => {
                router.push(path, { scroll: false });
              }}
              wrapperClass="w-full sm:w-min"
              className={"flex w-full items-center justify-center sm:w-auto"}
              variant={"secondary"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              wrapperClass="w-full sm:w-min"
              className={"flex w-full items-center justify-center sm:w-auto"}
            >
              Apply
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        className="max-w-lg p-0 sm:p-0"
        open={
          !!(
            (isGroupSomethingSelected && searchParams.has("change-quantity")) ||
            (searchParams.get("variant") &&
              searchParams.has("change-quantity") &&
              isIndivisualSomethingSelected(searchParams.get("variant") || ""))
          )
        }
        onOpenChange={(open) => {
          if (open) {
            router.push(`${path}?change-quantity=open`, {
              scroll: false,
            });
          } else {
            router.push(path, { scroll: false });
          }
        }}
      >
        <div className="sticky inset-x-0 top-0 z-[999999999999999] bg-white p-4 pb-3 sm:p-6 sm:pb-3">
          <div className="relative w-full">
            <div className="absolute right-0 top-0">
              <Modal.Close asChild>
                <BasicButton
                  variant={"ghost"}
                  className={"text-gray-400 hover:text-gray-500"}
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
              </Modal.Close>
            </div>
            <Modal.Title className="text-base font-medium text-gray-800 sm:text-lg">
              Update Quantity
            </Modal.Title>
            <Modal.Description className="mt-1 max-w-xs text-xs text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
              non alias consequuntur!
            </Modal.Description>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            updateQuantityMethods.handleSubmit((values) => {
              let selected: StockYouShopType["variation"] = [];

              if (isGroupSomethingSelected) {
                selected = getGroupSelectedVariants();
              }

              if (
                searchParams.get("variant") &&
                isIndivisualSomethingSelected(searchParams.get("variant") || "")
              ) {
                selected = getIndividualSelectedVariants(
                  searchParams.get("variant") || "",
                );
              }

              selected.forEach((variant) => {
                const actualIndex = getActualIndexUsingId(variant.variationId);

                setValue(`variation.${actualIndex}.quantity`, values.quantity);

                setValue(`variation.${actualIndex}.isSelected`, false);
              });

              setIsGroupSomethingSelected(false);
              updateQuantityMethods.reset();
              router.push(path, { scroll: false });
            })();
          }}
          className="mt-5 px-6 pb-6"
        >
          <div className="flex w-full items-center justify-between gap-5">
            <Input
              {...updateQuantityMethods.register("quantity")}
              className="w-full"
              label="Quantity"
              inputClass="bg-white"
              error={
                updateQuantityMethods.formState.errors.quantity &&
                (updateQuantityMethods.formState.errors.quantity
                  ?.message as string)
              }
            />
          </div>

          <div className="mt-10 flex flex-col items-end justify-end gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-end">
            <Button
              onClick={() => {
                router.push(path, { scroll: false });
              }}
              wrapperClass="w-full sm:w-min"
              className={"flex w-full items-center justify-center sm:w-auto"}
              variant={"secondary"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              wrapperClass="w-full sm:w-min"
              className={"flex w-full items-center justify-center sm:w-auto"}
            >
              Apply
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

const SelectedControls = ({
  variant,
  isPrice = true,
  isQuantity = true,
}: {
  variant?: string;
  isPrice?: boolean;
  isQuantity?: boolean;
}) => {
  const path = usePathname();
  const router = useRouter();
  return (
    <>
      {(isPrice || isQuantity) && (
        <div className="flex w-min items-center justify-between gap-2 rounded-t-xl border border-b-0 border-r-0 bg-gray-800 px-3 py-2 pb-3">
          {isPrice && (
            <Button
              onClick={() => {
                let url = `${path}?change-price=open`;
                if (variant) {
                  url += `&variant=${variant}`;
                }
                router.push(url, {
                  scroll: false,
                });
              }}
              variant={"ghost"}
              wrapperClass="h-min flex items-center"
              className={
                "whitespace-nowrap p-0 text-xs text-white hover:underline data-[pressed]:text-gray-100  data-[pressed]:underline md:p-0"
              }
            >
              Update Price
            </Button>
          )}

          {isQuantity && (
            <Button
              onClick={() => {
                let url = `${path}?change-quantity=open`;
                if (variant) {
                  url += `&variant=${variant}`;
                }
                router.push(url, {
                  scroll: false,
                });
              }}
              variant={"ghost"}
              wrapperClass="h-min flex items-center"
              className={
                "whitespace-nowrap p-0 text-xs text-white hover:underline data-[pressed]:text-gray-100  data-[pressed]:underline md:p-0"
              }
            >
              Update Quantity
            </Button>
          )}
        </div>
      )}
    </>
  );
};

interface IPriceInput extends ComponentProps<typeof Input> {
  priceFor?: "SRILANKA" | "GLOBAL";
  register: UseFormRegisterReturn;
}
const PriceInput = forwardRef<HTMLInputElement, IPriceInput>(
  ({ register, priceFor = "SRILANKA", error, ...rest }, ref) => {
    const [isHover, setIsHover] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    return (
      <div className="relative w-28">
        <Input
          className="w-full"
          error={error ? " " : ""}
          ref={ref}
          inputClass="pl-10 py-2 md:py-2 bg-white"
          LeadingIcon={() =>
            priceFor === "SRILANKA" ? (
              <svg
                className="ml-3 h-5 w-5 text-gray-600"
                viewBox="0 0 227 94"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.227273 94V0.909088H14.2727V81.9091H56.4545V94H0.227273ZM72.4773 94V0.909088H86.5227V45.3636H87.6591L126.705 0.909088H144.386L106.841 42.8182L144.523 94H127.614L97.5227 52.4091L86.5227 65.0455V94H72.4773ZM157.477 94V0.909088H190.659C197.871 0.909088 203.856 2.15151 208.614 4.63636C213.402 7.12121 216.977 10.5606 219.341 14.9545C221.705 19.3182 222.886 24.3636 222.886 30.0909C222.886 35.7879 221.689 40.803 219.295 45.1364C216.932 49.4394 213.356 52.7879 208.568 55.1818C203.811 57.5758 197.826 58.7727 190.614 58.7727H165.477V46.6818H189.341C193.886 46.6818 197.583 46.0303 200.432 44.7273C203.311 43.4242 205.417 41.5303 206.75 39.0455C208.083 36.5606 208.75 33.5758 208.75 30.0909C208.75 26.5758 208.068 23.5303 206.705 20.9545C205.371 18.3788 203.265 16.4091 200.386 15.0455C197.538 13.6515 193.795 12.9545 189.159 12.9545H171.523V94H157.477ZM203.432 52L226.432 94H210.432L187.886 52H203.432Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                className="ml-3 h-5 w-5 text-gray-600"
                viewBox="0 0 252 97"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60.0909 1.90909H74.1818V63.1364C74.1818 69.6515 72.6515 75.4242 69.5909 80.4545C66.5303 85.4545 62.2273 89.3939 56.6818 92.2727C51.1364 95.1212 44.6364 96.5455 37.1818 96.5455C29.7576 96.5455 23.2727 95.1212 17.7273 92.2727C12.1818 89.3939 7.87879 85.4545 4.81818 80.4545C1.75758 75.4242 0.227273 69.6515 0.227273 63.1364V1.90909H14.2727V62C14.2727 66.2121 15.197 69.9545 17.0455 73.2273C18.9242 76.5 21.5758 79.0758 25 80.9545C28.4242 82.803 32.4848 83.7273 37.1818 83.7273C41.9091 83.7273 45.9848 82.803 49.4091 80.9545C52.8636 79.0758 55.5 76.5 57.3182 73.2273C59.1667 69.9545 60.0909 66.2121 60.0909 62V1.90909ZM145.375 26.3636C144.89 22.0606 142.89 18.7273 139.375 16.3636C135.86 13.9697 131.436 12.7727 126.102 12.7727C122.284 12.7727 118.981 13.3788 116.193 14.5909C113.405 15.7727 111.239 17.4091 109.693 19.5C108.178 21.5606 107.42 23.9091 107.42 26.5455C107.42 28.7576 107.936 30.6667 108.966 32.2727C110.027 33.8788 111.405 35.2273 113.102 36.3182C114.83 37.3788 116.678 38.2727 118.648 39C120.617 39.697 122.511 40.2727 124.33 40.7273L133.42 43.0909C136.39 43.8182 139.436 44.803 142.557 46.0455C145.678 47.2879 148.572 48.9242 151.239 50.9545C153.905 52.9848 156.057 55.5 157.693 58.5C159.36 61.5 160.193 65.0909 160.193 69.2727C160.193 74.5455 158.83 79.2273 156.102 83.3182C153.405 87.4091 149.481 90.6364 144.33 93C139.208 95.3636 133.011 96.5455 125.739 96.5455C118.769 96.5455 112.739 95.4394 107.648 93.2273C102.557 91.0152 98.572 87.8788 95.6932 83.8182C92.8144 79.7273 91.2235 74.8788 90.9205 69.2727H105.011C105.284 72.6364 106.375 75.4394 108.284 77.6818C110.223 79.8939 112.693 81.5455 115.693 82.6364C118.723 83.697 122.042 84.2273 125.648 84.2273C129.617 84.2273 133.148 83.6061 136.239 82.3636C139.36 81.0909 141.814 79.3333 143.602 77.0909C145.39 74.8182 146.284 72.1667 146.284 69.1364C146.284 66.3788 145.496 64.1212 143.92 62.3636C142.375 60.6061 140.269 59.1515 137.602 58C134.966 56.8485 131.981 55.8333 128.648 54.9545L117.648 51.9545C110.193 49.9242 104.284 46.9394 99.9205 43C95.5871 39.0606 93.4205 33.8485 93.4205 27.3636C93.4205 22 94.875 17.3182 97.7841 13.3182C100.693 9.31818 104.633 6.21212 109.602 4C114.572 1.75757 120.178 0.63636 126.42 0.63636C132.723 0.63636 138.284 1.74242 143.102 3.95454C147.951 6.16667 151.769 9.21212 154.557 13.0909C157.345 16.9394 158.799 21.3636 158.92 26.3636H145.375ZM207.114 95H176.977V1.90909H208.068C217.189 1.90909 225.023 3.77273 231.568 7.5C238.114 11.197 243.129 16.5151 246.614 23.4545C250.129 30.3636 251.886 38.6515 251.886 48.3182C251.886 58.0152 250.114 66.3485 246.568 73.3182C243.053 80.2879 237.962 85.6515 231.295 89.4091C224.629 93.1364 216.568 95 207.114 95ZM191.023 82.7273H206.341C213.432 82.7273 219.326 81.3939 224.023 78.7273C228.72 76.0303 232.235 72.1364 234.568 67.0455C236.902 61.9242 238.068 55.6818 238.068 48.3182C238.068 41.0152 236.902 34.8182 234.568 29.7273C232.265 24.6364 228.826 20.7727 224.25 18.1364C219.674 15.5 213.992 14.1818 207.205 14.1818H191.023V82.7273Z"
                  fill="black"
                />
              </svg>
            )
          }
          {...rest}
          onMouseOver={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={(e) => {
            register.onBlur(e);
            setIsFocus(false);
          }}
        />

        <AnimatePresence>
          {error && (isHover || isFocus) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="-ml-auto absolute bottom-0 left-0 z-[99] mb-10"
            >
              <div className="mb-1 flex w-full max-w-xs flex-shrink-0 items-center justify-start overflow-x-auto whitespace-nowrap rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow">
                <svg className="mr-2 h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="w-full ">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
PriceInput.displayName = "PriceInput";

interface ISkuInput extends ComponentProps<typeof Input> {
  register: UseFormRegisterReturn;
}
const SkuInput = forwardRef<HTMLInputElement, ISkuInput>(
  ({ register, error, ...rest }, ref) => {
    const [isHover, setIsHover] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    return (
      <div className="relative w-full min-w-[12rem]">
        <Input
          className="w-full"
          inputClass="py-2 md:py-2 bg-white"
          error={error ? " " : ""}
          ref={ref}
          {...rest}
          onMouseOver={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={(e) => {
            register.onBlur(e);
            setIsFocus(false);
          }}
        />

        <AnimatePresence>
          {error && (isHover || isFocus) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="-ml-auto absolute bottom-0 left-0 z-[99] mb-10"
            >
              <div className="mb-1 flex w-full max-w-xs flex-shrink-0 items-center justify-start overflow-x-auto whitespace-nowrap rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow">
                <svg className="mr-2 h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="w-full ">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
SkuInput.displayName = "SkuInput";

interface IQuantityInput extends ComponentProps<typeof Input> {
  register: UseFormRegisterReturn;
  enteredValue: string;
}
const QuantityInput = forwardRef<HTMLInputElement, IQuantityInput>(
  ({ register, enteredValue, error, ...rest }, ref) => {
    const [isHover, setIsHover] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    return (
      <div className="relative">
        <Input
          className="w-full"
          inputClass="py-2 md:py-2 bg-white"
          error={error ? " " : ""}
          ref={ref}
          {...rest}
          onMouseOver={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={(e) => {
            register.onBlur(e);
            setIsFocus(false);
          }}
        />

        <AnimatePresence>
          {error && (isHover || isFocus) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="-ml-auto absolute bottom-0 left-0 z-[99] mb-10"
            >
              <div className="mb-1 flex w-full max-w-xs flex-shrink-0 items-center justify-start overflow-x-auto whitespace-nowrap rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow">
                <svg className="mr-2 h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="w-full ">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {enteredValue === "0" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 right-0 z-[99] mr-[105%]"
            >
              <div className="mb-1 flex w-full max-w-xs flex-shrink-0 items-center justify-start overflow-x-auto whitespace-nowrap rounded-lg bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-700">
                <span className="tetx-xs w-full">sold</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
QuantityInput.displayName = "QuantityInput";

export default VariationTable;
