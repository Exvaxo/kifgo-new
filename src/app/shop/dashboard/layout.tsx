"use client";

import { BasicButton, ButtonVariants } from "@/components/Button";
import useAuthStore from "@/store/authStore";
import useSidebarStore from "@/store/sidebarStore";
import React, { Suspense } from "react";
import Sidebar from "./Sidebar";
import Loading from "./loading";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useOnBaordingStepStore from "@/store/onBoardingStepStore";
import { Player } from "@lottiefiles/react-lottie-player";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { cn } from "@/utilities/cn";

const SellerDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { isMobileNavOpen, setIsMobileNavOpen } = useSidebarStore();
  const router = useRouter();
  const { isLoading, loadingMessage } = useOnBaordingStepStore();

  return (
    <section className="h-[100dvh] overflow-hidden bg-gray-950 p-2">
      <motion.main
        layout
        className="relative flex h-full w-full flex-grow items-start justify-start overflow-hidden rounded-2xl bg-white transition-all duration-150"
      >
        {isLoading ? (
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
        ) : (
          <>
            <Sidebar />

            <div
              className={`absolute inset-0 flex h-[100dvh] w-full flex-col items-start justify-start overflow-y-auto transition-all duration-150 md:static`}
            >
              {/* topbar */}
              <div className="flex w-full items-center justify-between gap-10 border-b p-5">
                <div className="flex items-center justify-start gap-5">
                  <BasicButton
                    variant={"secondary"}
                    className={"p-3 md:p-3"}
                    onClick={() => {
                      setTimeout(() => {
                        setIsMobileNavOpen((pv) => !pv);
                      }, 100);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="1.5"
                        d="M4 7h3m13 0h-9m9 10h-3M4 17h9m-9-5h16"
                      />
                    </svg>
                  </BasicButton>
                  <div className="">
                    <p className="text-sm font-medium text-gray-600">Welcome</p>
                    <p className="mt-px text-lg font-medium text-gray-800">
                      {user?.displayName}
                    </p>
                  </div>
                </div>

                <div className="">
                  <Link
                    href={"/shop/dashboard/listing/create"}
                    className={cn(
                      ButtonVariants({
                        variant: "primary",
                        className: "block",
                      }),
                    )}
                  >
                    Create Product
                  </Link>
                </div>
              </div>
              {/* end of topbar */}

              <Suspense fallback={<Loading />}>
                <div className="h-full w-full flex-1">{children}</div>
              </Suspense>
            </div>
          </>
        )}
      </motion.main>
    </section>
  );
};

export default SellerDashboardLayout;
