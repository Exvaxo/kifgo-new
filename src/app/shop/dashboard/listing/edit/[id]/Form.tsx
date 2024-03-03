"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import About from "./About";
import Details from "./Details";
import PricingAndInventory from "./PricingAndInventory";
import Variation from "./Variation";

import { updateProduct } from "@/app/api/product/product.service";
import useGetCategoryAttrs from "@/app/client-apis/seller/category/useGetCategoryAttrs";
import { Button } from "@/components/Button";
import useAuthStore from "@/store/authStore";
import useDeleteFiles from "@/store/filesDeleteStore";
import { deleteFile, upload } from "@/utilities/fileManager";
import { Prisma } from "@prisma/client";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import {
  StockYouShopType,
  StockYourShopSchema,
} from "../../../../../schema/StockYourShopSchema";
import Settings from "./Settings";
import Shipping from "./Shipping";
import Tabs from "./Tabs";
import useScrollableTabs from "./useScrollableTabs";
import { z } from "zod";
import { getCurrentUser } from "@/utilities/getCurrentUser";
import { updateProductDb } from "./_actions";

const tabs = [
  { name: "About", value: "about" },
  { name: "Price & Inventory", value: "price-&-inventory" },
  { name: "Details", value: "details" },
  { name: "Variations", value: "variations" },
  { name: "Shipping", value: "shipping" },
  { name: "Settings", value: "settings" },
];

const Form = ({
  product,
}: {
  product: Prisma.ProductGetPayload<{
    include: {
      details: true;
      policy: true;
      settings: true;
      Shipping: true;
      shipping: true;
      Variation: true;
      variation: true;
    };
  }> | null;
}) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const methods = useForm<StockYouShopType>({
    mode: "onTouched",
    defaultValues: product
      ? {
          about: product.about,
          details: product.details,
          pricing: product.pricing,
          variation: product.variation,
          settings: product.settings,
          shipping: product.shipping,
        }
      : {},
    resolver: zodResolver(StockYourShopSchema),
  });

  useEffect(() => {
    console.log({ errors: methods.formState.errors });
  }, [methods.formState.errors]);

  const { files: deletedFiles, setFiles: setDeletedFiles } = useDeleteFiles();

  const storeInFirebase = async (data: StockYouShopType) => {
    let thumbnailLowResFiles = [data?.about?.thumbnail?.lowRes?.file].filter(
      (file) => file,
    );

    if (data?.about?.thumbnail?.lowRes?.ref) {
      thumbnailLowResFiles = [];
    }

    let thumbnailHighResFiles = [data?.about?.thumbnail?.highRes?.file].filter(
      (file) => file,
    );

    if (data?.about?.thumbnail?.highRes?.ref) {
      thumbnailHighResFiles = [];
    }

    let lowResImages = data.about.images
      .filter((img) => !img.lowRes.ref)
      .map((image) => image.lowRes.file)
      .filter((file) => file);

    let highResImages = data.about.images
      .filter((img) => !img?.highRes?.ref)
      .map((image) => image.highRes.file)
      .filter((file) => file);

    let videoFile = [];

    if (data?.about?.video) {
      videoFile.push(data?.about?.video?.file);
      videoFile = videoFile.filter((file) => file);
    }

    if (data?.about?.video && data?.about?.video?.ref) {
      videoFile = [];
    }

    const anyRefLink =
      data?.about?.thumbnail?.highRes?.ref ||
      data.about.images.filter((img) => img?.highRes?.ref)[0]?.highRes?.ref;

    const oldId = anyRefLink?.split("/")[1];

    const uniqueId = oldId || nanoid(10);

    const deletePromises = [];

    for (let ref of deletedFiles) {
      deletePromises.push(deleteFile(ref));
    }

    if (deletePromises.length > 0) {
      await Promise.all(deletePromises);
    }

    setDeletedFiles([]);

    const promisses = [
      upload(
        thumbnailLowResFiles,
        `${user?.uid}/${uniqueId}/thumbnail/lowRes`,
        false,
      ),
      upload(
        thumbnailHighResFiles,
        `${user?.uid}/${uniqueId}/thumbnail/highRes`,
        false,
      ),
      upload(
        lowResImages,
        `${user?.uid}/${uniqueId}/images/lowRes`,
        false,
        true,
      ),
      upload(
        highResImages,
        `${user?.uid}/${uniqueId}/images/highRes`,
        false,
        true,
      ),
      upload(videoFile, `${user?.uid}/${uniqueId}/video`, false),
    ];

    const urls = await Promise.all(promisses);

    const [
      thumbnailLowRes,
      thumbnailHighRes,
      imagesLowRes,
      imagesHighRes,
      video,
    ] = urls;

    if (thumbnailLowRes.length > 0) {
      data.about.thumbnail.lowRes.url = thumbnailLowRes[0].url;
      data.about.thumbnail.lowRes.ref = thumbnailLowRes[0].ref;
    }

    if (thumbnailHighRes.length > 0) {
      data.about.thumbnail.highRes.url = thumbnailHighRes[0].url;
      data.about.thumbnail.highRes.ref = thumbnailHighRes[0].ref;
    }

    const preStoredLowResImages = data.about.images
      .map((image) => image.lowRes)
      .filter((img) => img.ref);

    const preStoredHighResImages = data.about.images
      .map((image) => image.highRes)
      .filter((img) => img.ref);

    [...preStoredLowResImages, ...imagesLowRes].map((image, idx) => {
      data.about.images[idx].lowRes.url = image.url;
      data.about.images[idx].lowRes.ref = image.ref;
    });

    [...preStoredHighResImages, ...imagesHighRes].map((image, idx) => {
      data.about.images[idx].highRes.url = image.url;
      data.about.images[idx].highRes.ref = image.ref;
    });

    if (video && video.length > 0) {
      data.about.video = {
        url: video[0].url,
        ref: video[0].ref,
        file: {},
      };
    }
  };

  const processForm: SubmitHandler<StockYouShopType> = async (data) => {
    try {
      setIsFormLoading(true);
      if (product) {
        await storeInFirebase(data);
        await updateProductDb(data, product);
        setIsFormLoading(false);
      }
    } catch (error: any) {
      console.log(error);
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

            <Details ref={detailsRef} />

            <div className="my-10 px-10">
              <div className="w-full border-t"></div>
            </div>

            <Variation ref={variationsRef} />

            <div className="my-10 px-10">
              <div className="w-full border-t"></div>
            </div>
            <Shipping ref={shippingRef} />

            <div className="my-10 px-10">
              <div className="w-full border-t"></div>
            </div>

            <Settings ref={settingsRef} />
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
                {isFormLoading ? "Saving" : " Save changes"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
