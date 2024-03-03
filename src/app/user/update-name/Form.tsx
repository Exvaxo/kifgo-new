"use client";
import { Button } from "@/components/Button";
import Input from "@/components/form-elements/Input";
import { useAuth } from "@/context/AuthContext";
import useAuthStore from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const UpdateNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "Name must be greater than 3 characters."),

  lastName: z.string().trim().min(3, "Name must be greater than 3 characters."),
});

type Inputs = z.infer<typeof UpdateNameSchema>;

const Form = () => {
  const { updateName, refreshToken } = useAuth();
  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
    defaultValues: {},
    resolver: zodResolver(UpdateNameSchema),
  });

  useEffect(() => {
    if (user) {
      const displayName = user.displayName;
      const first_name = user.first_name;
      const last_name = user.last_name;
      const otherName = user.name;

      const firstName =
        displayName?.split(" ")[0] ||
        first_name ||
        otherName?.split(" ")[0] ||
        "";
      const lastName =
        displayName?.split(" ")[1] ||
        last_name ||
        otherName?.split(" ")[1] ||
        "";

      reset({
        firstName,
        lastName,
      });
    }
  }, [user]);

  const [isFormLoading, setIsFormLoading] = useState(false);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsFormLoading(true);
      await updateName(data.firstName, data.lastName);
      await refreshToken();
      router.refresh();
      router.push(
        searchParams.get("callback") ? searchParams.get("callback")! : "/",
      );
    } catch (error) {
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <Input
        type="text"
        className="w-full"
        placeholder="Enter your first name"
        label="First Name"
        {...register("firstName")}
        error={errors.firstName && errors.firstName.message}
      />

      <Input
        type="text"
        className="mt-7 w-full"
        placeholder="Enter your last name"
        label="Last Name"
        {...register("lastName")}
        error={errors.lastName && errors.lastName.message}
      />

      <Button
        type="submit"
        isSpinning={isFormLoading}
        wrapperClass="w-full mt-10"
        className={"flex w-full items-center justify-center"}
      >
        Save
      </Button>
    </form>
  );
};

export default Form;
