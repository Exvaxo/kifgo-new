"use client";
import AttributeSchema from "@/app/api/admin/attribute/AttributeSchema";
import { Button } from "@/components/Button";
import Checkbox from "@/components/form-elements/Checkbox";
import Input from "@/components/form-elements/Input";
import { Option, Select } from "@/components/form-elements/Select";
import { cn } from "@/utilities/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { DisplayAs, Prisma } from "@prisma/client";
import React, { ComponentProps, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { createAttribute } from "./_actions";
import { useRouter } from "next/navigation";
import TextArea from "@/components/form-elements/TextArea";

interface IForm extends ComponentProps<"div"> {
  units: Prisma.UnitGetPayload<{}>[];
}
export type AttributeInput = z.infer<typeof AttributeSchema>;

const Form = ({ units }: IForm) => {
  const router = useRouter();
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

  const optionsArray = useFieldArray({
    control: control,
    name: "options",
  });

  const [isFormLoading, setIsFormLoading] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        try {
          setIsFormLoading(true);
          await createAttribute(values);
          router.push("/admin/attributes");
        } catch (error) {
        } finally {
          setIsFormLoading(false);
        }
      })}
      className={cn("flex h-full min-h-[80dvh] flex-col")}
    >
      <fieldset className="h-full w-full flex-1" disabled={isFormLoading}>
        <div className="flex h-full w-full flex-1 flex-grow items-start justify-start gap-10">
          <div className="w-[30%]">
            <Input
              label="Attribute name"
              placeholder="Enter name"
              {...register("name")}
              error={errors.name?.message}
            />

            <TextArea
              label="Description"
              placeholder="Enter description"
              {...register("description")}
              error={errors.description?.message}
            />

            <Select
              className="mt-7"
              label="How do you want this to be displayed?"
              placeholder="Select display type"
              value={watch(`displayAs`) || undefined}
              onValueChange={async (val) => {
                setValue(`displayAs`, val as DisplayAs);
                trigger("displayAs");
              }}
              error={errors.displayAs?.message}
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
                </label>
                {units && (
                  <div className="mt-3 grid w-full grid-cols-1 gap-5 gap-x-20 md:grid-cols-2">
                    {units.map((unit, index) => (
                      <Checkbox
                        key={index + unit.id}
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
                    <Input
                      key={field.id}
                      placeholder="Enter value"
                      {...register(`options.${index}.name`)}
                      error={
                        errors.options && errors.options[index]?.name?.message
                      }
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
      </fieldset>

      <div className="flex justify-end">
        <Button isSpinning={isFormLoading} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

export default Form;
