"use client";

import { isEmailValid } from "@/app/_actions";
import { Button } from "@/components/Button";
import GoogleButton from "@/components/GoogleButton";
import Spinner from "@/components/Spinner";
import Input from "@/components/form-elements/Input";
import useAuthStore from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const isEmailAvailableSchema = z.object({
  email: z.string().email(),
});

const EmailCheckForm = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const router = useRouter();
  type Inputs = z.infer<typeof isEmailAvailableSchema>;
  const { setLoginError, fetchUserLoading } = useAuthStore();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(isEmailAvailableSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setIsFormLoading(true);
    const result = await isEmailValid(data);
    setIsFormLoading(false);

    if (result === "no-user-found") {
      setLoginError({
        code: "no-user-found",
        message: "No user found.",
      });

      setError("email", { message: " " });
    } else {
      let url = `/user/signin?email=${data.email}&step=2`;
      if (searchParams.get("callback")) {
        url += `&callback=${searchParams.get("callback")}`;
      }
      router.push(url);
    }
  };

  return (
    <>
      {fetchUserLoading ? (
        <div className="">
          <Spinner size={"sm"} className="border-gray-600" />
        </div>
      ) : (
        <div className="w-full">
          <GoogleButton />
          <div className="relative my-10 flex w-full items-center justify-center border-t border-gray-200">
            <div className="absolute bg-white px-2 text-xs text-gray-400">
              or
            </div>
          </div>

          <form onSubmit={handleSubmit(processForm)}>
            <Input
              type="email"
              className="w-full"
              inputClass="text-center"
              placeholder="Enter your email"
              onInput={(e) => setLoginError(null)}
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
      )}
    </>
  );
};

export default EmailCheckForm;
