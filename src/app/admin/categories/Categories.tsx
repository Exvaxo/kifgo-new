"use client";
import { NestedCategory } from "@/app/api/category/category.service";
import { BasicButton, Button } from "@/components/Button";
import Spinner from "@/components/Spinner";
import Input from "@/components/form-elements/Input";
import { buildCategoryTree } from "@/utilities/buildTree";
import { cn } from "@/utilities/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { Attribute, Category } from "@prisma/client";
import React, {
  ComponentProps,
  Fragment,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  createCategory,
  deleteCategoryDb,
  updateCategoryName,
} from "./_actions";
import { toast } from "react-toastify";
import Success from "@/components/alerts/Success";
import Error from "@/components/alerts/Error";
import Modal from "@/components/Modal";
import useFetchAttributes from "@/app/client-apis/admin/attribute/useFetchAttributes";
import Checkbox from "@/components/form-elements/Checkbox";
import debounce from "@/utilities/debounce";
import arrayOf from "@/utilities/arrayOf";
import useUpdateAttribute from "@/app/client-apis/admin/category/useUpdateAttribute";

const CategorySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Category must be atleast 3 characters long."),
});

type CategoryInput = z.infer<typeof CategorySchema>;

interface ICategories {
  categories: Category[] | undefined;
}

const Categories = ({ categories }: ICategories) => {
  const [_categories, set_categories] = useState(categories ? categories : []);

  useEffect(() => {
    set_categories(categories || []);
  }, [categories]);

  const addAnotherCategory = async (id: string | null) => {
    const updatedCategories: Category[] = JSON.parse(
      JSON.stringify(_categories),
    );

    const created_category = await createCategory(id);

    if (created_category) {
      updatedCategories.push({
        id: created_category.id,
        parentId: id,
        title: "",
        description: "",
        tags: [],
        attributeIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      set_categories(() => updatedCategories);
    }
  };

  const _deleteCategory = async (id: string, categories: Category[]) => {
    for (let i = categories.length - 1; i >= 0; i--) {
      const category = categories[i];
      if (category && category.id === id) {
        // Delete the category from the array.
        try {
          await deleteCategoryDb(category.id);
          categories.splice(i, 1);
        } catch (error) {
          toast(
            <Error
              id="error_delete_cat"
              title="Failed"
              body={`${category.title} is in use, so cannot be deleted.`}
            />,
          );
          break;
        }
      } else if (category && category.parentId === id) {
        // If the current category is a child, recursively delete it.
        _deleteCategory(category.id, categories);
      }
    }
  };

  const deleteCategory = async (id: string) => {
    const updatedArray: Category[] = JSON.parse(JSON.stringify(_categories));
    await _deleteCategory(id, updatedArray);
    set_categories(() => updatedArray);
  };

  const [categoryToChooseAttribution, setCategoryToChooseAttribution] =
    useState<string | null>(null);

  const [attributeSearchTerm, setAttributeSearchTerm] = useState("");

  const { data: attributes, isLoading: isAttributesLoading } =
    useFetchAttributes(attributeSearchTerm);

  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  const debouncedAttributeSearch = debounce<string>((q) => {
    setAttributeSearchTerm(q);
  }, 1000);

  useEffect(() => {
    if (categoryToChooseAttribution && categories) {
      setSelectedAttributes(
        (pv) =>
          categories?.find((cat) => cat.id === categoryToChooseAttribution)
            ?.attributeIds || [],
      );
    }
  }, [categoryToChooseAttribution, categories]);

  const { mutateAsync: updateAttributes, isLoading: isUpdateAttributeLoading } =
    useUpdateAttribute();

  return (
    <>
      <Modal
        open={!!categoryToChooseAttribution}
        onOpenChange={(open) =>
          setCategoryToChooseAttribution(
            !open ? null : categoryToChooseAttribution,
          )
        }
        className="max-w-screen-lg"
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
              Attributes for{" "}
              {
                categories?.find(
                  (cat) => cat.id === categoryToChooseAttribution,
                )?.title
              }
            </Modal.Title>
            <Modal.Description className="mt-1 text-xs text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              ipsam quibusdam ipsa quo illo debitis.
            </Modal.Description>
          </div>
        </div>

        <div className="w-full p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="w-full">
            <div className="flex w-full flex-col justify-between pt-1 md:flex-row md:items-center">
              <Input
                placeholder="Search..."
                LeadingIcon={() => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3 h-6 w-6 text-gray-600"
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
                )}
                inputClass="pl-12"
                className="mt-3 w-full max-w-md md:mt-0"
                onChange={(e) => debouncedAttributeSearch(e.target.value)}
              />
            </div>

            {!isAttributesLoading && attributes && attributes.length > 0 && (
              <div className="mt-5 grid max-h-96 grid-cols-1 gap-10 overflow-auto p-2 sm:grid-cols-2 md:grid-cols-3">
                {attributes.map((attr) => (
                  <div key={attr.id}>
                    <Checkbox
                      key={attr.id}
                      name={`attr_value_${setCategoryToChooseAttribution}`}
                      value={selectedAttributes?.includes(attr.id) ? "t" : ""}
                      onChange={(value) => {
                        console.log(value);
                        let attrs: string[] =
                          JSON.parse(JSON.stringify(selectedAttributes)) || [];
                        if (attrs?.includes(attr.id)) {
                          attrs = attrs.filter((val) => val !== attr.id);
                        } else {
                          attrs?.push(attr.id);
                        }
                        setSelectedAttributes(() => attrs);
                      }}
                      labelClass="whitespace-nowrap"
                      label={attr.name}
                    />
                    <p className="ml-7 mt-1 text-xs text-gray-600">
                      {attr.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {isAttributesLoading && (
              <div className="mt-5 grid max-h-96 grid-cols-1 gap-10 overflow-auto p-2 sm:grid-cols-2 md:grid-cols-3">
                {arrayOf(15).map((s, idx) => (
                  <AttributeSkeleton key={idx} />
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col items-end justify-end gap-5 border-t pt-5 sm:flex-row sm:items-center sm:justify-end">
            <Button
              onClick={() => setCategoryToChooseAttribution(null)}
              wrapperClass="w-full sm:w-min"
              className={"flex w-full items-center justify-center sm:w-auto"}
              variant={"secondary"}
            >
              Cancel
            </Button>

            <Button
              isSpinning={isUpdateAttributeLoading}
              onClick={async () => {
                await updateAttributes({
                  id: categoryToChooseAttribution,
                  attributes: selectedAttributes,
                });
                setSelectedAttributes([]);
                setCategoryToChooseAttribution(null);
              }}
              wrapperClass="w-full sm:w-min"
              className={"flex w-full items-center justify-center sm:w-auto"}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <div className="flex flex-col divide-y overflow-auto overflow-x-auto">
        {buildCategoryTree(_categories).map((category) => (
          <div key={category.id} className="w-full py-10">
            <Category
              category={category}
              level={0}
              addAnotherCategory={addAnotherCategory}
              deleteCategory={deleteCategory}
              setCategoryToChooseAttribution={setCategoryToChooseAttribution}
            />
          </div>
        ))}
      </div>
    </>
  );
};

interface ICategory {
  level: number;
  category: NestedCategory;
  addAnotherCategory: (id: string | null) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  setCategoryToChooseAttribution: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

const Category = ({
  category,
  level,
  addAnotherCategory,
  deleteCategory,
  setCategoryToChooseAttribution,
}: ICategory) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
    trigger,
    reset,
    control,
  } = useForm<CategoryInput>({
    mode: "onTouched",
    defaultValues: {},
    resolver: zodResolver(CategorySchema),
  });

  useEffect(() => {
    if (category) {
      setTimeout(() => {
        reset({
          title: category.title,
        });
      }, 100);
    }
  }, [category]);

  return (
    <div className="w-full">
      <CategoryEl
        id={category.id}
        parentId={category.parentId}
        removeCategory={!category.parentId}
        style={{ marginLeft: `${2.5 * level}rem` }}
        className="mt-3"
        register={register("title")}
        watch={watch("title")}
        customValue={watch("title") || category.title}
        addAnotherCategory={addAnotherCategory}
        deleteCategory={deleteCategory}
        setCategoryToChooseAttribution={setCategoryToChooseAttribution}
        //@ts-ignore
        attributes={category.attributes}
      />

      {category.subCategories &&
        category.subCategories.map((category: any, idx: number) => (
          //<CollapsibleContainer key={category.id} title={category.title}>
          <Category
            key={category.id}
            category={category}
            level={level + 1}
            addAnotherCategory={addAnotherCategory}
            deleteCategory={deleteCategory}
            setCategoryToChooseAttribution={setCategoryToChooseAttribution}
          />
          //</CollapsibleContainer>
        ))}
    </div>
  );
};

interface ICategoryEl extends ComponentProps<"input"> {
  id: string;
  parentId?: string | null;
  register: any;
  watch: any;
  removeCategory?: boolean;
  customValue?: string;
  addAnotherCategory: (id: string | null) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  setCategoryToChooseAttribution: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  attributes: Attribute[];
}

const CategoryEl = ({
  id,
  parentId,
  className,
  register,
  watch,
  removeCategory,
  customValue,
  addAnotherCategory,
  deleteCategory,
  setCategoryToChooseAttribution,
  attributes,
  ...rest
}: ICategoryEl) => {
  const [isAddCategoryLoading, setIsAddCategoryLoading] = useState(false);
  const [isAddSubCategoryLoading, setIsAddSubCategoryLoading] = useState(false);
  const [isDeleteCategoryLoading, setIsDeleteCategoryLoading] = useState(false);
  return (
    <div
      className={cn("flex w-[90%] items-center justify-start gap-2", className)}
      {...rest}
    >
      {/* delete */}
      <BasicButton
        onClick={async () => {
          try {
            setIsDeleteCategoryLoading(true);
            await deleteCategory(id);
          } catch (error) {
          } finally {
            setIsDeleteCategoryLoading(false);
          }
        }}
        className={"w-max text-xs md:p-3"}
        variant={"danger"}
      >
        {isDeleteCategoryLoading ? (
          <Spinner className="h-4 w-4 text-white" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877"
            />
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886m-1.35-9.811c-.04-.434-.408-.75-.82-.707c-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707c.413-.043.713-.43.672-.864zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707c-.413-.043-.713-.43-.672-.864l.5-5.263c.04-.434.409-.75.82-.707"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </BasicButton>
      {/* delete */}

      <div className="w-full max-w-xs">
        <InputWithSave
          placeholder="Enter Category"
          customValue={customValue}
          onSave={async () => {
            await updateCategoryName(id, watch);
            toast(
              <Success
                id="success_cat_name"
                title="Success"
                body="Category name has been updated."
              />,
            );
          }}
          {...register}
        />
      </div>

      {/* add category */}
      {!removeCategory && (
        <BasicButton
          onClick={async () => {
            try {
              setIsAddCategoryLoading(true);
              await addAnotherCategory(parentId || null);
            } catch (error) {
            } finally {
              setIsAddCategoryLoading(false);
            }
          }}
          className={"w-max bg-gray-100 p-3 text-xs md:p-3"}
          variant={"unstyled"}
        >
          {isAddCategoryLoading ? (
            <Spinner className="h-5 w-5 text-gray-600" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m12 20l6-6m-6 6l-6-6m6 6V9.5M12 4v2.5"
              />
            </svg>
          )}
        </BasicButton>
      )}
      {/* add category */}

      {/* add sub category */}
      <BasicButton
        onClick={async () => {
          try {
            setIsAddSubCategoryLoading(true);
            await addAnotherCategory(id || null);
          } catch (error) {
          } finally {
            setIsAddSubCategoryLoading(false);
          }
        }}
        className={"w-max bg-gray-100 p-3 text-xs md:p-3"}
        variant={"unstyled"}
      >
        {isAddSubCategoryLoading ? (
          <Spinner className="h-5 w-5 text-gray-600" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 -rotate-90"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m12 19.5l-5-5m5 5l5-5m-5 5V13m0-3.5c0-1.667 1-5 5-5"
            />
          </svg>
        )}
      </BasicButton>
      {/* add sub category */}

      <BasicButton
        onClick={() => {
          setCategoryToChooseAttribution(id);
        }}
        className={"w-max bg-gray-100 p-3 md:p-3"}
        variant={"unstyled"}
      >
        View attribute
      </BasicButton>

      <div className="flex w-full items-center justify-start divide-x divide-gray-600 overflow-x-auto">
        {attributes &&
          attributes.map((attr) => (
            <p
              className="whitespace-nowrap px-1 text-xs text-gray-600"
              key={attr.id}
            >
              {attr.name}
            </p>
          ))}
      </div>
    </div>
  );
};

interface IInputWithSave {
  label?: string;
  placeholder?: string;
  value?: string | number | undefined;
  TopRightContainer?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  customValue?: string;
  onSave?: () => Promise<void>;
  onDelete?: () => Promise<void>;
}

const InputWithSave = forwardRef<HTMLInputElement, IInputWithSave>(
  ({ onSave, onDelete, customValue, ...rest }, ref) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(!customValue ? true : false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
      try {
        setIsLoading(true);
        onSave && (await onSave());
      } catch (error) {
        console.log(error);
      } finally {
        setIsEdit(false);
        setIsLoading(false);
      }
    };

    const handleDelete = async () => {
      try {
        setIsDeleteLoading(true);
        onDelete && (await onDelete());
      } catch (error) {
        console.log(error);
      } finally {
        setIsEdit(false);
        setIsDeleteLoading(false);
      }
    };

    return (
      <Input
        ref={ref}
        className="w-full min-w-min"
        onKeyDown={async (key) => {
          if (key.code === "Enter") {
            await handleSave();
          }
        }}
        RightContainer={() => (
          <div className="flex items-center justify-end">
            {!isEdit ? (
              <BasicButton
                onClick={() => setIsEdit(true)}
                variant={"unstyled"}
                wrapperClass="flex items-center justify-center mt-[0.3rem] mr-[0.3rem]"
                className={
                  "flex items-center justify-center bg-blue-600 p-3 text-white  hover:bg-blue-700 data-[pressed]:bg-blue-500 md:p-3"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114m9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13z"
                  />
                </svg>
              </BasicButton>
            ) : (
              <BasicButton
                onClick={handleSave}
                variant={"unstyled"}
                disabled={isLoading}
                wrapperClass="flex items-center justify-center mt-[0.3rem] mr-[0.3rem]"
                className={
                  "flex items-center justify-center bg-green-600 p-3 text-white  hover:bg-green-700 data-[pressed]:bg-green-500 md:p-3"
                }
              >
                {!isLoading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0"
                      clip-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <Spinner className="h-3 w-3 text-white" />
                )}
              </BasicButton>
            )}
            {onDelete && (
              <BasicButton
                onClick={handleDelete}
                variant={"danger"}
                disabled={isDeleteLoading}
                wrapperClass="flex items-center justify-center mt-[0.3rem] mr-[0.3rem]"
                className={"flex items-center justify-center md:p-3"}
              >
                {!isDeleteLoading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877"
                    />
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886m-1.35-9.811c-.04-.434-.408-.75-.82-.707c-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707c.413-.043.713-.43.672-.864zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707c-.413-.043-.713-.43-.672-.864l.5-5.263c.04-.434.409-.75.82-.707"
                      clip-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <Spinner className="h-3 w-3 text-white" />
                )}
              </BasicButton>
            )}
          </div>
        )}
        disabled={!isEdit || isLoading}
        {...rest}
      />
    );
  },
);

InputWithSave.displayName = "InputWithSave";

const AttributeSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="flex w-full items-start justify-start gap-2">
        <div className="aspect-square w-5 rounded-md bg-gray-400"></div>
        <div className="w-full">
          <div className="h-5 w-full rounded-md bg-gray-400"></div>
          <div className="mt-3 h-3 w-full rounded-md bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
