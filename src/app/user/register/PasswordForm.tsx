"use client";

import { Button } from "@/components/Button";
import Input from "@/components/form-elements/Input";
import { useAuth } from "@/context/AuthContext";
import useAuthStore from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const createUserSchema = z
  .object({
    email: z.string().email(),
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

const PasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const { user } = useAuthStore();
  type Inputs = z.infer<typeof createUserSchema>;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: searchParams.get("email") || "",
    },
    resolver: zodResolver(createUserSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsFormLoading(true);
    try {
      await registerUser(data.email, data.password);
      setIsFormLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(processForm)}>
        <Input
          type={showPassword ? "text" : "password"}
          className="w-full"
          inputClass="text-center"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password && errors.password.message}
          RightContainer={() => (
            <>
              {showPassword ? (
                <Button
                  onClick={() => setShowPassword(false)}
                  className={
                    "mr-px mt-px p-3 text-gray-500 hover:bg-transparent hover:text-gray-800 data-[pressed]:text-gray-800 md:p-3"
                  }
                  variant={"ghost"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                  >
                    <g fill="currentColor">
                      <path d="M10 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10ZM14 10a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z"
                        clipRule="evenodd"
                      />
                    </g>
                  </svg>
                </Button>
              ) : (
                <Button
                  onClick={() => setShowPassword(true)}
                  className={
                    "mr-px mt-px p-3 text-gray-500 hover:bg-transparent hover:text-gray-800 data-[pressed]:text-gray-800 md:p-3"
                  }
                  variant={"ghost"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                  >
                    <g fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 0 0-1.414 1.414l14 14a1 1 0 0 0 1.414-1.414l-1.473-1.473A10.014 10.014 0 0 0 19.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 0 0-4.512 1.074l-1.78-1.781Zm4.261 4.26l1.514 1.515a2.003 2.003 0 0 1 2.45 2.45l1.514 1.514a4 4 0 0 0-5.478-5.478Z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 0 1-3.742-3.741L2.335 6.578A9.98 9.98 0 0 0 .458 10c1.274 4.057 5.065 7 9.542 7c.847 0 1.669-.105 2.454-.303Z" />
                    </g>
                  </svg>
                </Button>
              )}
            </>
          )}
        />

        <Input
          type={showPassword ? "text" : "password"}
          className="mt-10 w-full"
          inputClass="text-center"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
          error={errors.confirmPassword && errors.confirmPassword.message}
        />

        <Button
          type="submit"
          wrapperClass="w-full mt-10"
          className={"flex w-full items-center justify-center"}
          isSpinning={isFormLoading}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default PasswordForm;
