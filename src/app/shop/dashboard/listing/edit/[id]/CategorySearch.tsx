"use client";
import useGetRootCategories, {
  LoadCategory,
} from "@/app/client-apis/seller/category/useGetRootCategories";
import useGetSubCategories from "@/app/client-apis/seller/category/useGetSubCategories";
import { StockYouShopType } from "@/app/schema/StockYourShopSchema";
import BreadCrumb from "@/components/BreadCrumb";
import { BasicButton, Button } from "@/components/Button";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import { Option, Select } from "@/components/form-elements/Select";
import { cn } from "@/utilities/cn";
import isValid from "@/utilities/isValid";
import { Combobox, Transition } from "@headlessui/react";
import React, {
  ComponentProps,
  Fragment,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { loadCategorySuggestion } from "./_actions";

export type CategoryOption = {
  id: string;
  title: string;
  path: string[];
};

interface ICategorySearch extends ComponentProps<"div"> {
  isLoading?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayValue: (item: CategoryOption) => string;
  options: CategoryOption[];
  selectedOption: CategoryOption | undefined;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<CategoryOption | undefined>
  >;
}

const CategorySearch = ({
  onChange,
  displayValue,
  setSelectedOption,
  selectedOption,
  className,
}: ICategorySearch) => {
  const {
    register,
    watch,
    setError,
    control,
    getValues,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<StockYouShopType>();

  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const [options, setOptions] = useState<CategoryOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSuggestions = async () => {
    setIsLoading(true);
    const suggestions = await loadCategorySuggestion(deferredQuery);
    setOptions(suggestions);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSuggestions();
  }, [deferredQuery]);

  return (
    <>
      <div className={cn(`relative z-[99]`, className)}>
        <Combobox
          value={selectedOption}
          onChange={(val) => {
            setSelectedOption(val);
            setValue("details.categoryId", val.id);
          }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" h-6 w-6 text-gray-600"
                viewBox="0 0 24 24"
              >
                <defs>
                  <mask id="solarMinimalisticMagniferLineDuotone0">
                    <g fill="none" strokeWidth="1.5">
                      <circle cx="11.5" cy="11.5" r="9.5" stroke="gray" />
                      <path
                        stroke="#fff"
                        strokeLinecap="round"
                        d="m20 20l2 2"
                      />
                    </g>
                  </mask>
                </defs>
                <path
                  fill="currentColor"
                  d="M0 0h24v24H0z"
                  mask="url(#solarMinimalisticMagniferLineDuotone0)"
                />
              </svg>
            </div>
            <Combobox.Input
              placeholder="Enter to search"
              className={cn(
                `block w-full appearance-none rounded-xl border border-gray-300 bg-transparent p-3 pl-12 text-sm transition duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:text-gray-600`
              )}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              displayValue={() => query}
            />
          </div>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
          >
            <Combobox.Options
              className={
                "absolute inset-x-0 top-3 cursor-pointer rounded-xl border bg-gradient-to-br from-gray-800 to-gray-950 shadow-md"
              }
            >
              {!isLoading ? (
                <div className="flex w-full flex-col divide-y divide-gray-700">
                  {options &&
                    options.map((option) => (
                      <div key={option.id} className="p-2">
                        <Combobox.Option
                          className={
                            "rounded-lg p-3 data-[headlessui-state=active]:bg-skin-primary data-[headlessui-state=selected]:bg-skin-primary"
                          }
                          value={option}
                        >
                          <div className="w-full">
                            <h3 className="text-sm font-semibold text-white">
                              {option.title}
                            </h3>

                            <div className="mt-3 flex flex-wrap items-center justify-start gap-3">
                              {option.path.map((pth, idx) => (
                                <BreadCrumb
                                  key={idx}
                                  start={idx === 0}
                                  end={idx === option.path.length - 1}
                                >
                                  {pth}
                                </BreadCrumb>
                              ))}
                            </div>
                          </div>
                        </Combobox.Option>
                      </div>
                    ))}
                </div>
              ) : (
                <Loading />
              )}

              <div
                className={`flex items-center justify-start gap-1 ${
                  options.length > 0 && "border-t"
                } border-gray-700 p-4`}
              >
                <p className="text-xs text-gray-300">
                  If you don&apos;t see your item&apos;s category, try being
                  more specific.
                </p>
                <BasicButton
                  onClick={() => {
                    setOpen(true);
                  }}
                  variant={"ghost"}
                  className={
                    "flex items-center justify-center whitespace-nowrap text-xs font-medium text-gray-200 hover:text-white hover:underline"
                  }
                >
                  You can also add it manually
                </BasicButton>
              </div>
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>

      <CustomCategorySelect
        open={open}
        setOpen={setOpen}
        setSelectedOption={setSelectedOption}
      />
    </>
  );
};

const Skeleton = () => {
  return (
    <div className="animate-pulse p-2">
      <div className="rounded-lg bg-gray-700/60 p-3">
        <div className="h-5 w-72 rounded-md bg-gray-600"></div>
        <div className="mt-3 flex items-center justify-start gap-3">
          <BreadCrumb start className="bg-gray-600">
            <p className="opacity-0">lorem ipsum</p>
          </BreadCrumb>
          <BreadCrumb className="bg-gray-600">
            <p className="opacity-0">lorem ipsum dolor</p>
          </BreadCrumb>
          <BreadCrumb end className="bg-gray-600">
            <p className="opacity-0">lorem ipsum</p>
          </BreadCrumb>
        </div>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex w-full flex-col divide-y divide-gray-700">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

const CustomCategorySelect = ({
  setSelectedOption,
  open,
  setOpen,
}: {
  setSelectedOption: React.Dispatch<
    React.SetStateAction<CategoryOption | undefined>
  >;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loadCategories, setSelectedLoadCategories] = useState<{
    [x: string]: { id: string; categories: LoadCategory[] };
  }>({});

  const { data: rootCategories, isPending: isRootCategoriesLoading } =
    useGetRootCategories();

  const { mutateAsync: getSubCategories, isPending: isSubcategoryLoading } =
    useGetSubCategories();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [error, setError] = useState("");

  return (
    <Modal className="max-w-6xl p-0 sm:p-0" open={open} onOpenChange={setOpen}>
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
            Custom Category Selection
          </Modal.Title>
          <Modal.Description className="mt-1 text-xs text-gray-600">
            List all the options you offer. Buyers will see them in the order
            they are here.
          </Modal.Description>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (selectedCategories.length < 2) {
            setError("Please select atleast one sub category.");
          }

          if (!error) {
            const finalSelectedCategory =
              selectedCategories[selectedCategories.length - 1];

            const categories = Object.entries(loadCategories);
            const category = categories[categories.length - 2][1].categories;

            const categoryDetail = category.find(
              (cat) => cat.id === finalSelectedCategory
            ) as CategoryOption;

            setSelectedOption(categoryDetail);
            setOpen(false);
          }
        }}
        className="w-full p-4 pt-0 sm:p-6 sm:pt-0"
      >
        <div className="mt-5 flex w-full flex-wrap items-end justify-start gap-5">
          <Select
            isLoading={isRootCategoriesLoading}
            className="w-full md:max-w-xs"
            placeholderClass="md:max-w-xs"
            label="Category"
            placeholder="Select Category"
            onValueChange={async (value) => {
              if (error) {
                setError("");
              }
              if (isValid(value)) {
                const sc = { [0]: { ...loadCategories[0] } };

                sc[0] = { id: value, categories: [] };
                setSelectedLoadCategories((pv) => {
                  return sc;
                });

                const categories = await getSubCategories(value);

                sc[0] = { id: value, categories };
                setSelectedLoadCategories((pv) => {
                  return sc;
                });

                setSelectedCategories((pv) => {
                  const temp = [...pv];
                  temp[0] = value;
                  return temp;
                });
              }
            }}
            value={loadCategories[0]?.id || undefined}
            error={error}
          >
            {rootCategories &&
              rootCategories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.title}
                </Option>
              ))}
          </Select>

          {Object.entries(loadCategories).map(([key, val], idx) => (
            <Fragment key={key}>
              {val && val.categories.length > 0 && (
                <Select
                  isLoading={
                    isSubcategoryLoading &&
                    Object.keys(loadCategories).length <= 1
                  }
                  className="w-full md:max-w-xs"
                  placeholderClass="md:max-w-xs"
                  placeholder="Select Sub Category"
                  onValueChange={async (value) => {
                    if (error) {
                      setError("");
                    }
                    if (isValid(value)) {
                      const sc = {} as typeof loadCategories;

                      for (let i = 0; i <= idx + 1; i++) {
                        sc[i] = { ...loadCategories[i] };
                      }

                      sc[idx + 1] = { id: value, categories: [] };

                      setSelectedLoadCategories((pv) => {
                        return sc;
                      });

                      const categories = await getSubCategories(value);

                      sc[idx + 1] = { id: value, categories };

                      setSelectedLoadCategories((pv) => {
                        return sc;
                      });

                      setSelectedCategories((pv) => {
                        const temp = [...pv];
                        temp[idx + 1] = value;
                        return temp;
                      });
                    }
                  }}
                  value={loadCategories[idx + 1]?.id || undefined}
                >
                  {val &&
                    val.categories.map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.title}
                      </Option>
                    ))}
                </Select>
              )}
            </Fragment>
          ))}

          {isSubcategoryLoading && (
            <div className="mb-4 flex w-full items-center justify-center md:w-min">
              <Spinner className="h-4 text-gray-600" />
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col items-end justify-end gap-5 border-t pt-5 sm:flex-row sm:items-center sm:justify-end">
          <Button
            onClick={() => {
              setOpen(false);
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
            Select
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CategorySearch;
