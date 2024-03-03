"use client";

import { BasicButton } from "@/components/Button";
import useAuthStore from "@/store/authStore";
import useSidebarStore from "@/store/sidebarStore";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import Sidebar from "./Sidebar";
import Loading from "./loading";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { isMobileNavOpen, setIsMobileNavOpen } = useSidebarStore();
  const router = useRouter();

  return (
    <section className="h-[100dvh] overflow-hidden bg-gray-950 p-2">
      <main className="relative flex h-full w-full flex-grow items-start justify-start overflow-hidden rounded-2xl bg-white transition-all duration-150">
        <Sidebar />

        <div
          className={`absolute inset-0 flex h-[100dvh] w-full flex-col items-start justify-start transition-all duration-150 md:static`}
        >
          {/* topbar */}
          <div className="flex w-full items-center justify-between gap-10 border-b p-5">
            <div className="flex items-center justify-start gap-5">
              <AnimatePresence>
                {!isMobileNavOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="">
                <p className="text-sm font-medium text-gray-600">Welcome</p>
                <p className="mb-[0.45rem] mt-px text-xl font-medium text-gray-800">
                  {user?.displayName}
                </p>
              </div>
            </div>
          </div>
          {/* end of topbar */}

          <Suspense fallback={<Loading />}>
            <div className="h-full w-full flex-1 overflow-y-auto">
              {children}
            </div>
          </Suspense>
        </div>
      </main>
    </section>
  );
};

export default AdminDashboardLayout;
