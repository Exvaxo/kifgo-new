"use client";
import { useFormContext } from "react-hook-form";

import { SetUpBillingType } from "@/app/schema/SetUpBillingSchema";
import Input from "@/components/form-elements/Input";
import { Option, Select } from "@/components/form-elements/Select";
import countriesWithDialCode from "@/utilities/countriesWithDialCode";
import srilankaProvinces from "@/utilities/srilankaProvinces";

const BillingAddress = () => {
  const {
    register,
    watch,
    trigger,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<SetUpBillingType>();

  return (
    <>
      <div className="w-full">
        <Select
          label="Country"
          defaultValue="Sri Lanka"
          value={watch("billingAddress.country")}
          onValueChange={(val) => {
            setValue("billingAddress.country", val);
            trigger(`billingAddress.country`);
          }}
          placeholder="Select a country"
          error={errors.billingAddress?.country?.message}
        >
          {countriesWithDialCode.map((country) => (
            <Option
              key={country.code + country.name + country.dial_code}
              value={country.name}
            >
              <span className="sr-only">{country.name}</span>
              {country.emoji} {country.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
        <Input
          label="Street address"
          placeholder="Enter street address"
          {...register("billingAddress.streetAddress")}
          error={errors?.billingAddress?.streetAddress?.message}
        />
        <Input
          label="Apt / Suite / Landmark / Other (optional)"
          placeholder="Enter other"
          {...register("billingAddress.other")}
          error={errors?.billingAddress?.other?.message}
        />
      </div>

      <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-3">
        <Input
          label="City"
          placeholder="Enter city"
          {...register("billingAddress.city")}
          error={errors?.billingAddress?.city?.message}
        />
        <Input
          label="Postal Code"
          placeholder="Enter postal code"
          {...register("billingAddress.postalCode")}
          error={errors?.billingAddress?.postalCode?.message}
        />
        <Select
          label="State / Province"
          value={watch("billingAddress.state")}
          onValueChange={(val) => {
            setValue("billingAddress.state", val);
            trigger(`billingAddress.state`);
          }}
          placeholder="Select a state"
          error={errors.billingAddress?.state?.message}
        >
          {srilankaProvinces.map((province) => (
            <Option key={province.code} value={province.name}>
              <span className="sr-only">{province.name}</span>
              {province.name}
            </Option>
          ))}
        </Select>
      </div>
    </>
  );
};

export default BillingAddress;
