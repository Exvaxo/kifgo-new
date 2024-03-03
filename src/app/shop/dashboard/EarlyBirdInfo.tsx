"use client";
import { BasicButton } from "@/components/Button";
import SideModal from "@/components/SideModal";
import React, { useState } from "react";

export const EarlyBirdInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <BasicButton
        onClick={() => setIsModalOpen(true)}
        variant={"ghost"}
        wrapperClass="w-full flex items-end justify-end"
        className="cursor-pointer text-left text-sm text-white"
      >
        <div className="relative rounded-xl bg-gradient-to-br from-gray-800 to-gray-950 p-5 @2xl:max-w-sm">
          With lots of discounts and guidance, we are going to add just 100,000
          products! To join our evolving seller force hurry up and list your
          ready-to-sell or post-sale products on Kifgo NOW.{" "}
          <span className="text-skin-primary"> More details</span>
        </div>
      </BasicButton>

      <SideModal
        className="ml-auto w-80 max-w-md rounded-r-none bg-skin-primary sm:w-full"
        onOpenChange={setIsModalOpen}
        open={isModalOpen}
      >
        <div className="w-full border-b border-white/30 pb-5">
          <SideModal.Close asChild>
            <BasicButton
              variant={"ghost"}
              className={"text-white/90 hover:text-white"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </BasicButton>
          </SideModal.Close>
          <SideModal.Title className="mt-5 max-w-md text-3xl font-bold text-white md:text-5xl">
            Benefits for early bird Registrations
          </SideModal.Title>
          <SideModal.Description className="mt-2 text-base text-white/80">
            Whoever registers with Kifgo before launch are our lucky early
            birds!
          </SideModal.Description>
        </div>

        <div className="mt-5 space-y-10">
          <div className="flex items-start justify-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 text-white"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
              />
            </svg>

            <div className="">
              <h3 className="text-base font-medium text-white">
                You will get an Early Bird badge
              </h3>
              <p className="mt-2 text-sm text-white/80">
                A badge will be provided to recognize our early bird members to
                have competitive edge and to ensure best service.
              </p>
            </div>
          </div>

          <div className="flex items-start justify-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 text-white"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
              />
            </svg>

            <div className="">
              <h3 className="text-base font-medium text-white">
                Early Access to All new features
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Exclusive access to our exciting new features and tools for all
                early bird members.
              </p>
            </div>
          </div>

          <div className="flex items-start justify-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 text-white"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
              />
            </svg>

            <div className="">
              <h3 className="text-base font-medium text-white">
                No Listing Fees
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Listing fees and related commissions are wiped off for our early
                bird members.
              </p>
            </div>
          </div>

          <div className="flex items-start justify-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 text-white"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
              />
            </svg>

            <div className="">
              <h3 className="text-base font-medium text-white">
                Rapid Customer Support
              </h3>
              <p className="mt-2 text-sm text-white/80">
                All our early bird members&apos; queries will be prioritized for
                their whole lifetime.
              </p>
            </div>
          </div>

          <div className="flex items-start justify-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 text-white"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"
              />
            </svg>

            <div className="">
              <h3 className="text-base font-medium text-white">
                Support through Training
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Priority allotment is ensured for all our free training
                sessions and workshops.
              </p>
            </div>
          </div>
        </div>
      </SideModal>
    </>
  );
};
