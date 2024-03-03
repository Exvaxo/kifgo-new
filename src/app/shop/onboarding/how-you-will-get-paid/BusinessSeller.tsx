"use client";
import { HowYouWillGetPaidType } from "@/app/schema/HowYouWillGetPaidSchema";
import { BasicButton } from "@/components/Button";
import Input from "@/components/form-elements/Input";
import { Option, Select } from "@/components/form-elements/Select";
import useAuthStore from "@/store/authStore";
import countriesWithDialCode from "@/utilities/countriesWithDialCode";
import srilankaProvinces from "@/utilities/srilankaProvinces";
import { format, subYears } from "date-fns";
import { Fragment, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const BusinessSeller = () => {
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

  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      setValue(
        "business.primaryOwner.firstName",
        (user?.displayName && user?.displayName.split(" ")[0]) || ""
      );
      setValue(
        "business.primaryOwner.lastName",
        (user?.displayName && user?.displayName.split(" ")[1]) || ""
      );
    }
  }, [user]);

  const additionalShopOwners = useFieldArray({
    control: control,
    name: "business.additionalOwner",
  });

  const getAddress = () => {
    const address: {
      country: string;
      street: string;
      other?: string;
      city: string;
      postalCode: string;
      state: string;
    } = {
      country:
        watch("individual.personalInformation.countryOfResidence") ||
        watch("business.businessAddress.country"),
      street:
        watch("individual.taxPayerAddress.streetAddress") ||
        watch("business.businessAddress.streetAddress"),
      other:
        watch("individual.taxPayerAddress.other") ||
        watch("business.businessAddress.other"),
      city:
        watch("individual.taxPayerAddress.city") ||
        watch("business.businessAddress.city"),
      state:
        watch("individual.taxPayerAddress.state") ||
        watch("business.businessAddress.state"),
      postalCode:
        watch("individual.taxPayerAddress.postalCode") ||
        watch("business.businessAddress.postalCode"),
    };

    return address;
  };

  return (
    <>
      <div className="w-full px-3 md:px-10">
        <h3 className="text-xl font-medium text-gray-800">
          Tell us a little bit about business
        </h3>
        <p className="mt-1 text-xs text-gray-600">
          To meet local and global laws that help keep our marketplace safe, we
          may need to verify your info, sometimes with a secure third-party
          service.We may also need to show some of your business contact info to
          buyers as outlined in our Privacy Policy. Learn more
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Input
            label="Name of legal entity"
            placeholder="Enter name of legal entity"
            {...register("business.businessInformation.nameOfLegalEntity")}
            error={
              errors.business?.businessInformation?.nameOfLegalEntity?.message
            }
          />

          <Input
            label="Business Registration Number"
            placeholder="Enter Business Registration Number"
            {...register(
              "business.businessInformation.businessRegistrationNumber"
            )}
            error={
              errors.business?.businessInformation?.businessRegistrationNumber
                ?.message
            }
          />

          <Input
            label="Business type (optional)"
            placeholder="Enter business type"
            type="tel"
            {...register("business.businessInformation.businessType")}
            error={errors.business?.businessInformation?.businessType?.message}
          />
        </div>

        <div className="mt-10 w-full">
          <Select
            label="Country"
            defaultValue="Sri Lanka"
            value={watch("business.businessAddress.country")}
            onValueChange={(val) => {
              setValue("business.businessAddress.country", val);
              trigger(`business.businessAddress.country`);
            }}
            disabled
            placeholder="Select a country"
            error={errors.business?.businessAddress?.country?.message}
          >
            {countriesWithDialCode.map((country) => (
              <Option key={country.code + country.name} value={country.name}>
                <span className="sr-only">{country.name}</span>
                {country.emoji} {country.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Input
            label="Street address"
            placeholder="Enter street address"
            {...register("business.businessAddress.streetAddress")}
            error={errors.business?.businessAddress?.streetAddress?.message}
          />

          <Input
            label="Apt / Suite / Landmark / Other (optional)"
            placeholder="Enter other"
            {...register("business.businessAddress.other")}
            error={errors.business?.businessAddress?.other?.message}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          <Input
            label="City"
            placeholder="Enter city"
            {...register("business.businessAddress.city")}
            error={errors.business?.businessAddress?.city?.message}
          />

          <Input
            label="Postal Code"
            placeholder="Enter postal code"
            {...register("business.businessAddress.postalCode")}
            error={errors.business?.businessAddress?.postalCode?.message}
          />

          <Select
            label="State / Province"
            value={watch("business.businessAddress.state")}
            onValueChange={(val) => {
              setValue("business.businessAddress.state", val);
              trigger(`business.businessAddress.state`);
            }}
            placeholder="Select a state"
            error={errors?.business?.businessAddress?.state?.message}
          >
            {srilankaProvinces.map((province) => (
              <Option key={province.code} value={province.name}>
                <span className="sr-only">{province.name}</span>
                {province.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex w-full items-center justify-start gap-3">
            <Select
              label="Code"
              value={watch(
                "business.businessAddress.businessPhoneNumber.countryCode"
              )}
              onValueChange={(val) => {
                setValue(
                  "business.businessAddress.businessPhoneNumber.countryCode",
                  val
                );
                trigger(
                  `business.businessAddress.businessPhoneNumber.countryCode`
                );
              }}
              disabled
              defaultValue="+94"
              placeholder="Select a country"
              error={
                errors.business?.businessAddress?.businessPhoneNumber
                  ?.countryCode?.message
              }
            >
              {countriesWithDialCode.map((country) => (
                <Option
                  key={country.code + country.name}
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
                "business.businessAddress.businessPhoneNumber.number"
              )}
              error={
                errors.business?.businessAddress?.businessPhoneNumber?.number
                  ?.message
              }
            />
          </div>
        </div>
      </div>

      <div className="my-10 px-10">
        <div className="w-full border-t"></div>
      </div>

      <div className="w-full px-3 md:px-10">
        <h3 className="text-xl font-medium text-gray-800">
          Who’s the primary shop owner for the business?
        </h3>
        <p className="mt-1 text-xs text-gray-600">
          We’re all about your protection. That’s why we may use a secure
          third-party service to verify the primary shop owner. Rest assured,
          this info won&apos;t ever be shared outside of this secure service.
          Learn more
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Input
            label="First name"
            placeholder="Enter first name"
            {...register("business.primaryOwner.firstName")}
            error={errors.business?.primaryOwner?.firstName?.message}
            onBlur={(e) => {
              register("business.primaryOwner.firstName").onBlur(e);
              setValue(
                "bankInformation.fullNameOnAccount",
                `${e.currentTarget.value} ${getValues(
                  "business.primaryOwner.lastName"
                )}`
              );
            }}
          />
          <Input
            label="Last name"
            placeholder="Enter last name"
            {...register("business.primaryOwner.lastName")}
            error={errors.business?.primaryOwner?.lastName?.message}
            onBlur={(e) => {
              register("business.primaryOwner.lastName").onBlur(e);
              setValue(
                "bankInformation.fullNameOnAccount",
                `${getValues("business.primaryOwner.firstName")} ${
                  e.currentTarget.value
                }`
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
            {...register("business.primaryOwner.dateOfBirth")}
            error={errors.business?.primaryOwner?.dateOfBirth?.message}
          />

          <Input
            label="National Identity card number"
            placeholder="Enter NIC"
            {...register("business.primaryOwner.nic")}
            error={errors.business?.primaryOwner?.nic?.message}
          />
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          <Input
            label="Street address"
            placeholder="Enter street address"
            TopRightContainer={() => (
              <BasicButton
                className={
                  "-mr-1 mt-6 whitespace-nowrap text-xs text-gray-600 hover:text-gray-700 hover:underline"
                }
                variant={"ghost"}
                onClick={() => {
                  const address = getAddress();

                  setValue(
                    "business.primaryOwner.address.streetAddress",
                    address.street
                  );
                  setValue(
                    "business.primaryOwner.address.other",
                    address.other
                  );
                  setValue("business.primaryOwner.address.city", address.city);
                  setValue(
                    "business.primaryOwner.address.state",
                    address.state
                  );
                  setValue(
                    "business.primaryOwner.address.postalCode",
                    address.postalCode
                  );
                  setValue(
                    "business.primaryOwner.address.country",
                    address.country
                  );
                }}
              >
                use primary address
              </BasicButton>
            )}
            {...register("business.primaryOwner.address.streetAddress")}
            error={
              errors.business?.primaryOwner?.address?.streetAddress?.message
            }
          />
          <Input
            label="Apt / Suite / Landmark / Other (optional)"
            placeholder="Enter other"
            {...register("business.primaryOwner.address.other")}
            error={errors.business?.primaryOwner?.address?.other?.message}
          />
        </div>

        <div className="mt-10 w-full">
          <Select
            label="Country"
            defaultValue="Sri Lanka"
            value={watch(`business.primaryOwner.address.country`)}
            onValueChange={(val) => {
              setValue(`business.primaryOwner.address.country`, val);
              trigger(`business.primaryOwner.address.country`);
            }}
            placeholder="Select a country"
            error={errors.business?.primaryOwner?.address?.country?.message}
          >
            {countriesWithDialCode.map((country) => (
              <Option key={country.code + country.name} value={country.name}>
                <span className="sr-only">{country.name}</span>
                {country.emoji} {country.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-3">
          <Input
            label="City"
            placeholder="Enter city"
            {...register("business.primaryOwner.address.city")}
            error={errors.business?.primaryOwner?.address?.city?.message}
          />
          <Input
            label="Postal Code"
            placeholder="Enter postal code"
            {...register("business.primaryOwner.address.postalCode")}
            error={errors.business?.primaryOwner?.address?.postalCode?.message}
          />
          <Select
            label="State / Province"
            value={watch("business.primaryOwner.address.state")}
            onValueChange={(val) => {
              setValue("business.primaryOwner.address.state", val);
              trigger(`business.primaryOwner.address.state`);
            }}
            placeholder="Select a state"
            error={errors?.business?.primaryOwner?.address?.state?.message}
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
              value={watch("business.primaryOwner.address.phone.countryCode")}
              onValueChange={(val) => {
                setValue(
                  "business.primaryOwner.address.phone.countryCode",
                  val
                );
                trigger(`business.primaryOwner.address.phone.countryCode`);
              }}
              disabled
              defaultValue="+94"
              placeholder="Select a country"
              error={
                errors.business?.primaryOwner?.address?.phone?.countryCode
                  ?.message
              }
            >
              {countriesWithDialCode.map((country) => (
                <Option
                  key={country.code + country.name}
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
              {...register("business.primaryOwner.address.phone.number")}
              error={
                errors.business?.primaryOwner?.address?.phone?.number?.message
              }
            />
          </div>
        </div>
      </div>

      <div className="my-10 px-10">
        <div className="w-full border-t"></div>
      </div>

      <div className="w-full px-3 md:px-10">
        <div className="flex w-full items-center justify-between gap-10">
          <div className="">
            <h3 className="text-xl font-medium text-gray-800">
              Additional owners
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              Identify anyone who has more than 25% stake of the business
            </p>
          </div>

          <BasicButton
            onClick={() =>
              additionalShopOwners.append({
                firstName: user?.displayName?.split(" ")[0] || "",
                lastName: user?.displayName?.split(" ")[1] || "",
                dateOfBirth: undefined,
                nic: "",
                address: {
                  country: "Sri Lanka",
                  city: "",
                  other: "",
                  phone: {
                    countryCode: "+94_LK",
                    number: "",
                  },
                  postalCode: "",
                  state: "",
                  streetAddress: "",
                },
              })
            }
            variant={"secondary"}
          >
            Add
          </BasicButton>
        </div>

        <div className="w-full space-y-10">
          <>
            {additionalShopOwners.fields.map((field, idx) => (
              <Fragment key={field.id}>
                <div className="mt-10 flex w-full items-center justify-between gap-10">
                  <div className="rounded-xl bg-gray-800 p-3 px-4 text-xs text-white">
                    {idx + 1}
                  </div>

                  <div className="w-full border-t"></div>

                  <BasicButton
                    onClick={() => additionalShopOwners.remove(idx)}
                    variant={"ghost"}
                    className={"text-red-500 hover:text-red-600"}
                  >
                    Remove
                  </BasicButton>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <Input
                    label="First name"
                    placeholder="Enter first name"
                    {...register(`business.additionalOwner.${idx}.firstName`)}
                    error={
                      errors?.business?.additionalOwner &&
                      errors.business?.additionalOwner[idx]?.firstName?.message
                    }
                  />
                  <Input
                    label="Last name"
                    placeholder="Enter last name"
                    {...register(`business.additionalOwner.${idx}.lastName`)}
                    error={
                      errors.business?.additionalOwner &&
                      errors.business?.additionalOwner[idx]?.lastName?.message
                    }
                  />
                </div>

                <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
                  <Input
                    label="date of birth"
                    type="date"
                    max={format(subYears(new Date(), 16), "yyyy-MM-dd")}
                    placeholder="Enter date."
                    {...register(`business.additionalOwner.${idx}.dateOfBirth`)}
                    error={
                      errors.business?.additionalOwner &&
                      errors.business?.additionalOwner[idx]?.dateOfBirth
                        ?.message
                    }
                  />

                  <Input
                    label="National Identity card number"
                    placeholder="Enter NIC"
                    {...register(`business.additionalOwner.${idx}.nic`)}
                    error={
                      errors.business?.additionalOwner &&
                      errors.business?.additionalOwner[idx]?.nic?.message
                    }
                  />
                </div>

                <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2">
                  <Input
                    label="Street address"
                    placeholder="Enter street address"
                    TopRightContainer={() => (
                      <BasicButton
                        className={
                          "-mr-1 mt-6 whitespace-nowrap text-xs text-gray-600 hover:text-gray-700 hover:underline"
                        }
                        variant={"ghost"}
                        onClick={() => {
                          const address = getAddress();

                          setValue(
                            `business.additionalOwner.${idx}.address.streetAddress`,
                            address.street
                          );
                          setValue(
                            `business.additionalOwner.${idx}.address.other`,
                            address.other
                          );
                          setValue(
                            `business.additionalOwner.${idx}.address.city`,
                            address.city
                          );
                          setValue(
                            `business.additionalOwner.${idx}.address.state`,
                            address.state
                          );
                          setValue(
                            `business.additionalOwner.${idx}.address.postalCode`,
                            address.postalCode
                          );
                          setValue(
                            `business.additionalOwner.${idx}.address.country`,
                            address.country
                          );
                        }}
                      >
                        use primary address
                      </BasicButton>
                    )}
                    {...register(
                      `business.additionalOwner.${idx}.address.streetAddress`
                    )}
                    error={
                      errors.business?.additionalOwner &&
                      errors.business?.additionalOwner[idx]?.address
                        ?.streetAddress?.message
                    }
                  />
                  <Input
                    label="Apt / Suite / Landmark / Other (optional)"
                    placeholder="Enter other"
                    {...register(
                      `business.additionalOwner.${idx}.address.other`
                    )}
                    error={
                      errors.business?.additionalOwner &&
                      errors.business?.additionalOwner[idx]?.address?.other
                        ?.message
                    }
                  />
                </div>

                <div className="w-full">
                  <Select
                    label="Country"
                    defaultValue="Sri Lanka"
                    value={watch(
                      `business.additionalOwner.${idx}.address.country`
                    )}
                    onValueChange={(val) => {
                      setValue(
                        `business.additionalOwner.${idx}.address.country`,
                        val
                      );
                      trigger(
                        `business.additionalOwner.${idx}.address.country`
                      );
                    }}
                    placeholder="Select a country"
                    error={
                      errors.business?.additionalOwner &&
                      errors.business?.additionalOwner[idx]?.address?.country
                        ?.message
                    }
                  >
                    {countriesWithDialCode.map((country) => (
                      <Option
                        key={country.code + country.name}
                        value={country.name}
                      >
                        <span className="sr-only">{country.name}</span>
                        {country.emoji} {country.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-3">
                  <Input
                    label="City"
                    placeholder="Enter city"
                    {...register(
                      `business.additionalOwner.${idx}.address.city`
                    )}
                    error={
                      errors.business?.additionalOwner &&
                      errors.business?.additionalOwner[idx]?.address?.city
                        ?.message
                    }
                  />
                  <Input
                    label="Postal Code"
                    placeholder="Enter postal code"
                    {...register(
                      `business.additionalOwner.${idx}.address.postalCode`
                    )}
                    error={
                      errors.business?.additionalOwner &&
                      errors.business?.additionalOwner[idx]?.address?.postalCode
                        ?.message
                    }
                  />
                  <Select
                    label="State / Province"
                    value={watch(
                      `business.additionalOwner.${idx}.address.state`
                    )}
                    onValueChange={(val) => {
                      setValue(
                        `business.additionalOwner.${idx}.address.state`,
                        val
                      );
                      trigger(`business.additionalOwner.${idx}.address.state`);
                    }}
                    placeholder="Select a state"
                    error={
                      errors?.business?.additionalOwner &&
                      errors?.business?.additionalOwner[idx]?.address?.state
                        ?.message
                    }
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
                        `business.additionalOwner.${idx}.address.phone.countryCode`
                      )}
                      onValueChange={(val) => {
                        setValue(
                          `business.additionalOwner.${idx}.address.phone.countryCode`,
                          val
                        );
                        trigger(
                          `business.additionalOwner.${idx}.address.phone.countryCode`
                        );
                      }}
                      disabled
                      defaultValue="+94"
                      placeholder="Select a country"
                      error={
                        errors.business?.additionalOwner &&
                        errors.business?.additionalOwner[idx]?.address?.phone
                          ?.countryCode?.message
                      }
                    >
                      {countriesWithDialCode.map((country) => (
                        <Option
                          key={country.code + country.name}
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
                      label="Phone number"
                      placeholder="Enter number"
                      type="tel"
                      {...register(
                        `business.additionalOwner.${idx}.address.phone.number`
                      )}
                      error={
                        errors.business?.additionalOwner &&
                        errors.business?.additionalOwner[idx]?.address?.phone
                          ?.number?.message
                      }
                    />
                  </div>
                </div>
              </Fragment>
            ))}

            {additionalShopOwners.fields.length > 0 && (
              <div className="mx-auto mb-2 mt-8 flex w-full items-center justify-center sm:mt-8 md:max-w-md">
                <BasicButton
                  onClick={() =>
                    additionalShopOwners.append({
                      firstName: user?.displayName?.split(" ")[0] || "",
                      lastName: user?.displayName?.split(" ")[1] || "",
                      dateOfBirth: undefined,
                      nic: "",
                      address: {
                        country: "Sri Lanka",
                        city: "",
                        other: "",
                        phone: {
                          countryCode: "+94_LK",
                          number: "",
                        },
                        postalCode: "",
                        state: "",
                        streetAddress: "",
                      },
                    })
                  }
                  variant={"ghost"}
                  className={
                    "flex w-full items-center justify-center whitespace-nowrap text-skin-primary"
                  }
                >
                  Add More
                </BasicButton>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default BusinessSeller;
