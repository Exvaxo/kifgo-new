"use client";
import { HowYouWillGetPaidType } from "@/app/schema/HowYouWillGetPaidSchema";
import { BasicButton, Button } from "@/components/Button";
import Input from "@/components/form-elements/Input";
import { Option, Select } from "@/components/form-elements/Select";
import useAuthStore from "@/store/authStore";
import countriesWithDialCode from "@/utilities/countriesWithDialCode";
import srilankaProvinces from "@/utilities/srilankaProvinces";
import { format, subYears } from "date-fns";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const IndividualSeller = () => {
  const {
    register,
    watch,
    trigger,
    control,
    setValue,
    getValues,
    clearErrors,
    reset,
    formState: { errors },
  } = useFormContext<HowYouWillGetPaidType>();

  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      setValue(
        "individual.personalInformation.firstName",
        (user?.displayName && user?.displayName.split(" ")[0]) || "",
      );
      setValue(
        "individual.personalInformation.lastName",
        (user?.displayName && user?.displayName.split(" ")[1]) || "",
      );
    }
  }, [user]);

  return (
    <>
      <div className="w-full px-3 md:px-10">
        <h3 className="text-xl font-medium text-gray-800">
          Tell us a little bit about yourself
        </h3>
        <p className="mt-1 text-xs text-gray-600">
          For compliance purposes, we may verify your identity with a secure
          third–party service. This information will never be displayed publicly
          on Kifgo. Learn more
        </p>

        <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          <Select
            label="Country of residence"
            defaultValue="Sri Lanka"
            value={watch("individual.personalInformation.countryOfResidence")}
            onValueChange={(val) => {
              setValue(
                "individual.personalInformation.countryOfResidence",
                val,
              );
              trigger(`individual.personalInformation.countryOfResidence`);
            }}
            disabled
            placeholder="Select a country"
            error={
              errors.individual?.personalInformation?.countryOfResidence
                ?.message
            }
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

          <Select
            label="Nationality"
            defaultValue="Sri Lankan"
            value={watch("individual.personalInformation.nationality")}
            onValueChange={(val) => {
              setValue("individual.personalInformation.nationality", val);
              trigger(`individual.personalInformation.nationality`);
            }}
            disabled
            placeholder="Select a natioanlity"
            error={errors.individual?.personalInformation?.nationality?.message}
          >
            <Option value={"Sri Lankan"}>Sri Lankan</Option>
          </Select>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Input
            label="First name"
            placeholder="Enter first name"
            {...register("individual.personalInformation.firstName")}
            error={errors.individual?.personalInformation?.firstName?.message}
            onBlur={(e) => {
              register("individual.personalInformation.firstName").onBlur(e);
              setValue(
                "bankInformation.fullNameOnAccount",
                `${e.currentTarget.value} ${getValues(
                  "individual.personalInformation.lastName",
                )}`,
              );
            }}
          />
          <Input
            label="Last name"
            placeholder="Enter last name"
            {...register("individual.personalInformation.lastName")}
            error={errors.individual?.personalInformation?.lastName?.message}
            onBlur={(e) => {
              register("individual.personalInformation.lastName").onBlur(e);
              setValue(
                "bankInformation.fullNameOnAccount",
                `${getValues("individual.personalInformation.firstName")} ${
                  e.currentTarget.value
                }`,
              );
            }}
          />
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          <Input
            label="date of birth"
            type="date"
            max={format(subYears(new Date(), 16), "yyyy-MM-dd")}
            placeholder="Enter date."
            {...register("individual.personalInformation.dateOfBirth")}
            error={errors.individual?.personalInformation?.dateOfBirth?.message}
          />

          <Input
            label="National Identity card number"
            placeholder="Enter NIC"
            {...register("individual.personalInformation.nic")}
            error={errors.individual?.personalInformation?.nic?.message}
          />
        </div>
      </div>

      <div className="my-10 px-10">
        <div className="w-full border-t"></div>
      </div>

      <div className="w-full px-3 md:px-10">
        <h3 className="text-xl font-medium text-gray-800">Taxpayer address</h3>
        <p className="mt-1 text-xs text-gray-600">
          This should be the same address used when filing taxes, not a P.O. Box
          or business address.
        </p>

        <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          <Input
            label="Street address"
            placeholder="Enter street address"
            {...register("individual.taxPayerAddress.streetAddress")}
            error={errors.individual?.taxPayerAddress?.streetAddress?.message}
          />
          <Input
            label="Apt / Suite / Landmark / Other (optional)"
            placeholder="Enter other"
            {...register("individual.taxPayerAddress.other")}
            error={errors.individual?.taxPayerAddress?.other?.message}
          />
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-3">
          <Input
            label="City"
            placeholder="Enter city"
            {...register("individual.taxPayerAddress.city")}
            error={errors.individual?.taxPayerAddress?.city?.message}
          />
          <Input
            label="Postal Code"
            placeholder="Enter postal code"
            {...register("individual.taxPayerAddress.postalCode")}
            error={errors.individual?.taxPayerAddress?.postalCode?.message}
          />
          <Select
            label="State / Province"
            value={watch("individual.taxPayerAddress.state")}
            onValueChange={(val) => {
              setValue("individual.taxPayerAddress.state", val);
              trigger(`individual.taxPayerAddress.state`);
            }}
            placeholder="Select a state"
            error={errors?.individual?.taxPayerAddress?.state?.message}
          >
            {srilankaProvinces.map((province) => (
              <Option key={province.code} value={province.name}>
                <span className="sr-only">{province.name}</span>
                {province.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mt-10 w-full">
          <div className="flex max-w-sm items-center justify-start gap-3">
            <Select
              label="Code"
              value={watch(
                "individual.taxPayerAddress.businessPhoneNumber.countryCode",
              )}
              onValueChange={(val) => {
                setValue(
                  "individual.taxPayerAddress.businessPhoneNumber.countryCode",
                  val,
                );
                trigger(
                  `individual.taxPayerAddress.businessPhoneNumber.countryCode`,
                );
              }}
              disabled
              defaultValue="+94"
              placeholder="Select a country"
              error={
                errors.individual?.taxPayerAddress?.businessPhoneNumber
                  ?.countryCode?.message
              }
            >
              {countriesWithDialCode.map((country) => (
                <Option
                  key={country.code + country.name + country.dial_code}
                  value={country.dial_code + "_" + country.code}
                >
                  <span className="sr-only">
                    {country.name} {country.dial_code}
                  </span>
                  {country.emoji} {country.dial_code}
                </Option>
              ))}
            </Select>
            <Input
              className="w-full"
              label="Business Phone number"
              placeholder="Enter number"
              type="tel"
              {...register(
                "individual.taxPayerAddress.businessPhoneNumber.number",
              )}
              error={
                errors.individual?.taxPayerAddress?.businessPhoneNumber?.number
                  ?.message
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualSeller;
