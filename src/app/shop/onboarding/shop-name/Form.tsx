"use client";
import { ShopNameSchema, ShopNameType } from "@/app/schema/ShopNameSchema";
import { ShopType } from "@/app/schema/ShopSchema";
import { Button } from "@/components/Button";
import Input from "@/components/form-elements/Input";
import useLocalStorage from "@/hooks/useLocalStorage";
import useDeleteFiles from "@/store/filesDeleteStore";
import useOnBaordingStepStore from "@/store/onBoardingStepStore";
import { cn } from "@/utilities/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";

const Form = () => {
  const { updateStep } = useOnBaordingStepStore();
  const router = useRouter();
  const { setStorage } = useLocalStorage();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const shopMethods = useFormContext<ShopType>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<ShopNameType>({
    mode: "all",
    defaultValues: {
      name: shopMethods.getValues("name"),
    },
    resolver: zodResolver(ShopNameSchema),
  });

  const processForm: SubmitHandler<ShopNameType> = async (data) => {
    setIsFormLoading(true);
    try {
      console.log({ data });
      shopMethods.setValue("name", data.name);
      router.push("stock-your-shop");

      updateStep(1, {
        done: true,
        started: false,
      });
      updateStep(2, {
        done: false,
        started: true,
      });
    } catch (error: any) {
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit(processForm)();
        }}
      >
        <Input
          className="w-full"
          inputClass="text-center"
          placeholder="Enter your shop name"
          {...register("name")}
        />

        <ValidationIndicator
          className={"mt-5"}
          error={
            watch("name")?.length > 0 &&
            (watch("name")?.length < 4 || watch("name")?.length > 20)
          }
          success={
            watch("name")?.length > 0 &&
            watch("name")?.length >= 4 &&
            watch("name")?.length <= 20
          }
          active={!watch("name") || watch("name")?.length <= 0}
        >
          Between 4-20 characters.
        </ValidationIndicator>

        <ValidationIndicator
          className={"mt-2"}
          error={
            watch("name")?.length > 0 && errors.name?.message === "regex-error"
          }
          success={
            watch("name")?.length > 0 && errors.name?.message !== "regex-error"
          }
          active={!watch("name") || watch("name")?.length <= 0}
        >
          No special characters, spaces, or accented letters
        </ValidationIndicator>

        <Button
          type="submit"
          wrapperClass="w-full"
          className={"mt-10 flex w-full items-center justify-center"}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

const ValidationIndicator = ({
  error,
  success,
  active,
  children,
  className,
}: {
  error: boolean;
  success: boolean;
  active: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`flex items-center justify-start gap-2`, className)}>
      {error && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-800"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      )}

      {success && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-green-800"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10Zm-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.236L14.97 8.97a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}

      {active && (
        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-gray-300"></div>
      )}

      <p className={`text-xs ${active ? "text-gray-400" : "text-gray-600"}`}>
        {children}
      </p>
    </div>
  );
};

export default Form;
