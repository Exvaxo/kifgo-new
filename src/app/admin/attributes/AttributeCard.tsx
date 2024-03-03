"use client";
import AttributeSchema from "@/app/api/admin/attribute/AttributeSchema";
import { BasicButton, Button } from "@/components/Button";
import Spinner from "@/components/Spinner";
import Checkbox from "@/components/form-elements/Checkbox";
import Input from "@/components/form-elements/Input";
import { Option, Select } from "@/components/form-elements/Select";
import { cn } from "@/utilities/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { DisplayAs, Prisma } from "@prisma/client";
import React, { ComponentProps, forwardRef, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  deteleAttribute,
  deteleAttributeOption,
  updateAttributeDescription,
  updateAttributeDisplayAs,
  updateAttributeName,
  updateAttributeOption,
  updateUnits,
} from "./_actions";
import { toast } from "react-toastify";
import Success from "@/components/alerts/Success";
import Modal from "@/components/Modal";
import TextArea from "@/components/form-elements/TextArea";

interface IAttribute extends ComponentProps<"div"> {
  attribute: Prisma.AttributeGetPayload<{
    include: {
      Units: {
        select: {
          id: true;
          name: true;
        };
      };
      options: {
        select: {
          id: true;
          name: true;
        };
      };
      _count: true;
    };
  }>;
  units: Prisma.UnitGetPayload<{}>[];
}

const AttributeCard = ({ attribute, units, className }: IAttribute) => {
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  type AttributeInput = z.infer<typeof AttributeSchema>;

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
    trigger,
    reset,
    control,
  } = useForm<AttributeInput>({
    mode: "onTouched",
    defaultValues: {},
    resolver: zodResolver(AttributeSchema),
  });

  useEffect(() => {
    if (attribute) {
      setTimeout(() => {
        reset({
          name: attribute.name,
          displayAs: attribute.displayAs,
          description: attribute.description || "",
          options: attribute.options,
          units: attribute.unitIds,
        });
      }, 100);
    }
  }, [attribute]);

  const optionsArray = useFieldArray({
    control: control,
    name: "options",
  });

  const [isDisplayAsLoading, setIsDisplayAsLoading] = useState(false);
  const [isUnitsLoading, setIsUnitsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  return (
    <>
      <Modal
        className="max-w-xl p-0 sm:p-0"
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
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
            <Modal.Title className="max-w-md text-base font-medium text-gray-800 sm:text-lg">
              Delete {attribute.name}
            </Modal.Title>
            <Modal.Description className="mt-1 text-xs text-gray-600">
              This action is irreversible, are you sure?
            </Modal.Description>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-end gap-5 p-5 sm:w-auto sm:flex-row">
          <BasicButton
            onClick={() => setIsDeleteModalOpen(false)}
            wrapperClass="w-full sm:w-auto"
            className={"flex w-full items-center justify-center"}
            variant={"secondary"}
          >
            No
          </BasicButton>
          <Button
            isSpinning={isDeleteLoading}
            onClick={async () => {
              setIsDeleteLoading(true);
              await deteleAttribute(attribute.id);
              setIsDeleteModalOpen(false);
              setIsDeleteLoading(false);
            }}
            wrapperClass="w-full sm:w-auto"
            className={"flex w-full items-center justify-center"}
            variant={"danger"}
          >
            Delete
          </Button>
        </div>
      </Modal>

      <div
        className={cn(
          "flex h-full w-full flex-grow items-start justify-start gap-10",
          className,
        )}
      >
        <div className="w-[30%]">
          <InputWithSave
            label="Attribute name"
            placeholder="Enter name"
            {...register("name")}
            TopRightContainer={() => (
              <>
                {attribute._count.categories <= 0 ? (
                  <BasicButton
                    onClick={() => setIsDeleteModalOpen(true)}
                    className={
                      "mt-5 text-red-600 hover:underline data-[pressed]:text-red-700"
                    }
                    variant={"ghost"}
                  >
                    Delete
                  </BasicButton>
                ) : (
                  <p className="mt-5 text-[0.6rem] italic">cannot delete</p>
                )}
              </>
            )}
            customValue={"fr"}
            onSave={async () => {
              await updateAttributeName(attribute.id, watch("name"));
              toast(
                <Success
                  id="success_attr_name"
                  title="Success"
                  body="Attribute name has been updated."
                />,
              );
            }}
          />

          <TextAreaWithSave
            className="mt-5"
            label="Description"
            placeholder="Enter description"
            {...register("description")}
            customValue={watch("description") || ""}
            onSave={async () => {
              await updateAttributeDescription(
                attribute.id,
                watch("description"),
              );
              toast(
                <Success
                  id="success_attr_desc"
                  title="Success"
                  body="Description has been updated."
                />,
              );
            }}
          />

          <Select
            className="mt-7"
            isLoading={isDisplayAsLoading}
            label="How do you want this to be displayed?"
            placeholder="Select display type"
            value={watch(`displayAs`) || undefined}
            onValueChange={async (val) => {
              setValue(`displayAs`, val as DisplayAs);
              trigger("displayAs");
              setIsDisplayAsLoading(true);
              await updateAttributeDisplayAs(attribute.id, val as DisplayAs);
              toast(
                <Success
                  id="success_display_as"
                  title="Success"
                  body="Display as has been updated."
                />,
              );
              setIsDisplayAsLoading(false);
            }}
          >
            <Option value={DisplayAs.INPUT}>Input</Option>
            <Option value={DisplayAs.SELECT}>Select</Option>
            <Option value={DisplayAs.CHECKBOX}>Checkbox</Option>
            <Option value={DisplayAs.RADIO}>Radio</Option>
          </Select>

          {watch("displayAs") === "INPUT" && (
            <>
              <label
                className={`mb-1 mt-7 flex items-center justify-start gap-2 text-xs font-medium sm:text-sm`}
              >
                <span className="block">Select Units to display</span>
                {isUnitsLoading && (
                  <div className="w-min">
                    <Spinner size={"sm"} className="h-4 w-3 text-gray-600" />
                  </div>
                )}
              </label>
              {units && (
                <div className="mt-3 grid w-full grid-cols-1 gap-5 gap-x-20 md:grid-cols-2">
                  {units.map((unit, index) => (
                    <Checkbox
                      key={unit.id}
                      name={`unit_value_${watch("name")}`}
                      value={watch(`units`)?.includes(unit.id) ? "t" : ""}
                      onChange={async (value) => {
                        let uni = watch("units") || [];
                        if (uni?.includes(unit.id)) {
                          uni = uni.filter((val) => val !== unit.id);
                        } else {
                          uni?.push(unit.id);
                        }
                        setValue("units", uni);

                        setIsUnitsLoading(true);
                        await updateUnits(attribute.id, uni);
                        toast(
                          <Success
                            id="success_uni_name"
                            title="Success"
                            body="Unit has been updated."
                          />,
                        );
                        setIsUnitsLoading(false);
                      }}
                      labelClass="whitespace-nowrap"
                      label={unit.name}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-[70%]">
          <h3 className="mb-1 text-sm font-medium text-gray-800">Options</h3>
          {watch("displayAs") !== DisplayAs.INPUT ? (
            <div className="grid max-h-[12rem] w-full grid-cols-1 items-start justify-start gap-5 overflow-auto p-1 md:grid-cols-3">
              {optionsArray &&
                optionsArray.fields.map((field, index) => (
                  <InputWithSave
                    key={field.id}
                    placeholder="Enter value"
                    {...register(`options.${index}.name`)}
                    onSave={async () => {
                      await updateAttributeOption(
                        watch(`options.${index}.name`),
                        attribute.id,
                        watch(`options.${index}.id`),
                      );

                      toast(
                        <Success
                          id="success_uni_name"
                          title="Success"
                          body={`Option has been ${
                            watch(`options.${index}.id`) ? "updated" : "added"
                          }.`}
                        />,
                      );
                    }}
                    onDelete={async () => {
                      console.log("deleting...");
                      if (watch(`options.${index}.id`)) {
                        await deteleAttributeOption(
                          watch(`options.${index}.id`)!,
                        );
                      }
                      optionsArray.remove(index);
                    }}
                    customValue={watch(`options.${index}.name`)}
                  />
                ))}

              <Button
                variant={"secondary"}
                onClick={() =>
                  optionsArray.append({
                    id: "",
                    name: "",
                  })
                }
                wrapperClass="w-full"
                className={"flex w-full justify-center py-3 md:py-3"}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m.75-13a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="w-max">Add Option</span>
                </div>
              </Button>
            </div>
          ) : (
            <div className="flex h-[12rem] w-full items-center justify-center">
              <p className="text-xs italic text-gray-600">
                No options for input field type
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

interface IInputWithSave {
  label?: string;
  placeholder?: string;
  value?: string;
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

interface ITextAreaWithSave {
  label?: string;
  placeholder?: string;
  value?: string;
  TopRightContainer?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  className?: string;
  customValue?: string;
  onSave?: () => Promise<void>;
  onDelete?: () => Promise<void>;
}

const TextAreaWithSave = forwardRef<HTMLTextAreaElement, ITextAreaWithSave>(
  ({ onSave, onDelete, customValue, className, ...rest }, ref) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
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
      <TextArea
        ref={ref}
        className={cn("w-full min-w-min", className)}
        onKeyDown={async (key) => {
          if (key.code === "Enter") {
            await handleSave();
          }
        }}
        RightContainer={() => (
          <div className="mt-6 flex items-center justify-end">
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

TextAreaWithSave.displayName = "TextAreaWithSave";

export default AttributeCard;
