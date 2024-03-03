"use client";
import {
  HowYouWillGetPaidSchema,
  HowYouWillGetPaidType,
} from "@/app/schema/HowYouWillGetPaidSchema";
import { ShopType } from "@/app/schema/ShopSchema";
import { Button } from "@/components/Button";
import Radio, { RadioItem } from "@/components/form-elements/Radio";
import { Option, Select } from "@/components/form-elements/Select";
import useLocalStorage from "@/hooks/useLocalStorage";
import countriesWithDialCode from "@/utilities/countriesWithDialCode";
import { zodResolver } from "@hookform/resolvers/zod";
import { SellerType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import BankInformation from "./BankInformation";
import BusinessSeller from "./BusinessSeller";
import IndividualSeller from "./IndividualSeller";
import useOnBaordingStepStore from "@/store/onBoardingStepStore";

const Form = () => {
  const router = useRouter();
  const { updateStep } = useOnBaordingStepStore();
  const { setStorage } = useLocalStorage();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const shopMethods = useFormContext<ShopType>();
  const methods = useForm<HowYouWillGetPaidType>({
    mode: "onTouched",
    defaultValues: shopMethods.getValues("howYouWillGetPaid"),
    resolver: zodResolver(HowYouWillGetPaidSchema),
  });

  const processForm: SubmitHandler<HowYouWillGetPaidType> = async (data) => {
    setIsFormLoading(true);
    try {
      shopMethods.setValue("howYouWillGetPaid", data);
      console.log({ data });

      router.push("set-up-billing");
      updateStep(3, {
        done: true,
        started: false,
      });
      updateStep(4, {
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
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            methods.handleSubmit(processForm)();
          }}
        >
          <fieldset className="w-full min-w-0">
            <div className="mt-10 w-full px-3 md:px-10">
              <h3 className="text-xl font-medium text-gray-800">
                Getting paid on kifgo
              </h3>
              <div className="mt-10 w-full">
                <Select
                  label="Country of origin"
                  SubLabel={() => (
                    <>
                      <p className="mb-1 text-xs text-gray-600">
                        Great! Your deposit will be in LKR.
                      </p>
                      <p className="mb-2 text-xs text-gray-600">
                        Once saved, your bank account country can&apos;t be
                        changed.
                      </p>
                    </>
                  )}
                  defaultValue="Sri Lanka"
                  value={methods.watch("bankLocation")}
                  onValueChange={(val) => {
                    methods.setValue("bankLocation", val);
                    methods.trigger(`bankLocation`);
                  }}
                  disabled
                  placeholder="Select a country"
                  error={methods.formState.errors.bankLocation?.message}
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
            </div>

            <div className="my-10 px-10">
              <div className="w-full border-t"></div>
            </div>

            <div className="w-full px-3 md:px-10">
              <h3 className="text-xl font-medium text-gray-800">
                For tax purposes, what type of seller are you?
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                Kifgo will use this to verify your information. This will not
                affect the status of your Kifgo shop in any way and is just for
                us to know. Most sellers fall into the individual category when
                they first join Kifgo. Still not sure? Learn more.
              </p>
              <div className="mt-5 w-full">
                <Radio
                  name="typeOfSeller"
                  control={methods.control}
                  onChange={(val) => {
                    const value = val as unknown as SellerType;
                    if (value === "INDIVIDUAL") {
                      methods.setValue(
                        "individual.personalInformation.countryOfResidence",
                        "Sri Lanka",
                      );
                      methods.setValue(
                        "individual.taxPayerAddress.businessPhoneNumber.countryCode",
                        "+94_LK",
                      );
                      methods.setValue(
                        "individual.personalInformation.nationality",
                        "Sri Lankan",
                      );

                      methods.setValue("business", null);
                    } else {
                      methods.setValue(
                        "business.businessAddress.businessPhoneNumber.countryCode",
                        "+94_LK",
                      );
                      methods.setValue(
                        "business.businessAddress.country",
                        "Sri Lanka",
                      );
                      methods.setValue(
                        "business.primaryOwner.address.country",
                        "Sri Lanka",
                      );
                      methods.setValue(
                        "business.primaryOwner.address.phone.countryCode",
                        "+94_LK",
                      );
                      methods.setValue("individual", null);
                    }
                  }}
                  value={methods.watch("typeOfSeller")}
                  className="flex flex-col"
                >
                  <RadioItem
                    Label={() => (
                      <>
                        <p className="text-sm font-medium text-gray-800">
                          Individual
                        </p>
                        <p className="text-xs text-gray-600">
                          Most sellers on Kifgo fall into this category
                        </p>
                      </>
                    )}
                    value={SellerType.INDIVIDUAL}
                  />
                  <RadioItem
                    Label={() => (
                      <>
                        <p className="text-sm font-medium text-gray-800">
                          Business or Sole Proprietor
                        </p>
                        <p className="text-xs text-gray-600">
                          Is your bank account registered in your business/trade
                          name? You must choose business as your seller type
                        </p>
                      </>
                    )}
                    value={SellerType.BUSINESS}
                  />
                </Radio>
              </div>
            </div>

            {methods.watch("typeOfSeller") && (
              <div className="my-10 px-10">
                <div className="w-full border-t"></div>
              </div>
            )}

            {methods.watch("typeOfSeller") === SellerType.INDIVIDUAL && (
              <IndividualSeller />
            )}

            {methods.watch("typeOfSeller") === SellerType.BUSINESS && (
              <BusinessSeller />
            )}

            {methods.watch("typeOfSeller") && (
              <>
                <div className="my-10 px-10">
                  <div className="w-full border-t"></div>
                </div>

                <BankInformation />
              </>
            )}
          </fieldset>
          {methods.watch("typeOfSeller") && (
            <div className="mt-10 w-full px-10 pb-10">
              <div className="flex w-full items-center justify-end rounded-2xl bg-gray-100 px-6 py-6">
                <Button
                  type="submit"
                  wrapperClass="w-full sm:w-min"
                  className={
                    "flex w-full items-center justify-center whitespace-nowrap sm:w-auto"
                  }
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
