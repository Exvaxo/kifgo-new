"use client";
import { BasicButton, Button } from "@/components/Button";
import Modal from "@/components/Modal";
import Error from "@/components/alerts/Error";
import Input from "@/components/form-elements/Input";
import TextArea from "@/components/form-elements/TextArea";
import isImageType from "@/utilities/isImageType";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, subYears } from "date-fns";
import Image from "next/image";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export const UpdateProfilePictureSchema = z.object({
  photoURL: z.string().trim().optional(),
  photoFile: z.instanceof(File).optional(),
});

export type UpdateProfilePictureInput = z.infer<
  typeof UpdateProfilePictureSchema
>;

export const EditProfilePicture = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
    trigger,
    reset,
    control,
  } = useForm<UpdateProfilePictureInput>({
    mode: "onSubmit",
    defaultValues: {},
    resolver: zodResolver(UpdateProfilePictureSchema),
  });

  const processForm: SubmitHandler<UpdateProfilePictureInput> = async (
    data,
  ) => {
    try {
      console.log({ data });
    } catch (error: any) {
      console.log(error);
    } finally {
    }
  };

  const photoFileRef = useRef<HTMLInputElement>(null);

  const maxImageSize = 2 * 1024 * 1024; // 2MB in bytes

  return (
    <>
      <BasicButton onClick={() => setIsModalOpen(true)} variant={"secondary"}>
        Edit
      </BasicButton>

      <Modal
        className="max-w-xl p-0 sm:p-0"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
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
          </div>
          <div className="mt-10 flex w-full flex-col items-center justify-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-skin-primary"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="9" r="3" opacity="0.5" />
                  <circle cx="12" cy="12" r="10" />
                  <path
                    stroke-linecap="round"
                    d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"
                    opacity="0.5"
                  />
                </g>
              </svg>
            </span>
            <Modal.Title className="mt-2 text-base font-medium text-gray-800 sm:text-lg">
              Profile
            </Modal.Title>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(processForm)();
          }}
        >
          <fieldset className="mx-auto mb-10 mt-5 max-w-sm px-5">
            <div className="flex flex-col items-center justify-start gap-5 md:flex-row">
              <div className="relative">
                <div className="relative aspect-square w-32 overflow-hidden rounded-full">
                  {watch("photoURL") ? (
                    <Image
                      fill
                      className="aspect-square w-full rounded-full object-cover shadow-inner"
                      src={watch("photoURL") || ""}
                      alt={"user profile picture"}
                    />
                  ) : (
                    <div className="flex aspect-square w-full items-center justify-center bg-skin-primary-light">
                      <svg
                        className="text-primaryColor h-7 w-7"
                        viewBox="0 0 24 24"
                      >
                        <g fill="currentColor">
                          <circle cx="12" cy="6" r="4" />
                          <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" />
                        </g>
                      </svg>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 right-0">
                  {watch("photoURL") && (
                    <BasicButton
                      variant={"danger"}
                      onClick={() => {
                        setValue("photoURL", "");
                        setValue("photoFile", undefined);
                      }}
                      wrapperClass="w-max"
                      className="rounded-xl border-2 border-white p-2 md:p-2"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <g fill="currentColor">
                          <path d="M2.75 6.167c0-.46.345-.834.771-.834h2.665c.529-.015.996-.378 1.176-.916l.03-.095l.115-.372c.07-.228.131-.427.217-.605c.338-.702.964-1.189 1.687-1.314c.184-.031.377-.031.6-.031h3.478c.223 0 .417 0 .6.031c.723.125 1.35.612 1.687 1.314c.086.178.147.377.217.605l.115.372l.03.095c.18.538.74.902 1.27.916h2.57c.427 0 .772.373.772.834c0 .46-.345.833-.771.833H3.52c-.426 0-.771-.373-.771-.833Z" />
                          <path
                            d="M11.607 22h.787c2.707 0 4.06 0 4.941-.863c.88-.864.97-2.28 1.15-5.111l.26-4.081c.098-1.537.147-2.305-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.487-.392 1.255-.295 2.792l.26 4.08c.18 2.833.27 4.248 1.15 5.112C7.545 22 8.9 22 11.607 22Z"
                            opacity=".5"
                          />
                        </g>
                      </svg>
                    </BasicButton>
                  )}
                </div>
              </div>

              <input
                ref={photoFileRef}
                type="file"
                name="photo"
                id="photo_file"
                className="sr-only"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    if (file) {
                      if (file.size > maxImageSize) {
                        toast(
                          <Error
                            id={`${file.name}_filesize`}
                            title="Large file."
                            body={`${file.name} is greater than 2MB.`}
                          />,
                        );
                        return;
                      }

                      if (!isImageType(file.type)) {
                        toast(
                          <Error
                            id={`${file.name}_filetype`}
                            title="Invalid file type"
                            body={`${file.name} is of ${file.type} type, which is not a valid image.`}
                          />,
                        );
                        return;
                      }

                      const url = URL.createObjectURL(file);
                      setValue("photoURL", url);
                      setValue("photoFile", file);
                    }
                  }
                }}
              />

              <Button
                variant={"unstyled"}
                onClick={() => photoFileRef?.current?.click()}
                wrapperClass="w-max"
                className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-100"
              >
                {watch("photoURL") ? "Update Profile" : "Add Profile"}
              </Button>
            </div>
          </fieldset>

          <div className="flex w-full flex-col items-center justify-end gap-5 p-5 sm:w-auto sm:flex-row">
            <BasicButton
              type="button"
              onClick={() => setIsModalOpen(false)}
              wrapperClass="w-full sm:w-auto"
              className={"flex w-full items-center justify-center"}
              variant={"secondary"}
            >
              Cancel
            </BasicButton>
            <Button
              type="submit"
              isSpinning={false}
              onClick={async () => {}}
              wrapperClass="sm:w-max w-full"
              className={"flex w-full items-center justify-center"}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export const UpdateNameSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required." })
    .trim()
    .min(3, "First name must be atleast 3 characters long."),
  lastName: z
    .string({ required_error: "Last name is required." })
    .trim()
    .min(3, "Last name must be atleast 3 characters long."),
});

export type UpdateNameInput = z.infer<typeof UpdateNameSchema>;

export const EditName = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
    trigger,
    reset,
    control,
  } = useForm<UpdateNameInput>({
    mode: "onSubmit",
    defaultValues: {},
    resolver: zodResolver(UpdateNameSchema),
  });

  const processForm: SubmitHandler<UpdateNameInput> = async (data) => {
    try {
      console.log({ data });
    } catch (error: any) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <BasicButton onClick={() => setIsModalOpen(true)} variant={"secondary"}>
        Edit
      </BasicButton>

      <Modal
        className="max-w-xl p-0 sm:p-0"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
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
          </div>
          <div className="mt-10 flex w-full flex-col items-center justify-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-skin-primary"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="9" r="3" opacity="0.5" />
                  <circle cx="12" cy="12" r="10" />
                  <path
                    stroke-linecap="round"
                    d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"
                    opacity="0.5"
                  />
                </g>
              </svg>
            </span>
            <Modal.Title className="mt-2 text-base font-medium text-gray-800 sm:text-lg">
              Name
            </Modal.Title>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(processForm)();
          }}
        >
          <fieldset className="mx-auto mb-10 mt-5 max-w-sm space-y-7 px-5">
            <Input
              autoFocus
              placeholder="Enter first name"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <Input
              autoFocus
              placeholder="Enter last name"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </fieldset>

          <div className="flex w-full flex-col items-center justify-end gap-5 p-5 sm:w-auto sm:flex-row">
            <BasicButton
              type="button"
              onClick={() => setIsModalOpen(false)}
              wrapperClass="w-full sm:w-auto"
              className={"flex w-full items-center justify-center"}
              variant={"secondary"}
            >
              Cancel
            </BasicButton>
            <Button
              type="submit"
              isSpinning={false}
              onClick={async () => {}}
              wrapperClass="sm:w-max w-full"
              className={"flex w-full items-center justify-center"}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export const UpdateCitySchema = z.object({
  city: z
    .string({ required_error: "City is required." })
    .trim()
    .min(3, "City must be atleast 3 characters long."),
});

export type UpdateCityInput = z.infer<typeof UpdateCitySchema>;

export const EditCity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
    trigger,
    reset,
    control,
  } = useForm<UpdateCityInput>({
    mode: "onSubmit",
    defaultValues: {},
    resolver: zodResolver(UpdateCitySchema),
  });

  const processForm: SubmitHandler<UpdateCityInput> = async (data) => {
    try {
      console.log({ data });
    } catch (error: any) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <BasicButton onClick={() => setIsModalOpen(true)} variant={"secondary"}>
        Edit
      </BasicButton>

      <Modal
        className="max-w-xl p-0 sm:p-0"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
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
          </div>
          <div className="mt-10 flex w-full flex-col items-center justify-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-skin-primary"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="10"
                  r="7"
                  fill="currentColor"
                  opacity="0.5"
                />
                <path
                  fill="currentColor"
                  d="M9.602 8.213C9.471 6.754 8.346 5.395 7.8 4.897l-.302-.258A6.972 6.972 0 0 1 12 3c1.55 0 2.98.503 4.14 1.356c.164.497-.148 1.536-.475 2.033c-.12.18-.388.404-.683.616c-.666.478-1.505.715-1.932 1.595a.99.99 0 0 0-.058.711c.042.154.069.321.07.485c0 .528-.534.91-1.062.904c-1.375-.015-2.275-1.123-2.398-2.487m3.404 6.181c.691-1.304 2.997-1.304 2.997-1.304c2.402-.025 2.727-1.484 2.944-2.22a7.004 7.004 0 0 1-5.975 6.063c-.226-.475-.493-1.546.034-2.54"
                />
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M18.004 1.5a.75.75 0 0 1 1.058-.059a11.037 11.037 0 0 1 3.688 8.246c0 5.751-4.389 10.478-10 11.013v.55H14a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5h1.25v-.509a11.037 11.037 0 0 1-7.809-3.678a.75.75 0 1 1 1.118-1a9.537 9.537 0 0 0 7.128 3.187a9.563 9.563 0 0 0 9.563-9.563a9.537 9.537 0 0 0-3.188-7.128a.75.75 0 0 1-.059-1.06"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <Modal.Title className="mt-2 text-base font-medium text-gray-800 sm:text-lg">
              City
            </Modal.Title>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(processForm)();
          }}
        >
          <fieldset className="mx-auto mb-10 mt-5 max-w-sm space-y-7 px-5">
            <Input
              autoFocus
              placeholder="Enter City"
              {...register("city")}
              error={errors.city?.message}
            />
          </fieldset>

          <div className="flex w-full flex-col items-center justify-end gap-5 p-5 sm:w-auto sm:flex-row">
            <BasicButton
              type="button"
              onClick={() => setIsModalOpen(false)}
              wrapperClass="w-full sm:w-auto"
              className={"flex w-full items-center justify-center"}
              variant={"secondary"}
            >
              Cancel
            </BasicButton>
            <Button
              type="submit"
              isSpinning={false}
              onClick={async () => {}}
              wrapperClass="sm:w-max w-full"
              className={"flex w-full items-center justify-center"}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export const UpdateBirthdaySchema = z.object({
  dob: z
    .string({ required_error: "Date of birth is required." })
    .trim()
    .min(1, "Date of birth is required.")
    .transform((str) => new Date(str)),
});

export type UpdateBirthdayInput = z.infer<typeof UpdateBirthdaySchema>;

export const EditBirthdate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
    trigger,
    reset,
    control,
  } = useForm<UpdateBirthdayInput>({
    mode: "onSubmit",
    defaultValues: {},
    resolver: zodResolver(UpdateBirthdaySchema),
  });

  const processForm: SubmitHandler<UpdateBirthdayInput> = async (data) => {
    try {
      console.log({ data });
    } catch (error: any) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <BasicButton onClick={() => setIsModalOpen(true)} variant={"secondary"}>
        Edit
      </BasicButton>

      <Modal
        className="max-w-xl p-0 sm:p-0"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
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
          </div>
          <div className="mt-10 flex w-full flex-col items-center justify-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-skin-primary"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14z" />
                  <path
                    stroke-linecap="round"
                    d="M7 4V2.5M17 4V2.5M2 9h20"
                    opacity="0.5"
                  />
                  <circle cx="16.5" cy="16.5" r="1.5" />
                </g>
              </svg>
            </span>
            <Modal.Title className="mt-2 text-base font-medium text-gray-800 sm:text-lg">
              Date of birth
            </Modal.Title>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(processForm)();
          }}
        >
          <fieldset className="mx-auto mb-10 mt-5 max-w-sm space-y-7 px-5">
            <Input
              type="date"
              autoFocus
              placeholder="Enter Date of birth"
              max={format(subYears(new Date(), 16), "yyyy-MM-dd")}
              {...register("dob")}
              error={errors.dob?.message}
            />
          </fieldset>

          <div className="flex w-full flex-col items-center justify-end gap-5 p-5 sm:w-auto sm:flex-row">
            <BasicButton
              type="button"
              onClick={() => setIsModalOpen(false)}
              wrapperClass="w-full sm:w-auto"
              className={"flex w-full items-center justify-center"}
              variant={"secondary"}
            >
              Cancel
            </BasicButton>
            <Button
              type="submit"
              isSpinning={false}
              onClick={async () => {}}
              wrapperClass="sm:w-max w-full"
              className={"flex w-full items-center justify-center"}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export const UpdateAboutSchema = z.object({
  about: z
    .string()
    .trim()
    .min(3, "About must be atleast 3 characters long.")
    .optional()
    .or(z.literal("")),
});

export type UpdateAboutInput = z.infer<typeof UpdateAboutSchema>;

export const EditAbout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
    trigger,
    reset,
    control,
  } = useForm<UpdateAboutInput>({
    mode: "onSubmit",
    defaultValues: {},
    resolver: zodResolver(UpdateAboutSchema),
  });

  const processForm: SubmitHandler<UpdateAboutInput> = async (data) => {
    try {
      console.log({ data });
    } catch (error: any) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <BasicButton onClick={() => setIsModalOpen(true)} variant={"secondary"}>
        Edit
      </BasicButton>

      <Modal
        className="max-w-xl p-0 sm:p-0"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
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
          </div>
          <div className="mt-10 flex w-full flex-col items-center justify-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-skin-primary"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    stroke="currentColor"
                    stroke-width="1.5"
                    d="M4 6v13a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3zm0 0V5"
                  />
                  <circle
                    cx="12"
                    cy="13"
                    r="3"
                    stroke="currentColor"
                    stroke-width="1.5"
                    opacity="0.5"
                  />
                  <path
                    fill="currentColor"
                    d="M18 6v.75h.75V6zm-2.283-3.674l-.106-.742zM4.92 3.87l-.106-.743zm.15 2.88H18v-1.5H5.071zM18.75 6V4.306h-1.5V6zm-3.139-4.416L4.814 3.126l.212 1.485L15.823 3.07zM4.814 3.126A1.821 1.821 0 0 0 3.25 4.93h1.5a.32.32 0 0 1 .276-.318zm13.936 1.18a2.75 2.75 0 0 0-3.139-2.722l.212 1.485a1.25 1.25 0 0 1 1.427 1.237zM5.071 5.25a.321.321 0 0 1-.321-.321h-1.5A1.82 1.82 0 0 0 5.071 6.75z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    d="M10 19h4"
                    opacity="0.5"
                  />
                </g>
              </svg>
            </span>
            <Modal.Title className="mt-2 text-base font-medium text-gray-800 sm:text-lg">
              About
            </Modal.Title>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(processForm)();
          }}
        >
          <fieldset className="mx-auto mb-10 mt-5 max-w-sm space-y-7 px-5">
            <TextArea
              rows={3}
              autoFocus
              placeholder="Enter About"
              {...register("about")}
              error={errors.about?.message}
            />
          </fieldset>

          <div className="flex w-full flex-col items-center justify-end gap-5 p-5 sm:w-auto sm:flex-row">
            <BasicButton
              type="button"
              onClick={() => setIsModalOpen(false)}
              wrapperClass="w-full sm:w-auto"
              className={"flex w-full items-center justify-center"}
              variant={"secondary"}
            >
              Cancel
            </BasicButton>
            <Button
              type="submit"
              isSpinning={false}
              onClick={async () => {}}
              wrapperClass="sm:w-max w-full"
              className={"flex w-full items-center justify-center"}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
