"use client";
import { ShopSchema, ShopType } from "@/app/schema/ShopSchema";
import Spinner from "@/components/Spinner";
import useAuthStore from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Suspense, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Steps from "./Steps";
import useOnBaordingStepStore from "@/store/onBoardingStepStore";
import { usePathname, useRouter } from "next/navigation";
import Loading from "./loading";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { AnimatePresence, motion } from "framer-motion";

const OnBoardinglayout = ({ children }: { children: React.ReactNode }) => {
  const { steps } = useOnBaordingStepStore();
  const router = useRouter();
  const path = usePathname();
  const { fetchUserLoading } = useAuthStore();

  useEffect(() => {
    const [lastActiveStep] = steps
      .sort((a, b) => a.step - b.step)
      .filter((step) => step.started);

    const [currentStep] = steps.filter((step) => step.href === path);

    if (currentStep.started || currentStep.done) {
      router.push(currentStep.href);
    } else {
      router.push(lastActiveStep.href);
    }
  }, [path]);

  useEffect(() => {
    const root = "/shop/onboarding";
    router.prefetch(`${root}/shop-name`);
    router.prefetch(`${root}/stock-your-shop`);
    router.prefetch(`${root}/how-you-will-get-paid`);
    router.prefetch(`${root}/set-up-billing`);
  }, []);

  const shop = useForm<ShopType>({
    mode: "all",
    defaultValues: {
      stockYourShop: {
        about: {
          personalization: {
            isPersonalization: false,
            isOptional: false,
            prompt: "",
          },
        },
        pricing: {
          quantity: 1,
        },
        details: {
          type: "physical",
        },

        settings: {
          featured: false,
          policyId: "",
          section: "",
        },
      },
      howYouWillGetPaid: {
        bankLocation: "Sri Lanka",
        individual: {
          personalInformation: {
            countryOfResidence: "Sri Lanka",
            nationality: "Sri Lankan",
          },

          taxPayerAddress: {
            businessPhoneNumber: {
              countryCode: "+94_LK",
            },
          },
        },
      },
      setUpBilling: {
        billingAddress: {
          country: "Sri Lanka",
        },
      },
    },

    resolver: zodResolver(ShopSchema),
  });

  const { isLoading, loadingMessage } = useOnBaordingStepStore();

  return (
    <>
      <AnimatePresence initial={false}>
        {!isLoading ? (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <section className="h-[100dvh] bg-gray-950 p-2">
              <div className="flex h-full w-full overflow-hidden rounded-2xl bg-white">
                <div className="relative hidden h-full w-[30%] grow flex-col overflow-y-auto overflow-x-hidden bg-gradient-to-l from-gray-100 to-white lg:flex">
                  <div className="flex w-full flex-1 flex-col items-center justify-center">
                    <div className="flex w-full flex-col items-center justify-center p-5">
                      <div className="flex w-full flex-col items-center justify-center gap-8 text-sm text-gray-800">
                        <div className="flex gap-5">
                          <svg
                            className="w-24"
                            viewBox="0 0 1327 450"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_9_43)">
                              <path
                                d="M176.5 353.77C273.978 353.77 353 274.748 353 177.27C353 79.7918 273.978 0.77002 176.5 0.77002C79.0217 0.77002 0 79.7918 0 177.27C0 274.748 79.0217 353.77 176.5 353.77Z"
                                fill="#C3095A"
                              />
                              <path
                                d="M156.17 227.03C140.74 239.44 121.12 246.87 99.78 246.87C78.8 246.87 59.48 239.69 44.17 227.66L31.11 243.22C49.96 258.21 73.82 267.17 99.77 267.17C126.09 267.17 150.25 257.96 169.22 242.59L156.17 227.03Z"
                                fill="white"
                              />
                              <path
                                d="M99.69 87.36C80.52 87.36 63.16 95.13 50.59 107.7C38.02 120.26 30.25 137.62 30.25 156.8C30.25 195.15 61.34 226.24 99.69 226.24C138.04 226.24 169.13 195.15 169.13 156.8V87.36H99.69ZM99.69 205.92C72.56 205.92 50.56 183.92 50.56 156.79C50.56 129.66 72.56 107.66 99.69 107.66C126.82 107.66 148.82 129.66 148.82 156.79C148.82 183.93 126.83 205.92 99.69 205.92Z"
                                fill="white"
                              />
                              <path
                                d="M253.31 87.36C234.14 87.36 216.78 95.13 204.21 107.7C191.64 120.26 183.87 137.62 183.87 156.8C183.87 195.52 215.57 226.84 254.43 226.23C292.01 225.64 322.74 193.8 322.74 156.22C322.74 118.19 291.91 87.37 253.89 87.37H253.31V87.36ZM253.34 205.92C226.18 205.94 204.15 183.92 204.17 156.75C204.19 130.04 226.56 107.68 253.26 107.66C280.42 107.64 302.44 129.66 302.43 156.83C302.42 183.54 280.05 205.9 253.34 205.92Z"
                                fill="white"
                              />
                              <path
                                d="M450 213.13L556.98 105.68C560.39 102.26 565.02 100.33 569.85 100.33C586.04 100.33 594.14 119.93 582.66 131.35L503.71 209.95L592.52 322.83C602.54 335.56 593.47 354.24 577.27 354.24C571.36 354.24 565.78 351.55 562.1 346.93L473.69 236.07L450 258.54V333C450 344.73 440.49 354.24 428.76 354.24C417.03 354.24 407.52 344.73 407.52 333V23.19C407.52 11.46 417.03 1.95001 428.76 1.95001C440.49 1.95001 450 11.46 450 23.19V213.13Z"
                                fill="black"
                              />
                              <path
                                d="M656.43 57.62C649.27 57.62 643.08 55.02 637.88 49.81C632.67 44.6 630.07 38.42 630.07 31.26C630.07 23.94 632.67 17.71 637.88 12.58C643.09 7.45001 649.27 4.89001 656.43 4.89001C663.75 4.89001 670.02 7.45001 675.23 12.58C680.44 17.71 683.04 23.93 683.04 31.26C683.04 38.42 680.43 44.61 675.23 49.81C670.02 55.02 663.76 57.62 656.43 57.62ZM635.19 333.01V121.58C635.19 109.85 644.7 100.34 656.43 100.34C668.16 100.34 677.67 109.85 677.67 121.58V333.01C677.67 344.74 668.16 354.25 656.43 354.25C644.7 354.25 635.19 344.74 635.19 333.01Z"
                                fill="black"
                              />
                              <path
                                d="M733.72 333.01V135.25H715.78C706.14 135.25 698.32 127.43 698.32 117.79C698.32 108.15 706.14 100.33 715.78 100.33H733.72V72.02C733.72 47.61 739.46 29.5 750.93 17.7C762.41 5.9 779.86 0 803.3 0C806.47 0 809.58 0.08 812.63 0.24C821.89 0.72 829.18 8.31 829.18 17.58C829.18 27.24 821.28 35.07 811.62 34.93C811.04 34.92 810.46 34.92 809.89 34.92C787.27 34.92 775.95 47.37 775.95 72.27V100.35H810.5C820.14 100.35 827.96 108.17 827.96 117.81C827.96 127.45 820.14 135.27 810.5 135.27H776.2V333.02C776.2 344.75 766.69 354.26 754.96 354.26C743.23 354.25 733.72 344.74 733.72 333.01Z"
                                fill="black"
                              />
                              <path
                                d="M949.43 449.95C921.6 449.95 897.67 442.91 877.65 428.83C868.75 422.57 861.47 415.56 855.82 407.81C845.95 394.27 855.66 375.25 872.42 375.25H873.21C880.39 375.25 886.94 379.08 890.77 385.16C895.3 392.37 901.67 398.43 909.88 403.33C921.6 410.33 935.35 413.83 951.14 413.83C972.95 413.83 990.16 408.05 1002.78 396.5C1015.39 384.94 1021.7 369.64 1021.7 350.6V310.56H1020.72C1012.74 324.56 1001.59 335.67 987.27 343.89C972.95 352.11 957 356.22 939.42 356.22C907.03 356.22 881.07 344.42 861.54 320.82C842.01 297.22 832.24 265.73 832.24 226.34C832.24 186.63 842.04 154.97 861.66 131.37C881.27 107.77 907.52 95.97 940.4 95.97C958.3 95.97 974.42 100.12 988.74 108.42C1003.06 116.72 1014.45 128.28 1022.92 143.09H1023.65V120.63C1023.65 109.44 1032.72 100.37 1043.91 100.37C1055.1 100.37 1064.17 109.44 1064.17 120.63V349.15C1064.17 379.58 1053.75 404 1032.92 422.39C1012.09 440.75 984.26 449.95 949.43 449.95ZM947.97 318.85C970.1 318.85 987.93 310.39 1001.44 293.46C1014.95 276.53 1021.7 254.15 1021.7 226.32C1021.7 198.33 1014.94 175.82 1001.44 158.82C987.93 141.81 970.11 133.31 947.97 133.31C926 133.31 908.46 141.73 895.36 158.58C882.26 175.43 875.71 198.01 875.71 226.33C875.71 254.65 882.26 277.15 895.36 293.83C908.45 310.51 925.99 318.85 947.97 318.85Z"
                                fill="black"
                              />
                              <path
                                d="M1209.58 358.64C1174.1 358.64 1145.62 346.8 1124.13 323.12C1102.64 299.44 1091.9 267.5 1091.9 227.29C1091.9 187.09 1102.64 155.15 1124.13 131.46C1145.62 107.77 1174.09 95.94 1209.58 95.94C1244.9 95.94 1273.3 107.78 1294.79 131.46C1316.28 155.14 1327.02 187.09 1327.02 227.29C1327.02 267.33 1316.28 299.23 1294.79 322.99C1273.3 346.76 1244.89 358.64 1209.58 358.64ZM1155.26 296.39C1168.69 312.99 1186.79 321.29 1209.58 321.29C1232.37 321.29 1250.43 313.03 1263.78 296.51C1277.12 279.99 1283.8 256.92 1283.8 227.3C1283.8 197.68 1277.12 174.61 1263.78 158.09C1250.43 141.57 1232.37 133.31 1209.58 133.31C1186.79 133.31 1168.69 141.61 1155.26 158.21C1141.83 174.81 1135.12 197.84 1135.12 227.3C1135.11 256.76 1141.83 279.79 1155.26 296.39Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_9_43">
                                <rect
                                  width="1327.01"
                                  height="449.95"
                                  fill="white"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <Steps />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex h-full w-[70%] grow flex-col overflow-y-auto overflow-x-hidden">
                  <div className="flex w-full flex-1 flex-col items-center justify-center">
                    <div className="flex w-full flex-col items-center justify-center">
                      <Suspense fallback={<Loading />}>
                        {fetchUserLoading ? (
                          <div className="">
                            <Spinner size={"sm"} className="text-gray-800" />
                          </div>
                        ) : (
                          <FormProvider {...shop}>{children}</FormProvider>
                        )}
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-[100dvh] w-full flex-col items-center justify-center"
          >
            <Player
              src={"/shop_loading.json"}
              autoplay
              className="w-full max-w-sm"
              loop
            />
            <div className="-mt-5 flex items-center justify-start">
              <Spinner className="h-4 text-gray-500" />
              <h3 className="whitespace-nowrap text-xs text-gray-600">
                {loadingMessage}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OnBoardinglayout;
