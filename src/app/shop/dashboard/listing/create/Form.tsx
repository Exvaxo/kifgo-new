"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import About from "./About";
import Details from "./Details";
import PricingAndInventory from "./PricingAndInventory";
import Variation from "./Variation";

import useGetCategoryAttrs from "@/app/client-apis/seller/category/useGetCategoryAttrs";
import { Button } from "@/components/Button";
import useAuthStore from "@/store/authStore";
import useDeleteFiles from "@/store/filesDeleteStore";
import useOnBaordingStepStore from "@/store/onBoardingStepStore";
import { deleteFile, upload } from "@/utilities/fileManager";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import {
  StockYouShopType,
  StockYourShopSchema,
} from "../../../../schema/StockYourShopSchema";
import Settings from "./Settings";
import Shipping from "./Shipping";
import Tabs from "./Tabs";
import { createListing } from "./_actions";
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
  const { user } = useAuthStore();
  const router = useRouter();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const methods = useForm<StockYouShopType>({
    mode: "onTouched",
    defaultValues: {
      about: {
        personalization: {
          isPersonalization: false,
          isOptional: false,
          prompt: "",
        },
      },
      details: {
        type: "physical",
      },
      pricing: {
        quantity: 1,
      },
      settings: {
        featured: false,
        policyId: "",
        section: "",
      },

      // about: {
      //   title:
      //     "The Perfect Travel Companion - High-Quality Leather Cord Organizer",
      //   showSku: false,
      //   description:
      //     "Upgrade your holiday game with our handmade Christmas dreads set! Picture this: you, rocking these groovy, handcrafted dreads, turning heads at every festive gathering. Forget the traditional, embrace the jolly vibes with our unique, offbeat twist to Christmas style. 'Tis the season to stand out, and these dreads are your secret weapon. Go ahead, sleigh it!\n\nProduct information:\nType -Crochet dreadlocks hair extensions\nColors Red Green and White colors\nMaterial - kanekalon (synthetic hair).\nIt is a completely hypoallergenic material.\n\nWith order mail, you receive a youtube link to detailed video about installing dreadlock extensions. Contact us if you have any questions!",
      //   personalization: {
      //     isPersonalization: false,
      //     prompt: "",
      //     isOptional: false,
      //   },
      // },
      // pricing: {
      //   isGlobalPricing: false,
      //   isVolumePricing: false,
      //   srilanka: "",
      //   global: "",
      //   quantity: "3",
      //   volumePricing: [],
      // },
      // details: {
      //   type: "physical",
      //   whoMadeIt: "a-member-of-my-shop",
      //   whatIsIt: "a-finished-product",
      //   whenDidYouMakeIt: "made-to-order",
      //   categoryId: "657802fb41bf7e67d09a0321",
      //   attributes: [
      //     {
      //       attributeId: "65806b270b6d54ff9ebbb3cb",
      //       value: "20",
      //       unitId: "65538ef2f45205456da2aa59",
      //     },
      //     {
      //       attributeId: "65806b440b6d54ff9ebbb3cc",
      //       value: ",65806b440b6d54ff9ebbb3cd",
      //     },
      //     {
      //       attributeId: "65806b5e0b6d54ff9ebbb3d4",
      //       value: "65806b5e0b6d54ff9ebbb3d6",
      //     },
      //   ],
      //   tags: ["dede"],
      //   materials: ["dede"],
      // },
      // variation: [
      //   {
      //     variationId: nanoid(10),
      //     isGroup: false,
      //     isSelected: false,
      //     visibility: true,
      //     variantSettings: {
      //       price: true,
      //       quantity: false,
      //       sku: false,
      //     },
      //     sku: "",
      //     pricing: {
      //       srilanka: "200",
      //       global: "0",
      //     },
      //     quantity: "1",
      //     combination: [
      //       {
      //         variant: "size",
      //         variantId: "655390b40dd6de8ca53377b6",
      //         value: "xs",
      //         unit: "Alpha",
      //         isEditable: false,
      //       },
      //     ],
      //   },
      //   {
      //     variationId: nanoid(10),
      //     isGroup: false,
      //     isSelected: false,
      //     visibility: true,
      //     variantSettings: {
      //       price: true,
      //       quantity: false,
      //       sku: false,
      //     },
      //     sku: "",
      //     pricing: {
      //       srilanka: "300",
      //       global: "0",
      //     },
      //     quantity: "1",
      //     combination: [
      //       {
      //         variant: "size",
      //         variantId: "655390b40dd6de8ca53377b6",
      //         value: "sm",
      //         unit: "Alpha",
      //         isEditable: false,
      //       },
      //     ],
      //   },
      //   {
      //     variationId: nanoid(10),
      //     isGroup: false,
      //     isSelected: false,
      //     visibility: true,
      //     variantSettings: {
      //       price: true,
      //       quantity: false,
      //       sku: false,
      //     },
      //     sku: "",
      //     pricing: {
      //       srilanka: "400",
      //       global: "0",
      //     },
      //     quantity: "1",
      //     combination: [
      //       {
      //         variant: "size",
      //         variantId: "655390b40dd6de8ca53377b6",
      //         value: "m",
      //         unit: "Alpha",
      //         isEditable: false,
      //       },
      //     ],
      //   },
      // ],
      // shipping: {
      //   profile: "65a37a96990067537b30a3af",
      // },
      // settings: {
      //   policyId: "65a375f9990067537b30a3a2",
      //   section: "clothing",
      //   featured: false,
      // },
    },
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

  const { setIsLoading, setLoadingMessage } = useOnBaordingStepStore();

  const processForm: SubmitHandler<StockYouShopType> = async (data) => {
    try {
      setIsFormLoading(true);

      setIsLoading(true);

      let stockYourShop = data;

      setLoadingMessage("Uploading your product images");

      await storeInFirebase(stockYourShop);

      setLoadingMessage("Creating your listing");

      await createListing(stockYourShop);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
