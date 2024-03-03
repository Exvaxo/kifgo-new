"use client";
import { BasicButton, Button } from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/form-elements/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const UpdateUsernameSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(3, "Username must be atleast 3 characters long."),
});

export type UpdateUsernameInput = z.infer<typeof UpdateUsernameSchema>;

export const EditUserName = () => {
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
  } = useForm<UpdateUsernameInput>({
    mode: "onSubmit",
    defaultValues: {},
    resolver: zodResolver(UpdateUsernameSchema),
  });

  const processForm: SubmitHandler<UpdateUsernameInput> = async (data) => {
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
              Username
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
            <Input
              autoFocus
              placeholder="Enter username"
              {...register("username")}
              error={errors.username?.message}
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

export const UpdateEmailSchema = z.object({
  email: z.string({ required_error: "Email is required." }).trim().email(),
});

export type UpdateEmailInput = z.infer<typeof UpdateEmailSchema>;

export const EditEmail = () => {
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
  } = useForm<UpdateEmailInput>({
    mode: "onSubmit",
    defaultValues: {},
    resolver: zodResolver(UpdateEmailSchema),
  });

  const processForm: SubmitHandler<UpdateEmailInput> = async (data) => {
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
                  <path
                    d="M2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12Z"
                    opacity="0.5"
                  />
                  <path
                    stroke-linecap="round"
                    d="m6 8l2.159 1.8c1.837 1.53 2.755 2.295 3.841 2.295c1.086 0 2.005-.765 3.841-2.296L18 8"
                  />
                </g>
              </svg>
            </span>
            <Modal.Title className="mt-2 text-base font-medium text-gray-800 sm:text-lg">
              Email
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
            <Input
              autoFocus
              type="email"
              placeholder="Enter email"
              {...register("email")}
              error={errors.email?.message}
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

export const UpdatePhoneNumberSchema = z.object({
  countryCode: z.string(),
  number: z
    .string()
    .trim()
    .regex(/^\d+$/, "Must be a number.")
    .min(9, "Minimum has to be 9 characters")
    .max(9, "Maximum has to be 9 characters"),
});

export type UpdatePhoneNumberInput = z.infer<typeof UpdatePhoneNumberSchema>;

export const EditPhone = () => {
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
  } = useForm<UpdatePhoneNumberInput>({
    mode: "onSubmit",
    defaultValues: {
      countryCode: "Sri Lanka",
      number: "",
    },
    resolver: zodResolver(UpdatePhoneNumberSchema),
  });

  const processForm: SubmitHandler<UpdatePhoneNumberInput> = async (data) => {
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
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                >
                  <path d="M14 2s2.2.2 5 3s3 5 3 5m-7.793-4.464s.99.282 2.475 1.767c1.485 1.485 1.768 2.475 1.768 2.475" />
                  <path
                    d="m10.038 5.316l.649 1.163c.585 1.05.35 2.426-.572 3.349c0 0 0 0 0 0s-1.12 1.119.91 3.148c2.027 2.027 3.146.91 3.147.91c0 0 0 0 0 0c.923-.923 2.3-1.158 3.349-.573l1.163.65c1.585.884 1.772 3.106.379 4.5c-.837.836-1.863 1.488-2.996 1.53c-1.908.073-5.149-.41-8.4-3.66c-3.25-3.251-3.733-6.492-3.66-8.4c.043-1.133.694-2.159 1.53-2.996c1.394-1.393 3.616-1.206 4.5.38Z"
                    opacity="0.5"
                  />
                </g>
              </svg>
            </span>
            <Modal.Title className="mt-2 text-base font-medium text-gray-800 sm:text-lg">
              Phone
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
            <Input
              LeadingIcon={() => (
                <span className="flex-shrink-0 pl-3 text-xs font-medium text-gray-500">
                  🇱🇰 +94
                </span>
              )}
              inputClass="pl-14"
              autoFocus
              type="tel"
              placeholder="Enter number (77 #### ###)"
              {...register("number")}
              error={errors.number?.message}
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

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Current Password is required." })
      .min(8, "Current Password must be atleast 8 characters long.")
      .max(30, "Make your password small.")
      .regex(/[A-Z]+.*/, "Include atleast one capital letter.")
      .regex(
        /.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]+.*/,
        "Include atleast one special character.",
      ),

    password: z
      .string({ required_error: "Password is required." })
      .min(8, "Password must be atleast 8 characters long.")
      .max(30, "Make your password small.")
      .regex(/[A-Z]+.*/, "Include atleast one capital letter.")
      .regex(
        /.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]+.*/,
        "Include atleast one special character.",
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be atleast 8 characters long.")
      .max(30, "Make your password small.")
      .regex(/[A-Z]+.*/, "Include atleast one capital letter.")
      .regex(
        /.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]+.*/,
        "Include atleast one special character.",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordInput = z.infer<typeof UpdatePasswordSchema>;

export const EditPassword = () => {
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
  } = useForm<UpdatePasswordInput>({
    mode: "onSubmit",
    resolver: zodResolver(UpdatePasswordSchema),
  });

  const processForm: SubmitHandler<UpdatePasswordInput> = async (data) => {
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
                    d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    d="M6 10V8a6 6 0 1 1 12 0v2"
                    opacity="0.5"
                  />
                  <path
                    fill="currentColor"
                    d="M9 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                    opacity="0.5"
                  />
                </g>
              </svg>
            </span>
            <Modal.Title className="mt-2 text-base font-medium text-gray-800 sm:text-lg">
              Password
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
              type="password"
              autoFocus
              placeholder="Enter current password"
              {...register("currentPassword")}
              error={errors.currentPassword?.message}
            />
            <Input
              type="password"
              placeholder="Enter new password"
              {...register("password")}
              error={errors.password?.message}
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
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
