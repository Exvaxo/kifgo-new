"use client";
import ClickableRadio, {
  RadioOption,
} from "@/components/form-elements/ClickableRadio";
import CommaSeparatedInput from "@/components/form-elements/CommaSeparatedInput";
import { Option, Select, SelectGroup } from "@/components/form-elements/Select";
import debounce, { SearchFunction } from "@/utilities/debounce";
import { Fragment, forwardRef, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import CategorySearch, { CategoryOption } from "./CategorySearch";
import { loadCategorySuggestion } from "./_actions";
import BreadCrumb from "@/components/BreadCrumb";
import useGetCategoryAttrs from "@/app/client-apis/seller/category/useGetCategoryAttrs";
import Input from "@/components/form-elements/Input";
import Checkbox from "@/components/form-elements/Checkbox";
import { StockYouShopType } from "@/app/schema/StockYourShopSchema";

const Details = forwardRef<HTMLElement>(({}, ref) => {
  const {
    register,
    watch,
    setError,
    control,
    getValues,
    clearErrors,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<StockYouShopType>();

  const [selectedOption, setSelectedOption] = useState<CategoryOption>();
  const [options, setOptions] = useState<CategoryOption[]>([]);

  const initialLoadSelectedOption = async () => {
    const suggestions = await loadCategorySuggestion("");
    const [selected] = suggestions.filter(
      (suggestion) => suggestion.id === watch("details.categoryId"),
    );
    setSelectedOption(selected);
  };

  useEffect(() => {
    if (!selectedOption) {
      initialLoadSelectedOption();
    }
  }, [watch("details.categoryId")]);

  const handleSearchQuery: SearchFunction<string> = async (query) => {
    setIsCategorySearchLoading(true);
    try {
      const suggestions = (await loadCategorySuggestion(
        query.length <= 0 ? watch("about.title") : query,
      )) as CategoryOption[];
      setOptions(suggestions);
    } catch (error) {}
    setIsCategorySearchLoading(false);
  };

  const debouncedSearch = debounce<string>(handleSearchQuery, 300);

  const [isCategorySearchLoading, setIsCategorySearchLoading] = useState(false);

  const { data: attrs, isLoading: isAttrsLoading } = useGetCategoryAttrs(
    selectedOption?.id,
  );

  useEffect(() => {
    if (attrs) {
      const attributes = JSON.parse(
        JSON.stringify(
          attrs.map((attr) => ({ attributeId: attr.id, value: "" })),
        ),
      );
      const loadedAttrsIds = JSON.stringify(
        watch(`details.attributes`).map((attr) => attr.attributeId),
      );

      const fetchedAttrsIds = JSON.stringify(
        attributes.map((attr: any) => attr.attributeId),
      );

      if (loadedAttrsIds !== fetchedAttrsIds) {
        setValue("details.attributes", attributes);
      }
    }
  }, [attrs]);

  const attributesArray = useFieldArray({
    control: control,
    name: "details.attributes",
  });

  return (
    <section ref={ref} id="details" className="mb-10 w-full px-3 md:px-10">
      <h3 className="text-xl font-medium text-gray-800">Details</h3>
      <p className="text-xs text-gray-600">
        Share a few more specifics about your item to make it easier to find in
        search, and to help buyers know what to expect.
      </p>

      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-800">Core Details</h3>

        <p className="mt-1 text-xs text-gray-600">
          These core details help kifgo understand the most basic aspects of
          your listing, as well as how it meets our policies.
        </p>
      </div>

      <div className="mt-10">
        <ClickableRadio
          label="What type of item is it?"
          value={watch("details.type")}
          onChange={(type: string) => {
            setValue("details.type", type);
          }}
        >
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <RadioOption
              value="physical"
              className={`rounded-xl focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skin-primary focus-visible:ring-offset-1 focus-visible:ring-offset-white`}
              Body={({ checked }) => (
                <div
                  className={`relative w-full overflow-hidden rounded-xl border-2 p-5 ${
                    checked ? "border-skin-primary" : "border-gray-100"
                  }`}
                >
                  <div className="relative z-20">
                    <div
                      className={`w-max rounded-xl p-3 ${
                        checked
                          ? "border-skin-primary bg-skin-primary/10 text-skin-primary"
                          : "border-transparent bg-gray-100 text-gray-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16"
                        viewBox="0 0 24 24"
                      >
                        <g fill="currentColor">
                          <path d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073a3.196 3.196 0 0 0-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709l2 1.05Z" />
                          <path
                            d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641Z"
                            opacity=".7"
                          />
                          <path
                            d="M21.403 7.14a3.153 3.153 0 0 0-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802Z"
                            opacity=".5"
                          />
                          <path d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011c.137.155.257.32.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3.062 3.062 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824a3.15 3.15 0 0 1 .362-.498l9.04 4.52l3.386-1.693l-9.063-4.985Z" />
                        </g>
                      </svg>
                    </div>

                    <h3 className="mt-5 text-base font-medium text-gray-800">
                      Physical Item
                    </h3>
                    <p className="text-sm text-gray-600">
                      A tangible item that you will ship to buyers.
                    </p>
                  </div>

                  <div className="absolute bottom-0 right-0 -mb-10 -mr-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-64 w-64 ${
                        checked ? "text-skin-primary/10" : "text-gray-100"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <g fill="currentColor">
                        <path d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073a3.196 3.196 0 0 0-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709l2 1.05Z" />
                        <path
                          d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641Z"
                          opacity=".7"
                        />
                        <path
                          d="M21.403 7.14a3.153 3.153 0 0 0-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802Z"
                          opacity=".5"
                        />
                        <path d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011c.137.155.257.32.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3.062 3.062 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824a3.15 3.15 0 0 1 .362-.498l9.04 4.52l3.386-1.693l-9.063-4.985Z" />
                      </g>
                    </svg>
                  </div>
                </div>
              )}
            />

            <RadioOption
              value="digital"
              disabled
              className={`pointer-events-none cursor-not-allowed rounded-xl focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skin-primary focus-visible:ring-offset-1 focus-visible:ring-offset-white`}
              Body={({ checked }) => (
                <div
                  className={`relative w-full overflow-hidden rounded-xl border-2 p-5 ${
                    checked ? "border-skin-primary" : "border-gray-100"
                  }`}
                >
                  <div className="relative z-20">
                    <div
                      className={`w-max rounded-xl p-3 ${
                        checked
                          ? "border-skin-primary bg-skin-primary/10 text-skin-primary"
                          : "border-transparent bg-gray-100 text-gray-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16"
                        viewBox="0 0 24 24"
                      >
                        <g fill="currentColor">
                          <path
                            d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
                            opacity=".5"
                          />
                          <path d="M3.465 20.535C4.929 22 7.286 22 12 22c4.715 0 7.072 0 8.536-1.465C21.893 19.178 21.993 17.055 22 13h-3.16c-.905 0-1.358 0-1.755.183c-.398.183-.693.527-1.282 1.214l-.605.706c-.59.687-.884 1.031-1.282 1.214c-.398.183-.85.183-1.755.183h-.321c-.905 0-1.358 0-1.756-.183c-.397-.183-.692-.527-1.281-1.214l-.606-.706c-.589-.687-.883-1.031-1.281-1.214C6.518 13 6.066 13 5.16 13H2c.007 4.055.107 6.178 1.465 7.535Zm9.065-9.205a.75.75 0 0 1-1.06 0l-3.3-3.3a.75.75 0 1 1 1.06-1.06l2.02 2.02V2h1.5v6.99l2.02-2.02a.75.75 0 1 1 1.06 1.06l-3.3 3.3Z" />
                        </g>
                      </svg>
                    </div>

                    <h3 className="mt-5 text-base font-medium text-gray-800">
                      Digital file(s)
                    </h3>
                    <p className="text-sm text-gray-600">
                      A digital file that buyers Will download.
                    </p>
                  </div>

                  <div className="absolute bottom-0 right-0 -mb-10 -mr-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-64 w-64 ${
                        checked ? "text-skin-primary/10" : "text-gray-100"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <g fill="currentColor">
                        <path
                          d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
                          opacity=".5"
                        />
                        <path d="M3.465 20.535C4.929 22 7.286 22 12 22c4.715 0 7.072 0 8.536-1.465C21.893 19.178 21.993 17.055 22 13h-3.16c-.905 0-1.358 0-1.755.183c-.398.183-.693.527-1.282 1.214l-.605.706c-.59.687-.884 1.031-1.282 1.214c-.398.183-.85.183-1.755.183h-.321c-.905 0-1.358 0-1.756-.183c-.397-.183-.692-.527-1.281-1.214l-.606-.706c-.589-.687-.883-1.031-1.281-1.214C6.518 13 6.066 13 5.16 13H2c.007 4.055.107 6.178 1.465 7.535Zm9.065-9.205a.75.75 0 0 1-1.06 0l-3.3-3.3a.75.75 0 1 1 1.06-1.06l2.02 2.02V2h1.5v6.99l2.02-2.02a.75.75 0 1 1 1.06 1.06l-3.3 3.3Z" />
                      </g>
                    </svg>
                  </div>
                </div>
              )}
            />
          </div>
        </ClickableRadio>
      </div>

      <div className="relative mt-10 flex flex-col items-start justify-start gap-5 md:flex-row">
        <div className="w-full">
          <Select
            value={watch("details.whoMadeIt")}
            onValueChange={(v) => {
              setValue("details.whoMadeIt", v);
              trigger("details.whoMadeIt");
            }}
            placeholder="Select an option"
            label="Who made it?"
            error={errors.details?.whoMadeIt?.message as string}
          >
            <Option value="i-made-it">I made it</Option>
            <Option value="a-member-of-my-shop">A member of my shop</Option>
            <Option value="another-company-or-person">
              Another Company or person
            </Option>
          </Select>
        </div>

        <div className="w-full">
          <Select
            value={watch("details.whatIsIt")}
            onValueChange={(v) => {
              setValue("details.whatIsIt", v);
              trigger("details.whatIsIt");
            }}
            error={errors.details?.whatIsIt?.message as string}
            placeholder="Select an option"
            label="What is it?"
          >
            <Option value="a-finished-product">A finished product</Option>
            <Option value="a-supply-or-tool-to-make-things">
              A supply or tool to make things
            </Option>
          </Select>
        </div>

        <div className="w-full">
          <Select
            value={watch("details.whenDidYouMakeIt")}
            onValueChange={(v) => {
              setValue("details.whenDidYouMakeIt", v);
              trigger("details.whenDidYouMakeIt");
            }}
            error={errors.details?.whenDidYouMakeIt?.message as string}
            placeholder="Select an option"
            label="When did you make it?"
          >
            <SelectGroup label="Not yet made">
              <Option level={2} value="made-to-order">
                Made to order
              </Option>
            </SelectGroup>
            <SelectGroup label="Recently">
              <Option level={2} value="2020-2023">
                2020 to 2023
              </Option>
              <Option level={2} value="2010-2019">
                2010 to 2019
              </Option>
              <Option level={2} value="2004-2009">
                2004 to 2009
              </Option>
            </SelectGroup>
            <SelectGroup label="Vintage">
              <Option level={2} value="before-2004">
                Before 2004
              </Option>
              <Option level={2} value="2000-2003">
                2000 to 2003
              </Option>
              <Option level={2} value="1990s">
                1990s
              </Option>
              <Option level={2} value="1980s">
                1980s
              </Option>
              <Option level={2} value="1970s">
                1970s
              </Option>
              <Option level={2} value="1960s">
                1960s
              </Option>
              <Option level={2} value="1950s">
                1950s
              </Option>
              <Option level={2} value="1940s">
                1940s
              </Option>
              <Option level={2} value="1930s">
                1930s
              </Option>
              <Option level={2} value="1920s">
                1920s
              </Option>
              <Option level={2} value="1910s">
                1910s
              </Option>
              <Option level={2} value="1900-1909">
                1900 to 1909
              </Option>
              <Option level={2} value="1800s">
                1800s
              </Option>
              <Option level={2} value="1700s">
                1700s
              </Option>
              <Option level={2} value="before-1700">
                Before 1700
              </Option>
            </SelectGroup>
          </Select>
        </div>
      </div>

      <div className="mt-10">
        <h3
          className={`inline-flex items-center text-sm font-medium ${
            errors.details?.categoryId?.message
              ? "text-red-600"
              : "text-gray-800"
          }`}
        >
          {errors.details?.categoryId?.message && (
            <svg className="mr-2 h-5 w-5 text-red-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          Category
        </h3>
        <CategorySearch
          className="mt-1"
          isLoading={isCategorySearchLoading}
          onChange={(event) => {
            debouncedSearch(event.target.value);
          }}
          displayValue={(option) => option.title}
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={(opt) => {
            setSelectedOption(opt);
            //@ts-ignore
            setValue("details.categoryId", opt?.id);
            clearErrors("details.categoryId");
          }}
        />

        {errors.details?.categoryId?.message && (
          <p className="mt-1 text-xs text-red-600">Category is required.</p>
        )}

        {selectedOption && (
          <div className="mt-3 flex flex-wrap items-center justify-start gap-3">
            {selectedOption.path.map((pth, idx) => (
              <BreadCrumb
                key={idx}
                start={idx === 0}
                className="bg-skin-primary-light"
                end={idx === selectedOption.path.length - 1}
              >
                {pth}
              </BreadCrumb>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h3 className="mb-3 text-sm font-medium text-gray-800">Attributes</h3>
        <div className="space-y-8">
          {!isAttrsLoading &&
            attrs &&
            attributesArray.fields.map((field, idx) => {
              const attribute = attrs.find(
                (attr) =>
                  attr.id === watch(`details.attributes.${idx}.attributeId`),
              );

              return (
                <Fragment key={field.id}>
                  {attribute?.displayAs === "INPUT" && (
                    <div className="w-full">
                      <div className="flex w-full flex-col items-center justify-start gap-5 md:max-w-sm md:flex-row">
                        <Input
                          label={attribute.name}
                          placeholder={`Enter ${attribute.name.toLowerCase()}`}
                          {...register(`details.attributes.${idx}.value`)}
                          disabled={
                            !!(
                              watch("variation") &&
                              watch("variation").some((variation) =>
                                variation.combination.some(
                                  (variant) =>
                                    variant.variant.toLowerCase() ===
                                    attribute.name.toLowerCase(),
                                ),
                              )
                            )
                          }
                          error={
                            errors.details &&
                            errors.details?.attributes &&
                            errors.details?.attributes[idx] &&
                            errors.details?.attributes[idx]?.value?.message
                          }
                        />

                        {attribute.Units && attribute.Units.length > 0 && (
                          <Select
                            label={"Unit"}
                            placeholder={`Select an option`}
                            value={
                              watch(`details.attributes.${idx}.unitId`) ||
                              undefined
                            }
                            onValueChange={(val) => {
                              setValue(`details.attributes.${idx}.unitId`, val);
                            }}
                            disabled={
                              !!(
                                watch("variation") &&
                                watch("variation").some((variation) =>
                                  variation.combination.some(
                                    (variant) =>
                                      variant.variant.toLowerCase() ===
                                      attribute.name.toLowerCase(),
                                  ),
                                )
                              )
                            }
                          >
                            {attribute.Units.map((option) => (
                              <Option value={option.id} key={option.id}>
                                {option.name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </div>

                      {watch("variation") &&
                        watch("variation").some((variation) =>
                          variation.combination.some(
                            (variant) =>
                              variant.variant.toLowerCase() ===
                              attribute.name.toLowerCase(),
                          ),
                        ) && (
                          <p className="mt-1 text-xs text-gray-600">
                            You can configure {attribute.name.toLowerCase()} in
                            variation table.
                          </p>
                        )}
                    </div>
                  )}

                  {attribute?.displayAs === "SELECT" && (
                    <div className="w-full">
                      <Select
                        label={attribute.name}
                        placeholder={`Select an option`}
                        value={watch(`details.attributes.${idx}.value`)}
                        onValueChange={(val) => {
                          setValue(`details.attributes.${idx}.value`, val);
                        }}
                        disabled={
                          !!(
                            watch("variation") &&
                            watch("variation").some((variation) =>
                              variation.combination.some(
                                (variant) =>
                                  variant.variant.toLowerCase() ===
                                  attribute.name.toLowerCase(),
                              ),
                            )
                          )
                        }
                        error={
                          errors.details &&
                          errors.details?.attributes &&
                          errors.details?.attributes[idx] &&
                          errors.details?.attributes[idx]?.value?.message
                        }
                      >
                        {attribute?.options.map((option) => (
                          <Option value={option.id} key={option.id}>
                            {option.name}
                          </Option>
                        ))}
                      </Select>

                      {watch("variation") &&
                        watch("variation").some((variation) =>
                          variation.combination.some(
                            (variant) =>
                              variant.variant.toLowerCase() ===
                              attribute.name.toLowerCase(),
                          ),
                        ) && (
                          <p className="mt-1 text-xs text-gray-600">
                            You can configure {attribute.name.toLowerCase()} in
                            variation table.
                          </p>
                        )}
                    </div>
                  )}

                  {attribute?.displayAs === "CHECKBOX" && (
                    <div className="space-y-2">
                      <label className="mb-1 block text-xs font-medium text-gray-800 sm:text-sm">
                        {attribute.name}
                      </label>
                      {attribute.options.map((option) => (
                        <Checkbox
                          key={option.id}
                          label={option.name}
                          name={option.name}
                          disabled={
                            !!(
                              watch("variation") &&
                              watch("variation").some((variation) =>
                                variation.combination.some(
                                  (variant) =>
                                    variant.variant.toLowerCase() ===
                                    attribute.name.toLowerCase(),
                                ),
                              )
                            )
                          }
                          value={
                            watch(`details.attributes.${idx}.value`)
                              .split(",")
                              .includes(option.id)
                              ? "t"
                              : ""
                          }
                          onChange={(val) => {
                            let arr = watch(
                              `details.attributes.${idx}.value`,
                            ).split(",");

                            if (val && !arr.includes(option.id)) {
                              arr.push(option.id);
                            }

                            if (!val && arr.includes(option.id)) {
                              arr = arr.filter((v) => v !== option.id);
                            }

                            setValue(
                              `details.attributes.${idx}.value`,
                              arr.join(","),
                            );
                          }}
                        />
                      ))}

                      {watch("variation") &&
                        watch("variation").some((variation) =>
                          variation.combination.some(
                            (variant) =>
                              variant.variant.toLowerCase() ===
                              attribute.name.toLowerCase(),
                          ),
                        ) && (
                          <p className="mt-1 text-xs text-gray-600">
                            You can configure {attribute.name.toLowerCase()} in
                            variation table.
                          </p>
                        )}
                    </div>
                  )}
                </Fragment>
              );
            })}

          {(!attrs || (!isAttrsLoading && attrs.length <= 0)) && (
            <div>
              <p className="text-xs italic text-gray-700">
                Select a category in order to load attributes.
              </p>
            </div>
          )}

          {isAttrsLoading && (
            <div className="animate-pulse space-y-8">
              <div className="flex w-full flex-col items-center justify-start gap-5 md:max-w-sm md:flex-row">
                <FieldSkeleton />
                <FieldSkeleton />
              </div>
              <FieldSkeleton />
              <div className="max-w-xs">
                <CheckboxSkeleton />
              </div>
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <CommaSeparatedInput
          control={control}
          name="details.tags"
          label="Tags"
          placeholder="Enter tags."
          SubLabel={() => (
            <p className="mt-1 text-xs text-gray-600">
              Add up to 13 tags to help people search for your listings.
            </p>
          )}
        />
        <p className="mt-2 text-xs italic text-gray-600">
          Press{" "}
          <span className="rounded-md bg-gray-200 px-1 py-0.5 font-semibold not-italic leading-none text-gray-800">
            ENTER
          </span>{" "}
          or{" "}
          <span className="rounded-md bg-gray-200 px-2 py-0.5 font-semibold not-italic leading-none text-gray-800">
            ,
          </span>{" "}
          to separate.
        </p>
      </div>

      <div className="mt-10">
        <CommaSeparatedInput
          control={control}
          name="details.materials"
          label="Materials"
          placeholder="Enter materials."
          SubLabel={() => (
            <p className="mt-1 text-xs text-gray-600">
              Buyers value transparency – tell them what is used in making of
              the product.
            </p>
          )}
        />
        <p className="mt-2 text-xs italic text-gray-600">
          Press{" "}
          <span className="rounded-md bg-gray-200 px-1 py-0.5 font-semibold not-italic leading-none text-gray-800">
            ENTER
          </span>{" "}
          or{" "}
          <span className="rounded-md bg-gray-200 px-2 py-0.5 font-semibold not-italic leading-none text-gray-800">
            ,
          </span>{" "}
          to separate.
        </p>
      </div>
    </section>
  );
});

const FieldSkeleton = () => {
  return (
    <div className="w-full">
      <div className="h-5 w-32 rounded-md bg-gray-400"></div>
      <div className="mt-2 h-10 w-full rounded-xl bg-gray-400"></div>
    </div>
  );
};

const CheckboxSkeleton = () => {
  return (
    <div className="w-full">
      <div className="h-5 w-32 rounded-md bg-gray-400"></div>

      <div className="mt-2 flex w-full items-center justify-start gap-3">
        <div className="h-5 w-5 rounded-md bg-gray-400"></div>
        <div className="h-5 w-full rounded-md bg-gray-400"></div>
      </div>
      <div className="mt-2 flex w-full items-center justify-start gap-3">
        <div className="h-5 w-5 rounded-md bg-gray-400"></div>
        <div className="h-5 w-full rounded-md bg-gray-400"></div>
      </div>
      <div className="mt-2 flex w-full items-center justify-start gap-3">
        <div className="h-5 w-5 rounded-md bg-gray-400"></div>
        <div className="h-5 w-full rounded-md bg-gray-400"></div>
      </div>
      <div className="mt-2 flex w-full items-center justify-start gap-3">
        <div className="h-5 w-5 rounded-md bg-gray-400"></div>
        <div className="h-5 w-full rounded-md bg-gray-400"></div>
      </div>
    </div>
  );
};

Details.displayName = "Details";
export default Details;
