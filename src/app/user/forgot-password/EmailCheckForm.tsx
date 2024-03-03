"use client";

import { isEmailValid } from "@/app/_actions";
import { Button } from "@/components/Button";
import Input from "@/components/form-elements/Input";
import useAuthStore from "@/store/authStore";
import fetcher from "@/utilities/fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const isEmailAvailableSchema = z.object({
  email: z.string().email(),
});

const EmailCheckForm = () => {
  const searchParams = useSearchParams();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const router = useRouter();
  type Inputs = z.infer<typeof isEmailAvailableSchema>;
  const { setRegisterError } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(isEmailAvailableSchema),
  });

  useEffect(() => {
    if (searchParams.get("email")) {
      setValue("email", searchParams.get("email") || "");
    }
  }, [searchParams]);

  const handleForgotPassword = async (email: string) => {
    try {
      const { data } = await fetcher().post("/user/forgot-password", {
        email,
      });

      router.push(`forgot-password/verify-otp?id=${data.id}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsFormLoading(true);
    try {
      await isEmailValid(data);
      await handleForgotPassword(data.email);
    } catch (error: any) {
      if (error && error.message === "no-user-found") {
        setRegisterError({
          code: "no-user-found",
          message: "No user found.",
        });

        setError("email", { message: " " });
      }
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(processForm)}>
        <Input
          type="email"
          className="w-full"
          inputClass="text-center"
          placeholder="Enter your email"
          onInput={(e) => setRegisterError(null)}
          {...register("email")}
          error={errors.email && errors.email.message}
        />

        <Button
          type="submit"
          wrapperClass="w-full mt-10"
          isSpinning={isFormLoading}
          className={"flex w-full items-center justify-center"}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default EmailCheckForm;
