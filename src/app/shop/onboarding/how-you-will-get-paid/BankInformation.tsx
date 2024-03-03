"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "@/components/form-elements/Input";
import { Option, Select } from "@/components/form-elements/Select";
import srilankaProvinces from "@/utilities/srilankaProvinces";
import { HowYouWillGetPaidType } from "@/app/schema/HowYouWillGetPaidSchema";

const BankInformation = () => {
  const {
    register,
    watch,
    trigger,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<HowYouWillGetPaidType>();
  return (
    <div>
      <div className="w-full px-3 md:px-10">
        <h3 className="text-xl font-medium text-gray-800">
          Your bank information
        </h3>

        <div className="mt-5 grid w-full">
          <Input
            label="Full name on account"
            placeholder="Enter full name on account"
            SubLabel={() => (
              <>
                <p className="mb-1 text-xs font-medium text-gray-700">
                  First name - last name
                </p>
                <p className="mb-2 text-xs text-gray-600">
                  Not to get all matchy-matchy, but the name on your bank
                  account needs to be the same as the name you entered above.
                  Need to fix it?
                </p>
              </>
            )}
            disabled
            {...register("bankInformation.fullNameOnAccount")}
            error={errors?.bankInformation?.fullNameOnAccount?.message}
          />
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          <Input
            label="SWIFT / BIC"
            placeholder="Enter SWIFT / BIC"
            {...register("bankInformation.swift_bic")}
            error={errors?.bankInformation?.swift_bic?.message}
          />
          <Input
            label="Account number"
            placeholder="Enter account number"
            {...register("bankInformation.accountNumber")}
            error={errors?.bankInformation?.accountNumber?.message}
          />
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-3">
          <Input
            label="Bank name"
            placeholder="Enter bank name"
            {...register("bankInformation.name")}
            error={errors?.bankInformation?.name?.message}
          />
          <Input
            label="City"
            placeholder="Enter city"
            {...register("bankInformation.city")}
            error={errors?.bankInformation?.city?.message}
          />
          <Select
            label="State / Province"
            value={watch("bankInformation.state")}
            onValueChange={(val) => {
              setValue("bankInformation.state", val);
              trigger(`bankInformation.state`);
            }}
            placeholder="Select a state"
            error={errors?.bankInformation?.state?.message}
          >
            {srilankaProvinces.map((province) => (
              <Option key={province.code} value={province.name}>
                <span className="sr-only">{province.name}</span>
                {province.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BankInformation;
