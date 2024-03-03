"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

import About from "./About";
import Details from "./Details";
import PricingAndInventory from "./PricingAndInventory";
import Variation from "./Variation";

import useGetCategoryAttrs from "@/app/client-apis/seller/category/useGetCategoryAttrs";
import { ShopType } from "@/app/schema/ShopSchema";
import { Button } from "@/components/Button";
import useOnBaordingStepStore from "@/store/onBoardingStepStore";
import { useRouter } from "next/navigation";
import {
  StockYouShopType,
  StockYourShopSchema,
} from "../../../schema/StockYourShopSchema";
import Settings from "./Settings";
import Shipping from "./Shipping";
import Tabs from "./Tabs";
import useScrollableTabs from "./useScrollableTabs";

const tabs = [
  { name: "About", value: "about" },
  { name: "Price & Inventory", value: "price-&-inventory" },
  { name: "Details", value: "details" },
  { name: "Variations", value: "variations" },
  { name: "Shipping", value: "shipping" },
  { name: "Settings", value: "settings" },
];

const Form = () => {
  const router = useRouter();
  const { updateStep } = useOnBaordingStepStore();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const shopMethods = useFormContext<ShopType>();
  const methods = useForm<StockYouShopType>({
    mode: "onTouched",
    defaultValues: shopMethods.getValues("stockYourShop"),
    resolver: zodResolver(StockYourShopSchema),
  });

  useEffect(() => {
    console.log({ error: methods.formState.errors });
  }, [methods.formState.errors]);

  const processForm: SubmitHandler<StockYouShopType> = async (data) => {
    try {
      setIsFormLoading(true);
      shopMethods.setValue("stockYourShop", data);
      console.log({ data });
      router.push("how-you-will-get-paid");
      updateStep(2, {
        done: true,
        started: false,
      });
      updateStep(3, {
        done: false,
        started: true,
      });
    } catch (error: any) {
    } finally {
      setIsFormLoading(false);
    }
  };

  const {
    activeTab,
    setActiveTab,
    aboutRef,
    priceRef,
    variationsRef,
    detailsRef,
    shippingRef,
    settingsRef,
  } = useScrollableTabs({ tabs });

  useEffect(() => {
    if (methods.watch("variation")) {
      if (
        methods
          .watch("variation")
          .some((variation) => variation.variantSettings.price)
      ) {
        methods.setValue("pricing.srilanka", "");
        methods.setValue("pricing.global", "");
      }

      if (
        methods
          .watch("variation")
          .some((variation) => variation.variantSettings.quantity)
      ) {
        methods.setValue("pricing.quantity", "");
      }

      if (
        methods
          .watch("variation")
          .some((variation) => variation.variantSettings.sku)
      ) {
        methods.setValue("about.sku", "");
      }
    }
  }, [methods.watch("variation")]);

  const { data: attrs } = useGetCategoryAttrs(
    methods.watch("details.categoryId"),
  );

  useEffect(() => {
    if (
      attrs &&
      methods.watch("details.attributes") &&
      methods.watch("variation")
    ) {
      const attributes = methods
        .watch("details.attributes")
        .map((att, idx) => ({
          name: attrs
            .find((attri) => attri.id === att.attributeId)
            ?.name?.toLowerCase(),
          index: idx,
          id: att.attributeId,
        }));

      methods.watch("variation").forEach((variation) =>
        variation.combination.forEach((vari) => {
          const [selected] = attributes.filter(
            (att) => att.name === vari.variant.toLowerCase(),
          );
          if (selected) {
            methods.setValue(`details.attributes.${selected.index}.value`, "");
            methods.setValue(`details.attributes.${selected.index}.unitId`, "");
          }
        }),
      );
    }
  }, [attrs, methods.watch("details.attributes"), methods.watch("variation")]);

  return (
    <div className="w-full">
      <div className="sticky top-0 z-[99999] hidden w-full justify-center bg-white px-3 py-3 md:flex">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClick={(tab) => {
            document?.getElementById(tab)?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        />
      </div>

      <FormProvider {...methods}>
        <form
          className="mt-10"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            methods.handleSubmit(processForm)();
          }}
        >
          <fieldset className="w-full min-w-0" disabled={isFormLoading}>
            <About ref={aboutRef} />

            <div className="my-10 px-10">
              <div className="w-full border-t"></div>
            </div>

            <PricingAndInventory ref={priceRef} />

            <div className="my-10 px-10">
              <div className="w-full border-t"></div>
            </div>

            {/* <Details ref={detailsRef} /> */}

            <div className="my-10 px-10">
              <div className="w-full border-t"></div>
            </div>

            <Variation ref={variationsRef} />

            <div className="my-10 px-10">
              <div className="w-full border-t"></div>
            </div>
            {/* <Shipping ref={shippingRef} /> */}

            <div className="my-10 px-10">
              <div className="w-full border-t"></div>
            </div>

            {/* <Settings ref={settingsRef} /> */}
          </fieldset>

          <div className="w-full px-10 pb-10">
            <div className="flex w-full items-center justify-end rounded-2xl bg-gray-100 px-6 py-6">
              <Button
                isSpinning={isFormLoading}
                type="submit"
                wrapperClass="w-full sm:w-min"
                className={
                  "flex w-full items-center justify-center whitespace-nowrap"
                }
              >
                Create listing
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
