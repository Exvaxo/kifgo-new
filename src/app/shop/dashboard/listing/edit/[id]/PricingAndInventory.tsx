"use client";
import { StockYouShopType } from "@/app/schema/StockYourShopSchema";
import { Button } from "@/components/Button";
import Input from "@/components/form-elements/Input";
import Switch from "@/components/form-elements/Switch";
import { forwardRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const PricingAndInventory = forwardRef<HTMLElement>(({}, ref) => {
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

  const volumePricingArray = useFieldArray({
    control: control,
    name: "pricing.volumePricing",
  });
  return (
    <section
      ref={ref}
      id="price-&-inventory"
      className="mb-10 w-full px-3 md:px-10"
    >
      <h3 className="text-xl font-medium text-gray-800">Pricing & Inventory</h3>
      <p className="text-xs text-gray-600">
        Set a price for your item and indicate how many are available for sale.
      </p>

      <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
        <div className="w-full">
          <Input
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
            disabled={
              !!(
                watch("variation") &&
                watch("variation").some(
                  (variation) => variation.variantSettings.price,
                )
              )
            }
            placeholder="Enter product price."
            error={errors?.pricing?.srilanka?.message as string}
            {...register("pricing.srilanka")}
          />
          {watch("variation") &&
            watch("variation").some(
              (variation) => variation.variantSettings.price,
            ) && (
              <p className="mt-1 text-xs text-gray-600">
                You can configure price in the variations table.
              </p>
            )}
        </div>

        <div className="w-full">
          <Input
            label="Quantity"
            placeholder="Enter product quantity."
            error={errors?.pricing?.quantity?.message as string}
            disabled={
              !!(
                watch("variation") &&
                watch("variation").some(
                  (variation) => variation.variantSettings.quantity,
                )
              )
            }
            {...register("pricing.quantity")}
          />

          {watch("variation") &&
            watch("variation").some(
              (variation) => variation.variantSettings.quantity,
            ) && (
              <p className="mt-1 text-xs text-gray-600">
                You can configure quantity in the variations table.
              </p>
            )}
        </div>
      </div>

      <div
        className={`mt-10 ${
          watch(`pricing.isGlobalPricing`) &&
          "rounded-xl border bg-gray-50/50 p-3"
        }`}
      >
        <div className="flex w-full flex-row items-center justify-between gap-3">
          <div className="">
            <h3 className="text-sm font-medium text-gray-800">
              Domestic & global pricing
            </h3>

            <p className="mt-1 text-xs text-gray-600">
              If you’re selling product outside Sri Lanka, set different prices
              for buyer within the island (Sri Lanka) and a different price for
              those who purchase from other countries to ensure it covers the
              shipping cost.
            </p>
          </div>

          <Switch
            defaultSelected={watch(`pricing.isGlobalPricing`)}
            onChange={(e) => {
              setValue(`pricing.isGlobalPricing`, e);
            }}
          />
        </div>

        {watch(`pricing.isGlobalPricing`) && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2">
            <div className="w-full">
              <Input
                label="Global"
                Icon={() => (
                  <div>
                    <p className="rounded-md border bg-gray-100 px-1 text-[0.58rem] font-medium text-gray-600">
                      LKR
                    </p>
                  </div>
                )}
                placeholder="Enter product price."
                error={errors?.pricing?.global?.message as string}
                disabled={
                  !!(
                    watch("variation") &&
                    watch("variation").some(
                      (variation) => variation.variantSettings.price,
                    )
                  )
                }
                {...register("pricing.global")}
              />

              {watch("variation") &&
                watch("variation").some(
                  (variation) => variation.variantSettings.price,
                ) && (
                  <p className="mt-1 text-xs text-gray-600">
                    You can configure price in the variations table.
                  </p>
                )}
            </div>
          </div>
        )}
      </div>

      <div
        className={`mt-10 ${
          watch(`pricing.isVolumePricing`) &&
          "rounded-xl border bg-gray-50/50 p-3"
        }`}
      >
        <div className=" flex w-full flex-row items-center justify-between gap-3">
          <div className="">
            <h3 className="text-sm font-medium text-gray-800">
              Add volume pricing
            </h3>

            <p className="mt-1 text-xs text-gray-600">
              Offer a discount when buyers purchase more than one item at a
              time.
            </p>
          </div>

          <Switch
            defaultSelected={watch(`pricing.isVolumePricing`)}
            onChange={(e) => {
              if (getValues("pricing.volumePricing")!?.length <= 0) {
                volumePricingArray.append({
                  discount: "",
                  quantity: "",
                });
              }
              setValue(`pricing.isVolumePricing`, e);
            }}
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-10">
          <div className="flex w-max items-center justify-start gap-2 rounded-xl bg-skin-primary/5 p-3 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 text-skin-primary"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor">
                <path
                  d="M4 9.674C4 5.436 7.358 2 11.5 2C15.642 2 19 5.436 19 9.674a7.736 7.736 0 0 1-2.499 5.72c-.51.467-.889.814-1.157 1.066a14.926 14.926 0 0 0-.4.39l-.025.027l-.008.01c-.237.298-.288.375-.318.445c-.03.07-.053.16-.113.54c-.023.15-.026.406-.026 1.105v.03c0 .409 0 .762-.025 1.051c-.027.306-.087.61-.248.895a2.07 2.07 0 0 1-.75.767c-.278.165-.575.226-.874.254c-.283.026-.628.026-1.028.026h-.058c-.4 0-.745 0-1.028-.026c-.3-.028-.596-.09-.875-.254a2.07 2.07 0 0 1-.749-.767c-.16-.285-.22-.588-.248-.895c-.026-.29-.026-.642-.026-1.051v-.03c0-.699-.002-.955-.026-1.105c-.06-.38-.081-.47-.112-.54c-.03-.07-.081-.147-.318-.446l-.008-.01a14.896 14.896 0 0 0-.425-.417c-.268-.25-.647-.598-1.157-1.066A7.736 7.736 0 0 1 4 9.674Z"
                  opacity=".5"
                />
                <path d="M13.085 19.675h-3.17c.003.097.007.181.014.258c.018.21.05.285.071.323a.69.69 0 0 0 .25.256c.037.021.111.054.316.072c.214.02.496.021.934.021c.437 0 .72 0 .934-.02c.204-.02.279-.052.316-.073a.69.69 0 0 0 .25-.256c.02-.038.052-.114.07-.323c.007-.076.012-.161.015-.258ZM12.61 8.177c.307.224.378.66.159.973l-1.178 1.688h1.402a.68.68 0 0 1 .606.378a.711.711 0 0 1-.051.725L11.6 14.73a.672.672 0 0 1-.951.163a.708.708 0 0 1-.159-.973l1.178-1.688h-1.402a.68.68 0 0 1-.606-.379a.711.711 0 0 1 .051-.724l1.948-2.79a.672.672 0 0 1 .951-.163Z" />
              </g>
            </svg>

            <p className="text-sm text-gray-600">
              Buyers are more likely to purchase more of the same item if you
              add a Volume Pricing discount.
            </p>
          </div>
        </div>

        {watch(`pricing.isVolumePricing`) && (
          <>
            <div className="mt-5 flex flex-col items-start justify-start gap-10">
              {volumePricingArray.fields.map((field, index) => (
                <div key={field.id} className="w-full">
                  {index >= 0 && (
                    <div className="mb-2 flex items-center justify-between gap-5 md:hidden">
                      <div className="flex aspect-square items-center justify-center rounded-xl bg-gray-800 p-3 px-5 text-sm font-medium leading-none text-white">
                        {index + 1}
                      </div>
                      <div className="w-full border-t border-gray-300"></div>
                      {watch(`pricing.volumePricing.${index}.quantity`) &&
                        watch(`pricing.volumePricing.${index}.discount`) &&
                        !(
                          (errors?.pricing?.volumePricing &&
                            errors?.pricing?.volumePricing[index]?.quantity) ||
                          (errors?.pricing?.volumePricing &&
                            errors?.pricing?.volumePricing[index]?.discount)
                        ) && (
                          <p className="w-full max-w-max text-center text-xs text-gray-600 sm:text-sm">
                            Buy{" "}
                            {watch(`pricing.volumePricing.${index}.quantity`)}{" "}
                            and save{" "}
                            {watch(`pricing.volumePricing.${index}.discount`)}%
                          </p>
                        )}
                      <div className="w-full border-t border-gray-300"></div>
                      <Button
                        onClick={() => volumePricingArray.remove(index)}
                        variant={"danger"}
                        wrapperClass="aspect-square p-1 md:p-1"
                        className={"aspect-square p-1 md:p-1"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <g fill="currentColor">
                            <path d="M2.75 6.167c0-.46.345-.834.771-.834h2.665c.529-.015.996-.378 1.176-.916l.03-.095l.115-.372c.07-.228.131-.427.217-.605c.338-.702.964-1.189 1.687-1.314c.184-.031.377-.031.6-.031h3.478c.223 0 .417 0 .6.031c.723.125 1.35.612 1.687 1.314c.086.178.147.377.217.605l.115.372l.03.095c.18.538.74.902 1.27.916h2.57c.427 0 .772.373.772.834c0 .46-.345.833-.771.833H3.52c-.426 0-.771-.373-.771-.833Z" />
                            <path
                              d="M11.607 22h.787c2.707 0 4.06 0 4.941-.863c.88-.864.97-2.28 1.15-5.111l.26-4.081c.098-1.537.147-2.305-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.487-.392 1.255-.295 2.792l.26 4.08c.18 2.833.27 4.248 1.15 5.112C7.545 22 8.9 22 11.607 22Z"
                              opacity=".5"
                            />
                          </g>
                        </svg>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-full items-center justify-start gap-10">
                    <div className="flex w-full flex-col items-center justify-between gap-5 sm:flex-row md:max-w-md">
                      <Input
                        label="Buy"
                        placeholder="Enter quantity."
                        className="w-full"
                        {...register(`pricing.volumePricing.${index}.quantity`)}
                        onInput={(e) => {
                          let val = e?.currentTarget?.value;
                          clearErrors("pricing.volumePricing");
                          const quantities: string[] = [];
                          watch("pricing.volumePricing")!?.forEach((v) => {
                            if (quantities.includes(val)) {
                              setTimeout(() => {
                                setError(
                                  `pricing.volumePricing.${index}.quantity`,
                                  {
                                    message: `${val} is already taken.`,
                                  },
                                );
                              }, 100);
                            } else {
                              quantities.push(v?.quantity || "");
                            }
                          });
                        }}
                        onBlur={(e) => {
                          register(
                            `pricing.volumePricing.${index}.quantity`,
                          ).onBlur(e);

                          const quantities: string[] = [];
                          watch("pricing.volumePricing")!?.forEach((v) => {
                            if (quantities.includes(v.quantity || "")) {
                              setTimeout(() => {
                                setError(
                                  `pricing.volumePricing.${index}.quantity`,
                                  {
                                    message: `${v.quantity} is already taken.`,
                                  },
                                );
                              }, 100);
                            } else {
                              quantities.push(v.quantity || "");
                            }
                          });
                        }}
                        error={
                          ((!watch(`pricing.volumePricing.${index}.quantity`) &&
                            errors?.pricing?.volumePricing?.root?.message) ||
                            (errors?.pricing?.volumePricing &&
                              errors?.pricing?.volumePricing[index]?.quantity
                                ?.message)) as string
                        }
                      />
                      <Input
                        label="Save (%)"
                        placeholder="Enter savings."
                        className="w-full"
                        TopRightContainer={() => (
                          <>
                            {index > 0 && (
                              <Button
                                onClick={() => volumePricingArray.remove(index)}
                                className={
                                  "-mr-3 mt-5 hidden text-xs text-red-600 hover:text-red-500 md:block"
                                }
                                variant={"ghost"}
                              >
                                Remove
                              </Button>
                            )}
                          </>
                        )}
                        {...register(`pricing.volumePricing.${index}.discount`)}
                        onInput={(e) => {
                          let val = e?.currentTarget?.value;
                          clearErrors("pricing.volumePricing");
                          const discounts: string[] = [];
                          watch("pricing.volumePricing")!?.forEach((v) => {
                            if (discounts.includes(val)) {
                              setTimeout(() => {
                                setError(
                                  `pricing.volumePricing.${index}.discount`,
                                  {
                                    message: `${val}% is already taken.`,
                                  },
                                );
                              }, 100);
                            } else {
                              discounts.push(v?.discount || "");
                            }
                          });
                        }}
                        onBlur={(e) => {
                          register(
                            `pricing.volumePricing.${index}.discount`,
                          ).onBlur(e);

                          const discounts: string[] = [];
                          watch("pricing.volumePricing")!?.forEach((v) => {
                            if (discounts.includes(v?.discount || "")) {
                              setTimeout(() => {
                                setError(
                                  `pricing.volumePricing.${index}.discount`,
                                  {
                                    message: `${v.discount}% is already taken.`,
                                  },
                                );
                              }, 100);
                            } else {
                              discounts.push(v?.discount || "");
                            }
                          });
                        }}
                        error={
                          ((!watch(`pricing.volumePricing.${index}.discount`) &&
                            errors?.pricing?.volumePricing?.root?.message) ||
                            (errors?.pricing?.volumePricing &&
                              errors?.pricing?.volumePricing[index]?.discount
                                ?.message)) as string
                        }
                      />
                    </div>

                    {watch(`pricing.volumePricing.${index}.quantity`) &&
                      watch(`pricing.volumePricing.${index}.discount`) &&
                      !(
                        (errors?.pricing?.volumePricing &&
                          errors?.pricing?.volumePricing[index]?.quantity) ||
                        (errors?.pricing?.volumePricing &&
                          errors?.pricing?.volumePricing[index]?.discount)
                      ) && (
                        <p className="mt-5 hidden text-sm text-gray-600 md:block">
                          Buy {watch(`pricing.volumePricing.${index}.quantity`)}{" "}
                          and save{" "}
                          {watch(`pricing.volumePricing.${index}.discount`)}%
                        </p>
                      )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-2 mt-8 flex w-full items-center justify-center sm:mt-8 md:max-w-md">
              <Button
                onClick={() =>
                  volumePricingArray.append({
                    discount: "",
                    quantity: "",
                  })
                }
                variant={"ghost"}
                className={
                  "flex w-full items-center justify-center whitespace-nowrap text-skin-primary"
                }
              >
                Add More
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
});

PricingAndInventory.displayName = "PricingAndInventory";
export default PricingAndInventory;
