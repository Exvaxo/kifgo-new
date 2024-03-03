"use client";
import { ShopType } from "@/app/schema/ShopSchema";
import {
  SetUpBillingSchema,
  SetUpBillingType,
} from "@/app/schema/SetUpBillingSchema";
import { BasicButton, Button } from "@/components/Button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import BillingAddress from "./BillingAddress";
import { deleteFile, upload } from "@/utilities/fileManager";
import { nanoid } from "nanoid";
import { StockYouShopType } from "@/app/schema/StockYourShopSchema";
import useDeleteFiles from "@/store/filesDeleteStore";
import useAuthStore from "@/store/authStore";
import { createShop } from "./_actions";
import useOnBaordingStepStore from "@/store/onBoardingStepStore";
import { useAuth } from "@/context/AuthContext";

const Form = () => {
  const { user } = useAuthStore();
  const { refreshToken } = useAuth();
  const router = useRouter();
  const { setStorage } = useLocalStorage();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const shopMethods = useFormContext<ShopType>();

  const methods = useForm<SetUpBillingType>({
    mode: "onTouched",
    defaultValues: shopMethods.getValues("setUpBilling"),
    resolver: zodResolver(SetUpBillingSchema),
  });

  const { files: deletedFiles, setFiles: setDeletedFiles } = useDeleteFiles();

  const storeInFirebase = async (data: StockYouShopType) => {
    let thumbnailLowResFiles = [data.about.thumbnail.lowRes.file].filter(
      (file) => file,
    );

    if (data?.about?.thumbnail?.lowRes?.ref) {
      thumbnailLowResFiles = [];
    }

    let thumbnailHighResFiles = [data.about.thumbnail.highRes.file].filter(
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
      .filter((img) => !img.highRes.ref)
      .map((image) => image.highRes.file)
      .filter((file) => file);

    let videoFile = [];

    if (data?.about?.video) {
      videoFile.push(data?.about?.video.file);
      videoFile = videoFile.filter((file) => file);
    }

    if (data?.about?.video && data?.about?.video?.ref) {
      videoFile = [];
    }

    const oldId = data?.about?.thumbnail?.highRes?.ref?.split("/")[1];

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

  const processForm: SubmitHandler<SetUpBillingType> = async (data) => {
    setIsFormLoading(true);
    try {
      shopMethods.setValue("setUpBilling", data);
      setIsLoading(true);

      let stockYourShop = shopMethods.getValues("stockYourShop");

      setLoadingMessage("Uploading your product images");

      await storeInFirebase(stockYourShop);
      const modifiedData = { ...shopMethods.getValues(), stockYourShop };

      setLoadingMessage("Building your shop");
      await createShop(modifiedData);
      await refreshToken();
      router.refresh();
      router.push("/shop/dashboard");
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsFormLoading(false);
    }
  };

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
        shopMethods.watch(
          "howYouWillGetPaid.individual.personalInformation.countryOfResidence",
        ) ||
        shopMethods.watch("howYouWillGetPaid.business.businessAddress.country"),
      street:
        shopMethods.watch(
          "howYouWillGetPaid.individual.taxPayerAddress.streetAddress",
        ) ||
        shopMethods.watch(
          "howYouWillGetPaid.business.businessAddress.streetAddress",
        ),
      other:
        shopMethods.watch(
          "howYouWillGetPaid.individual.taxPayerAddress.other",
        ) ||
        shopMethods.watch("howYouWillGetPaid.business.businessAddress.other"),
      city:
        shopMethods.watch(
          "howYouWillGetPaid.individual.taxPayerAddress.city",
        ) ||
        shopMethods.watch("howYouWillGetPaid.business.businessAddress.city"),
      state:
        shopMethods.watch(
          "howYouWillGetPaid.individual.taxPayerAddress.state",
        ) ||
        shopMethods.watch("howYouWillGetPaid.business.businessAddress.state"),
      postalCode:
        shopMethods.watch(
          "howYouWillGetPaid.individual.taxPayerAddress.postalCode",
        ) ||
        shopMethods.watch(
          "howYouWillGetPaid.business.businessAddress.postalCode",
        ),
    };

    return address;
  };

  return (
    <>
      <div className="w-full">
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              methods.handleSubmit(processForm)();
            }}
          >
            <fieldset disabled={isFormLoading} className="w-full min-w-0">
              <div className="mt-10 w-full px-3 md:px-10">
                <h3 className="text-xl font-medium text-gray-800">
                  Billing Address
                </h3>
                <div className="w-full">
                  <BasicButton
                    className={
                      "whitespace-nowrap text-xs text-gray-600 hover:text-gray-700 hover:underline"
                    }
                    variant={"ghost"}
                    onClick={() => {
                      const address = getAddress();

                      methods.setValue(
                        "billingAddress.streetAddress",
                        address.street,
                      );
                      methods.setValue("billingAddress.city", address.city);
                      methods.setValue("billingAddress.state", address.state);
                      methods.setValue(
                        "billingAddress.postalCode",
                        address.postalCode,
                      );
                      methods.setValue(
                        "billingAddress.country",
                        address.country,
                      );
                      methods.setValue("billingAddress.other", address.other);
                    }}
                  >
                    use primary address
                  </BasicButton>
                </div>
              </div>

              <div className="mt-10 w-full  px-3 md:px-10">
                <BillingAddress />
              </div>
            </fieldset>

            <div className="mt-10 w-full px-10 pb-10">
              <div className="flex w-full items-center justify-end rounded-2xl bg-gray-100 px-6 py-6">
                <Button
                  isSpinning={isFormLoading}
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
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Form;
