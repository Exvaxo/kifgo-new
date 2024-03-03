"use client";
import useLoadVariants from "@/app/client-apis/seller/variant/useLoadVariants";
import { BasicButton, Button } from "@/components/Button";
import Modal from "@/components/Modal";
import { nanoid } from "nanoid";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import VariationSelect, { VariantOption } from "./VariationSelect";
import VariationTable from "./VariationTable";
import { StockYouShopType } from "@/app/schema/StockYourShopSchema";

type VariantSelectedValue = {
  id: string;
  variant: string;
  value: string;
  unit?: string;
  editable: boolean;
};

export type AvailableVariant = {
  id: string;
  name: string;
  units: {
    name: string;
    si_unit?: string;
  }[];
  displayAs: "INPUT" | "CHECKBOX" | "SELECT";
  createdAt: string;
  updatedAt: string;
  options?: {
    id: string;
    value: string;
  }[];
};

export type VariantSettings = {
  price: boolean;
  quantity: boolean;
  sku: boolean;
};

export type AvailableVariants = {
  id: string;
  selectedVariant: AvailableVariant | undefined;
  selectedVariantOptions: VariantOption[] | undefined;
  variantSettings: VariantSettings;
  group?: boolean;
};

interface IVariants {}

const Variation = forwardRef<HTMLElement, IVariants>(({}, ref) => {
  const NUMBER_OF_VARIATIONS = 2;
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

  const { data: variants, isLoading: isVariantsLoading } = useLoadVariants();

  const createAvailableVariant = (): AvailableVariants => {
    return {
      id: nanoid(10),
      selectedVariant: undefined,
      variantSettings: {
        price: false,
        quantity: false,
        sku: false,
      },
      selectedVariantOptions: undefined,
    };
  };

  const [availableVariants, setAvailableVariants] = useState<
    AvailableVariants[]
  >([createAvailableVariant()]);

  const [isAvailableVariantSet, setIsAvailableVariantSet] = useState(false);

  useEffect(() => {
    if (!isAvailableVariantSet && variants) {
      const variation = watch("variation");
      const variantMap: { [x: string]: AvailableVariants } = {};

      if (variation) {
        variation.forEach((variant) => {
          variant.combination.forEach((comb) => {
            let options: VariantOption[] = [];
            if (comb.variantId in variantMap) {
              const oldOptions =
                variantMap[comb.variantId]?.selectedVariantOptions;
              if (oldOptions && oldOptions.length > 0) {
                options = [...oldOptions];
              }
            }

            let currentOption = comb as VariantOption | null;

            //filter duplicates
            if (
              options
                .map((opt) => opt.value + (opt?.unit || ""))
                .includes(comb.value + (comb?.unit || ""))
            ) {
              currentOption = null;
            }

            variantMap[comb.variantId] = {
              id: comb.variantId,
              selectedVariant: variants?.filter(
                (variant) => variant.id === comb.variantId,
              )[0] as unknown as AvailableVariant | undefined,
              selectedVariantOptions: currentOption
                ? [...options, currentOption]
                : [...options],
              variantSettings: variant.variantSettings || {
                price: false,
                quantity: false,
                sku: false,
              },
              group: variant.isGroup,
            };
          });
        });

        const availableVariants: AvailableVariants[] =
          Object.values(variantMap);

        setAvailableVariants(availableVariants);

        setIsAvailableVariantSet(true);
      }
    }
  }, [watch("variation"), variants]);

  const selectedVariants = useMemo(
    () => availableVariants.map((v) => v.selectedVariant),
    [availableVariants],
  );

  const filteredVariants = useMemo(
    () =>
      variants &&
      variants.filter(
        (v) => !selectedVariants.map((variant) => variant?.id).includes(v.id),
      ),
    [selectedVariants, variants],
  );

  const isApplyButtonDisabled = useMemo(() => {
    const isVariant_1 =
      availableVariants[0] && availableVariants[0].selectedVariant;

    const isVariant_1_options_selected =
      availableVariants[0] &&
      availableVariants[0].selectedVariantOptions &&
      availableVariants[0].selectedVariantOptions?.length > 0;

    const isVariant_2 =
      availableVariants[1] && availableVariants[1].selectedVariant;

    const isVariant_2_options_selected =
      availableVariants[1] &&
      availableVariants[1].selectedVariantOptions &&
      availableVariants[1].selectedVariantOptions?.length > 0;

    if (!isVariant_1) {
      return false;
    }

    if (isVariant_1 && !isVariant_2) {
      return !isVariant_1_options_selected;
    }

    if (isVariant_1 && isVariant_2) {
      return !(isVariant_1_options_selected && isVariant_2_options_selected);
    }
  }, [availableVariants]);

  const [openVariation, setOpenVariation] = useState(false);

  return (
    <section ref={ref} id="variations" className="w-full px-3 md:px-10">
      <div className="flex w-full items-center justify-between gap-10">
        <div className="">
          <h3 className="text-xl font-medium text-gray-800">Variations</h3>
          <p className="text-xs text-gray-600">
            Add available options like color or size. Buyers will choose from
            these during checkout.
          </p>
        </div>

        <Button onClick={() => setOpenVariation(true)} variant={"secondary"}>
          <div className="whitespace-nowrap">
            {watch("variation")?.length > 0 ? "Edit" : "Add"} Variation
          </div>
        </Button>

        <Modal
          className="max-w-3xl p-0 sm:p-0"
          open={openVariation}
          onOpenChange={setOpenVariation}
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
                {watch("variation")?.length > 0 ? "Modify" : "Add"} Variations
              </Modal.Title>
              <Modal.Description className="mt-1 text-xs text-gray-600">
                List all the options you offer. Buyers will see them in the
                order they are here.
              </Modal.Description>
            </div>
          </div>

          <div className="w-full p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="w-full divide-y">
              {availableVariants &&
                availableVariants.length > 0 &&
                availableVariants.map((availableVariant, index) => (
                  <div key={availableVariant.id} className="py-10">
                    <VariationSelect
                      isLoading={isVariantsLoading}
                      label={`Variation ${index + 1}`}
                      selectedVariant={availableVariant.selectedVariant}
                      selectedVariationOptions={
                        availableVariant.selectedVariantOptions || []
                      }
                      onVariantSelect={(selectedVariant) => {
                        if (selectedVariant) {
                          setAvailableVariants((pv) =>
                            pv.map((variant) => {
                              if (variant.id === availableVariant.id) {
                                variant.selectedVariant = selectedVariant;
                              }
                              return variant;
                            }),
                          );
                          if (
                            availableVariants.length <=
                            NUMBER_OF_VARIATIONS - 1
                          ) {
                            setAvailableVariants((pv) => [
                              ...pv,
                              createAvailableVariant(),
                            ]);
                          }
                        } else {
                          if (
                            availableVariants
                              .map((v) => v.selectedVariant)
                              .filter((v) => v).length > 1
                          ) {
                            setAvailableVariants((pv) => {
                              const updated = pv.filter(
                                (v) => v.id !== availableVariant.id,
                              );

                              if (updated[updated.length - 1].selectedVariant) {
                                updated.push(createAvailableVariant());
                              }

                              return updated;
                            });
                          } else {
                            setAvailableVariants([createAvailableVariant()]);
                          }
                        }
                      }}
                      settings={availableVariant?.variantSettings}
                      onVariantSettingsChange={(key, value) => {
                        const internalAvailableVariants = JSON.parse(
                          JSON.stringify(availableVariants),
                        );
                        internalAvailableVariants.map((v: any) => {
                          if (v.id === availableVariant.id) {
                            v.variantSettings[key] = value;
                          }
                          return v;
                        });

                        setAvailableVariants(internalAvailableVariants);
                      }}
                      variants={filteredVariants}
                      onVariantSelectedOptionsChange={(change) => {
                        setAvailableVariants((pv) => {
                          pv[index].selectedVariantOptions = change;
                          return [...pv];
                        });
                      }}
                    />
                  </div>
                ))}
            </div>

            <div className="mt-10 flex flex-col items-end justify-end gap-5 border-t pt-5 sm:flex-row sm:items-center sm:justify-end">
              <Button
                onClick={() => {
                  setOpenVariation(false);
                }}
                wrapperClass="w-full sm:w-min"
                className={"flex w-full items-center justify-center sm:w-auto"}
                variant={"secondary"}
              >
                Cancel
              </Button>

              <Button
                disabled={isApplyButtonDisabled}
                onClick={() => {
                  const [variant_1, variant_2] =
                    availableVariants as AvailableVariants[];

                  if (
                    variant_1?.selectedVariantOptions &&
                    variant_1?.selectedVariantOptions?.length <= 0
                  ) {
                    setValue("variation", []);
                  } else {
                    const variantSettings = {
                      price:
                        variant_1?.variantSettings?.price ||
                        variant_2?.variantSettings?.price,
                      quantity:
                        variant_1?.variantSettings?.quantity ||
                        variant_2?.variantSettings?.quantity,
                      sku:
                        variant_1?.variantSettings?.sku ||
                        variant_2?.variantSettings?.sku,
                    };

                    if (variant_1 && variant_2) {
                      if (
                        variant_1?.variantSettings?.price &&
                        variant_2?.variantSettings?.price
                      ) {
                        variant_1.group = true;
                        variant_2.group = true;
                      } else if (
                        variant_1?.variantSettings?.quantity &&
                        variant_2?.variantSettings?.quantity
                      ) {
                        variant_1.group = true;
                        variant_2.group = true;
                      } else if (
                        variant_1?.variantSettings?.sku &&
                        variant_2?.variantSettings?.sku
                      ) {
                        variant_1.group = true;
                        variant_2.group = true;
                      } else {
                        variant_1.group = false;
                        variant_2.group = false;
                      }
                    }

                    const variations: StockYouShopType["variation"] = [];

                    if (variant_1?.group && variant_2?.group) {
                      variant_1?.selectedVariantOptions?.forEach(
                        (v1_option) => {
                          variant_2.selectedVariantOptions?.forEach(
                            (v2_option) => {
                              const variation: StockYouShopType["variation"][0] =
                                {
                                  variationId: nanoid(10),
                                  visibility: true,
                                  isSelected: false,
                                  isGroup: !!(
                                    variant_1?.group && variant_2?.group
                                  ),
                                  variantSettings,
                                  sku: "",
                                  pricing: {
                                    srilanka: "0",
                                    global: "0",
                                  },
                                  quantity: "1",
                                  combination: [
                                    {
                                      value: v1_option.value,
                                      unit: v1_option.unit || null,
                                      isEditable: v1_option.isEditable,
                                      variant: v1_option.variant,
                                      variantId: v1_option.variantId,
                                    },
                                    {
                                      value: v2_option.value,
                                      unit: v2_option.unit || null,
                                      isEditable: v2_option.isEditable,
                                      variant: v2_option.variant,
                                      variantId: v2_option.variantId,
                                    },
                                  ],
                                };

                              variations.push(variation);
                            },
                          );
                        },
                      );
                    } else {
                      variant_1?.selectedVariantOptions?.map((variant) => {
                        const variation: StockYouShopType["variation"][0] = {
                          variationId: nanoid(10),
                          isSelected: false,
                          visibility: true,
                          isGroup: false,
                          variantSettings: variant_1.variantSettings,
                          sku: "",
                          pricing: {
                            srilanka: "0",
                            global: "0",
                          },
                          quantity: "1",
                          combination: [
                            {
                              value: variant.value,
                              unit: variant.unit || null,
                              isEditable: variant.isEditable,
                              variant: variant.variant,
                              variantId: variant.variantId,
                            },
                          ],
                        };

                        variations.push(variation);
                      });

                      if (variant_2) {
                        variant_2?.selectedVariantOptions?.map((variant) => {
                          const variation: StockYouShopType["variation"][0] = {
                            variationId: nanoid(10),
                            isSelected: false,
                            visibility: true,
                            isGroup: false,
                            variantSettings: variant_2.variantSettings,
                            sku: "",
                            pricing: {
                              srilanka: "",
                              global: undefined,
                            },
                            quantity: "1",
                            combination: [
                              {
                                value: variant.value,
                                unit: variant.unit || null,
                                isEditable: variant.isEditable,
                                variant: variant.variant,
                                variantId: variant.variantId,
                              },
                            ],
                          };

                          variations.push(variation);
                        });
                      }
                    }
                    setValue("variation", variations);
                  }

                  setOpenVariation(false);
                }}
                wrapperClass="w-full sm:w-min"
                className={"flex w-full items-center justify-center sm:w-auto"}
              >
                Apply
              </Button>
            </div>
          </div>
        </Modal>
      </div>

      <div className="mt-10">
        <VariationTable />
      </div>
    </section>
  );
});

Variation.displayName = "Variation";
export default Variation;
