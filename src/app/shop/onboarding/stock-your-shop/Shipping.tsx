"use client";
import useCreateShippingProfile from "@/app/client-apis/seller/shipping/useCreateShippingProfile";
import useDeleteShippingProfile from "@/app/client-apis/seller/shipping/useDeleteShippingProfile";
import useGetShippingProfile from "@/app/client-apis/seller/shipping/useGetShippingProfile";
import useGetShippingProfiles from "@/app/client-apis/seller/shipping/useGetShippingProfiles";
import useUpdateShippingProfile from "@/app/client-apis/seller/shipping/useUpdateShippingProfile";
import { StockYouShopType } from "@/app/schema/StockYourShopSchema";
import { BasicButton, Button } from "@/components/Button";
import Menu, { MenuItem } from "@/components/Menu";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import Input from "@/components/form-elements/Input";
import Radio, { RadioItem } from "@/components/form-elements/Radio";
import {
  Option,
  OptionLabel,
  Select,
  SelectGroup,
} from "@/components/form-elements/Select";
import useGetPreviousState from "@/hooks/useGetPreviousState";
import arrayOf from "@/utilities/arrayOf";
import countriesWithDialCode from "@/utilities/countriesWithDialCode";
import isValid from "@/utilities/isValid";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums, Prisma } from "@prisma/client";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import useMeasure from "react-use-measure";
import { z } from "zod";

interface IShippingProfile {}

enum Step {
  SELECT = 1,
  CREATE = 2,
  EDIT = 3,
}

const Shipping = forwardRef<HTMLElement, IShippingProfile>(({}, ref) => {
  const rootFormMethods = useFormContext<StockYouShopType>();

  const {
    data: shippingProfiles,
    isLoading: isShippingProfilesLoading,
    refetch: refetchShippingProfiles,
  } = useGetShippingProfiles();

  const [step, setStep] = useState(Step.SELECT);
  const [openShippingModal, setOpenShippingModal] = useState(false);
  const [editId, setEditId] = useState("");

  const prev = useGetPreviousState(step);
  const direction: 1 | -1 = prev && prev < step ? 1 : -1;
  const [containerRef, { width }] = useMeasure();

  const variants: Variants = {
    initial: (direction) => ({
      x: direction * width,
    }),
    animate: {
      x: 0,
    },
    exit: (direction) => ({
      x: direction * -width,
    }),
  };

  return (
    <section ref={ref} id="shipping" className="mb-10 w-full px-3 md:px-10">
      <div className="flex w-full items-center justify-between gap-10">
        <div className="">
          <h3
            className={`inline-flex items-center text-lg font-medium ${
              rootFormMethods.formState.errors.shipping?.message
                ? "text-red-600"
                : "text-gray-800"
            }`}
          >
            {rootFormMethods.formState.errors.shipping?.message && (
              <svg className="mr-1 h-5 w-5 text-red-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            Shipping
          </h3>
          {rootFormMethods.formState.errors.shipping?.message ? (
            <p className="mt-1 text-xs text-red-600">
              Shipping profile is required.
            </p>
          ) : (
            <p className="mt-1 text-xs text-gray-600">
              Set clear and realistic shipping expectations for shoppers by
              providing an estimated processing time.
            </p>
          )}
        </div>

        <Button
          onClick={() => setOpenShippingModal(true)}
          variant={"secondary"}
        >
          <div className="whitespace-nowrap">Select Profile</div>
        </Button>

        <Modal
          className="max-w-3xl p-0 sm:p-0"
          open={openShippingModal}
          onOpenChange={setOpenShippingModal}
        >
          <div ref={containerRef} className="relative w-full">
            <MotionConfig transition={{ type: "spring", damping: 15 }}>
              <div className="w-full">
                <div className="relative h-full w-full">
                  <AnimatePresence
                    mode="popLayout"
                    initial={false}
                    custom={direction}
                  >
                    <motion.div
                      key={step}
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={direction}
                      className="w-full overflow-hidden"
                    >
                      {step === 1 && (
                        <div className="w-full">
                          <div className="sticky inset-x-0 top-0 z-[999999999999999] bg-white p-4 pb-3 sm:p-6 sm:pb-3">
                            <div className="relative w-full">
                              <div className="absolute right-0 top-0">
                                <Modal.Close asChild>
                                  <BasicButton
                                    variant={"ghost"}
                                    className={
                                      "text-gray-400 hover:text-gray-500"
                                    }
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
                                </Modal.Close>
                              </div>
                              <Modal.Title className="text-base font-medium text-gray-800 sm:text-lg">
                                Shipping Options
                              </Modal.Title>
                              <Modal.Description className="mt-1 text-xs text-gray-600">
                                List all the shipping options you offer. Buyers
                                can see them all and select what they prefer
                                while purchasing.
                              </Modal.Description>
                            </div>
                          </div>

                          {!isShippingProfilesLoading &&
                            (!shippingProfiles ||
                              (shippingProfiles &&
                                shippingProfiles?.length <= 0)) && (
                              <div className="flex h-[79dvh] w-full flex-col items-center justify-center p-4 pt-0 sm:p-6 sm:pt-0">
                                <div className="flex w-full flex-col items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="aspect-square w-16 text-gray-400"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M21 15.998v-6c0-2.828 0-4.242-.879-5.121C19.353 4.109 18.175 4.012 16 4H8c-2.175.012-3.353.109-4.121.877C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122c.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878c.879-.88.879-2.293.879-5.122"
                                      opacity=".5"
                                    />
                                    <path
                                      fill="currentColor"
                                      d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"
                                    />
                                    <path
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      d="M6.25 10.5A.75.75 0 0 1 7 9.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M6.25 14a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75m-3.5 3.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m3.5 0a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <h4 className="mt-3 text-sm font-medium text-gray-800">
                                    No Profiles
                                  </h4>

                                  <p className="mt-1 text-center text-xs text-gray-600">
                                    Get started by creating a profile.
                                  </p>

                                  <Button
                                    onClick={() => setStep(Step.CREATE)}
                                    wrapperClass="mt-5"
                                    variant={"secondary"}
                                    className={
                                      "flex w-full items-center justify-center whitespace-nowrap"
                                    }
                                  >
                                    Create profile
                                  </Button>
                                </div>
                              </div>
                            )}

                          {!isShippingProfilesLoading &&
                            shippingProfiles &&
                            rootFormMethods.watch("shipping.profile") &&
                            shippingProfiles
                              .filter(
                                (prof) =>
                                  prof.id ===
                                  rootFormMethods.watch("shipping.profile"),
                              )
                              .map((profile) => (
                                <div
                                  key={profile.id}
                                  className="my-10 px-4 md:px-6"
                                >
                                  <ShippingProfile
                                    setEditId={setEditId}
                                    setStep={setStep}
                                    setOpenShippingModal={setOpenShippingModal}
                                    profile={profile}
                                    refetch={refetchShippingProfiles}
                                    selected
                                  />
                                </div>
                              ))}

                          {!isShippingProfilesLoading &&
                            shippingProfiles &&
                            shippingProfiles.length > 0 && (
                              <div className="mb-5 mt-10 px-4 sm:px-6">
                                <div className="mb-5 flex w-full flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-10">
                                  <div className="">
                                    <h2 className="text-sm font-medium text-gray-800">
                                      Available profiles
                                    </h2>
                                    <p className="mt-1 text-xs text-gray-700">
                                      Select your profile from here.
                                    </p>
                                  </div>

                                  <Button
                                    onClick={() => setStep(Step.CREATE)}
                                    wrapperClass="w-full md:w-min"
                                    variant={"secondary"}
                                    className={
                                      "flex w-full items-center justify-center whitespace-nowrap"
                                    }
                                  >
                                    Create profile
                                  </Button>
                                </div>
                                <div className="flex w-full flex-col items-start justify-start gap-5">
                                  {!isShippingProfilesLoading &&
                                    shippingProfiles &&
                                    shippingProfiles
                                      .filter(
                                        (profile) =>
                                          profile.id !==
                                            rootFormMethods.watch(
                                              "shipping.profile",
                                            ) || "",
                                      )
                                      .map((profile) => (
                                        <ShippingProfile
                                          setEditId={setEditId}
                                          setOpenShippingModal={
                                            setOpenShippingModal
                                          }
                                          setStep={setStep}
                                          key={profile.id}
                                          profile={profile}
                                          refetch={refetchShippingProfiles}
                                        />
                                      ))}
                                </div>
                              </div>
                            )}

                          {isShippingProfilesLoading && (
                            <div className="my-10 w-full space-y-5 px-4 md:px-6">
                              <ProfileSkeleton />
                              <ProfileSkeleton />
                              <ProfileSkeleton />
                            </div>
                          )}
                        </div>
                      )}

                      {step === 2 && (
                        <CreateShippingProfile
                          setOpenShippingModal={setOpenShippingModal}
                          setStep={setStep}
                          refetchShippingProfiles={refetchShippingProfiles}
                        />
                      )}

                      {step === 3 && (
                        <EditShippingProfile
                          editId={editId}
                          setEditId={setEditId}
                          setOpenShippingModal={setOpenShippingModal}
                          setStep={setStep}
                          refetchShippingProfiles={refetchShippingProfiles}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </MotionConfig>
          </div>
        </Modal>
      </div>

      {!isShippingProfilesLoading &&
        shippingProfiles &&
        rootFormMethods.watch("shipping.profile") &&
        shippingProfiles
          .filter(
            (prof) => prof.id === rootFormMethods.watch("shipping.profile"),
          )
          .map((profile) => (
            <div key={profile.id} className="my-10">
              <ShippingProfile
                setEditId={setEditId}
                setOpenShippingModal={setOpenShippingModal}
                setStep={setStep}
                profile={profile}
                refetch={refetchShippingProfiles}
                selected
              />
            </div>
          ))}
    </section>
  );
});

const ShippingProfile = ({
  setEditId,
  setStep,
  setOpenShippingModal,
  profile,
  refetch,
  selected = false,
}: {
  setEditId: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<Step>>;
  setOpenShippingModal: Dispatch<SetStateAction<boolean>>;
  profile: Prisma.ShippingGetPayload<{ include: { _count: true } }>;
  refetch: any;
  selected?: boolean;
}) => {
  const rootFormMethods = useFormContext<StockYouShopType>();

  const [openMenu, setOpenMenu] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutateAsync: deleteProfile } = useDeleteShippingProfile();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!openMenu) {
      setConfirmDelete(false);
    }
  }, [openMenu]);

  return (
    <div
      key={profile.id}
      className="relative flex w-full items-center justify-between gap-10 rounded-xl border p-5"
    >
      {selected && (
        <div className="absolute inset-x-0 top-0 flex items-center justify-center">
          <div className="-mt-3 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800">
            Selected Profile
          </div>
        </div>
      )}

      <div className="">
        <h3 className="text-sm font-medium text-gray-800">
          {profile.name}{" "}
          <span className="ml-2 rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
            {" "}
            {profile._count.ProductShipping} listings
          </span>
        </h3>

        <p className="mt-2 text-xs text-gray-600">
          {profile.processing_time.min} to {profile.processing_time.max}{" "}
          Business {profile.processing_time.type.toLowerCase()}, from{" "}
          {profile.origin_postal_code}
        </p>
      </div>

      <div className="flex items-center justify-end gap-3">
        {!selected && (
          <Button
            onClick={() => {
              setOpenShippingModal(false);
              rootFormMethods.setValue("shipping.profile", profile.id);
              rootFormMethods.clearErrors("shipping");
            }}
            variant={"secondary"}
          >
            Select
          </Button>
        )}

        <Menu
          open={openMenu}
          setOpen={setOpenMenu}
          Contents={({ closeMenu }) => (
            <>
              <div className="min-w-[10rem] px-5 pb-2 pt-5">
                <h3 className="mb-2 text-[0.6rem] font-medium uppercase tracking-wider text-gray-300">
                  Options
                </h3>
                <MenuItem
                  className="-mx-3 flex items-center gap-2 px-3 py-3"
                  closeMenu={closeMenu}
                  onSelect={() => {
                    setStep(Step.EDIT);
                    setEditId(profile.id);
                  }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M1 12c0-5.185 0-7.778 1.61-9.39C4.223 1 6.816 1 12 1c5.185 0 7.778 0 9.39 1.61C23 4.223 23 6.816 23 12c0 5.185 0 7.778-1.61 9.39C19.777 23 17.184 23 12 23c-5.185 0-7.778 0-9.39-1.61C1 19.777 1 17.184 1 12"
                        opacity=".5"
                      />
                      <path
                        fill="currentColor"
                        d="M13.926 14.302c.245-.191.467-.413.912-.858l5.54-5.54c.134-.134.073-.365-.106-.427a6.066 6.066 0 0 1-2.3-1.449a6.066 6.066 0 0 1-1.45-2.3c-.061-.18-.292-.24-.426-.106l-5.54 5.54c-.445.444-.667.667-.858.912a5.045 5.045 0 0 0-.577.932c-.133.28-.233.579-.431 1.175l-.257.77l-.409 1.226l-.382 1.148a.817.817 0 0 0 1.032 1.033l1.15-.383l1.224-.408l.77-.257c.597-.199.895-.298 1.175-.432a5.03 5.03 0 0 0 .933-.576m8.187-8.132a3.028 3.028 0 0 0-4.282-4.283l-.179.178a.734.734 0 0 0-.206.651c.027.15.077.37.168.633a4.911 4.911 0 0 0 1.174 1.863a4.91 4.91 0 0 0 1.862 1.174c.263.09.483.141.633.168c.24.043.48-.035.652-.207z"
                      />
                    </svg>
                  </span>
                  Edit
                </MenuItem>
                {profile._count.Product <= 0 && (
                  <MenuItem
                    className="-mx-3 flex items-center gap-2 px-3 py-3 data-[highlighted]:bg-red-700"
                    onSelect={async () => {
                      if (!confirmDelete) {
                        setConfirmDelete(true);
                        return;
                      }
                      setIsLoading(true);
                      await deleteProfile(profile.id);
                      await refetch();
                      closeMenu();

                      setTimeout(() => {
                        setConfirmDelete(false);
                        setIsLoading(false);
                      }, 200);
                    }}
                    closeMenu={() => {}}
                  >
                    {!confirmDelete && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877"
                        />
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M9.425 11.482c.413-.044.78.273.821.707l.5 5.263c.041.433-.26.82-.671.864c-.412.043-.78-.273-.821-.707l-.5-5.263c-.041-.434.26-.821.671-.864m5.15 0c.412.043.713.43.671.864l-.5 5.263c-.04.434-.408.75-.82.707c-.413-.044-.713-.43-.672-.864l.5-5.264c.041-.433.409-.75.82-.707"
                          clipRule="evenodd"
                        />
                        <path
                          fill="currentColor"
                          d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886"
                          opacity=".5"
                        />
                      </svg>
                    )}
                    <span>
                      {isLoading
                        ? "Deleting..."
                        : confirmDelete
                        ? "Confirm Delete ?"
                        : "Delete"}
                    </span>
                  </MenuItem>
                )}
              </div>
            </>
          )}
        >
          <BasicButton
            onClick={() => setOpenMenu(true)}
            variant={"secondary"}
            className={"aspect-square p-3 md:p-3"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m14 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
              />
              <path
                fill="currentColor"
                d="M14 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
                opacity=".5"
              />
            </svg>
          </BasicButton>
        </Menu>
      </div>
    </div>
  );
};

export const CreateShippingProfileSchema = z.object({
  country_of_origin: z
    .string({ required_error: "Country of origin is required." })
    .trim()
    .min(1, "Country of origin is required."),

  origin_postal_code: z
    .string({ required_error: "Origin of postal is required." })
    .trim()
    .min(1, "Origin of postal is required."),

  processing_time: z.object({
    value: z.string().trim(),
    type: z
      .nativeEnum($Enums.ProcessingTime)
      .default($Enums.ProcessingTime.DAYS),
    min: z
      .string({ required_error: "Minimum processing time is required." })
      .trim()
      .min(1, "Minimum processing time is required.")
      .transform(Number)
      .pipe(
        z
          .number({ invalid_type_error: "Invalid number format." })
          .min(1, "Minimum processing time is 1")
          .max(10, "Maximum processing time is 10"),
      )
      .transform(String),
    max: z
      .string({ required_error: "Maximum processing time is required." })
      .trim()
      .min(1, "Maximum processing time is required.")
      .transform(Number)
      .pipe(
        z
          .number({ invalid_type_error: "Invalid number format." })
          .min(1, "Minimum processing time is 1")
          .max(10, "Maximum processing time is 10"),
      )
      .transform(String),
  }),

  standard_shipping: z.array(
    z.object({
      country: z
        .string({ required_error: "Country is required." })
        .trim()
        .min(1, "Country is required."),

      shipping_service: z
        .string({ required_error: "Shipping service is required." })
        .trim()
        .min(1, "Shipping service is required."),

      delivery_time: z.object({
        min: z
          .string({ required_error: "Minimum delivery time is required." })
          .trim()
          .min(1, "Minimum delivery time is required.")
          .transform(Number)
          .pipe(
            z
              .number({ invalid_type_error: "Invalid number format." })
              .min(1, "Minimum delivery time is 1")
              .max(45, "Maximum delivery time is 45"),
          )
          .transform(String),
        max: z
          .string({ required_error: "Maximum delivery time is required." })
          .trim()
          .min(1, "Maximum delivery time is required.")
          .transform(Number)
          .pipe(
            z
              .number({ invalid_type_error: "Invalid number format." })
              .min(1, "Minimum delivery time is 1")
              .max(45, "Maximum delivery time is 45"),
          )
          .transform(String),
      }),

      charge: z
        .object({
          type: z
            .nativeEnum($Enums.ShippingCharge)
            .default($Enums.ShippingCharge.FREE),

          one_item: z
            .string()
            .trim()
            .transform(Number)
            .pipe(
              z
                .number({ invalid_type_error: "Invalid currency format." })
                .min(0, "Price must be above 0."),
            )
            .transform(String)
            .pipe(
              z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid currency format."),
            )
            .optional()
            .or(z.literal("")),

          additional_item: z
            .string()
            .trim()
            .transform(Number)
            .pipe(
              z
                .number({ invalid_type_error: "Invalid currency format." })
                .min(0, "Price must be above 0."),
            )
            .transform(String)
            .pipe(
              z.string().regex(/^-?\d+(\.\d+)?$/, "Invalid currency format."),
            )
            .optional()
            .or(z.literal("")),
        })
        .refine(
          (data) =>
            !(
              parseInt(data.additional_item || "0") >
              parseInt(data.one_item || "0")
            ),
          {
            message: "Additional item must be less than one item.",
            path: ["additional_item"],
          },
        ),
    }),
  ),

  name: z
    .string({ required_error: "Profile name is required." })
    .trim()
    .min(3, "Profile name must be more than 3 characters long."),
});

export type CreateShippingProfileInputType = z.infer<
  typeof CreateShippingProfileSchema
>;

const CreateShippingProfile = ({
  refetchShippingProfiles,
  setStep,
  setOpenShippingModal,
}: {
  refetchShippingProfiles: any;
  setStep: Dispatch<SetStateAction<Step>>;
  setOpenShippingModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    watch,
    setError,
    control,
    getValues,
    clearErrors,
    setValue,
    setFocus,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateShippingProfileInputType>({
    mode: "all",
    defaultValues: {
      country_of_origin: "Sri Lanka",
      processing_time: {
        type: $Enums.ProcessingTime.DAYS,
      },
      standard_shipping: [
        {
          country: "Sri Lanka",
          shipping_service: undefined,
          delivery_time: {
            min: "",
            max: "",
          },
          charge: {
            type: $Enums.ShippingCharge.FREE,
            one_item: "",
            additional_item: "",
          },
        },
      ],
    },
    resolver: zodResolver(CreateShippingProfileSchema),
  });

  const standardShippingArray = useFieldArray({
    control,
    name: "standard_shipping",
  });

  const filteredCountries = useMemo(() => {
    const dialCodes = JSON.parse(
      JSON.stringify(countriesWithDialCode),
    ) as typeof countriesWithDialCode;
    const selectedOptions = watch("standard_shipping").map(
      (opt) => opt.country,
    );

    return dialCodes.filter(
      (country) => !selectedOptions.includes(country.name),
    );
  }, [watch("standard_shipping")]);

  const [isCreateShippingProfileLoading, setIsCreateShippingProfileLoading] =
    useState(false);

  const { mutateAsync: createShippingProfile } = useCreateShippingProfile();

  const processForm: SubmitHandler<CreateShippingProfileInputType> = async (
    data,
  ) => {
    try {
      setIsCreateShippingProfileLoading(true);
      await createShippingProfile(data);
      await refetchShippingProfiles();
      setStep(Step.SELECT);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsCreateShippingProfileLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(processForm)();
      }}
      className="w-full"
    >
      <div className="sticky inset-x-0 top-0 z-[999999999999999] bg-white p-4 pb-3 sm:p-6 sm:pb-3">
        <div className="relative flex w-full items-start justify-start gap-5">
          <div className="absolute right-0 top-0">
            <Modal.Close asChild>
              <BasicButton
                variant={"ghost"}
                className={"text-gray-400 hover:text-gray-500"}
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
            </Modal.Close>
          </div>
          <BasicButton
            onClick={() => setStep(Step.SELECT)}
            variant={"ghost"}
            className={
              "flex items-center justify-center bg-gray-200 p-2 hover:bg-gray-100 data-[pressed]:bg-gray-100 md:p-2"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0 text-gray-800"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 12H4m0 0l6-6m-6 6l6 6"
              />
            </svg>
          </BasicButton>
          <div className="">
            <Modal.Title className="text-base font-medium text-gray-800 sm:text-lg">
              Create Shipping Profile
            </Modal.Title>
            <Modal.Description className="mt-1 text-xs text-gray-600">
              Add all the options available for shipping. These details will
              help increase sales and customer bonding.
            </Modal.Description>
          </div>
        </div>
      </div>
      <fieldset disabled={isCreateShippingProfileLoading}>
        <div className="mt-10 w-full p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="w-full space-y-8">
            <Select
              label="Country of origin"
              SubLabel={() => (
                <p className="mb-2 text-xs text-gray-600">
                  The country you&apos;re shipping from
                </p>
              )}
              defaultValue="Sri Lanka"
              value={watch("country_of_origin")}
              onValueChange={(val) => {
                setValue("country_of_origin", val);
                trigger(`country_of_origin`);
              }}
              disabled
              placeholder="Select a country"
              error={errors.country_of_origin?.message}
            >
              {countriesWithDialCode.map((country) => (
                <Option key={country.code + country.name} value={country.name}>
                  <span className="sr-only">{country.name}</span>
                  {country.emoji} {country.name}
                </Option>
              ))}
            </Select>

            <Input
              label="Origin postal code"
              SubLabel={() => (
                <p className="mb-2 text-xs text-gray-600">
                  Where do you ship packages from?
                </p>
              )}
              placeholder="Enter postal code"
              {...register("origin_postal_code")}
              error={errors.origin_postal_code?.message}
            />
            <div className="flex w-full flex-col items-end justify-start gap-8 md:flex-row md:gap-10">
              <Select
                label="Processing time"
                SubLabel={() => (
                  <p className="mb-2 text-xs text-gray-600">
                    How much time do you need to prepare an order and put it in
                    the mail? Keep in mind, shoppers have shown they&apos;re
                    more likely to buy items that ship quickly.
                  </p>
                )}
                value={watch("processing_time.value")}
                onValueChange={(val) => {
                  setValue("processing_time.value", val);
                  if (val === "__CUSTOM__") {
                    setValue("processing_time.min", "");
                    setValue("processing_time.max", "");
                    setTimeout(() => {
                      setFocus("processing_time.min");
                    }, 50);
                    return;
                  }

                  if (
                    errors.processing_time?.max ||
                    errors.processing_time?.min
                  ) {
                    setError("processing_time.max", {
                      message: undefined,
                    });
                    setError("processing_time.min", {
                      message: undefined,
                    });
                  }

                  const [min, max] = val.split("-");
                  setValue("processing_time.min", min);
                  setValue("processing_time.max", max);
                }}
                placeholder="Select your processing time"
                error={
                  (errors.processing_time?.min?.message ||
                    errors.processing_time?.max?.message) &&
                  "Processing time is required."
                }
              >
                <Option value="1-1">1 day</Option>
                <Option value="1-2">1 to 2 days</Option>
                <Option value="1-3">1 to 3 days</Option>
                <Option value="3-5">3 to 5 days</Option>
                <Option value="5-7">5 to 7 days</Option>
                <Option value="__CUSTOM__">custom</Option>
              </Select>

              {watch("processing_time.value") === "__CUSTOM__" && (
                <div className="w-full">
                  <Radio
                    control={control}
                    name="processing_time.type"
                    value={watch("processing_time.type")}
                  >
                    <RadioItem label="Days" value="DAYS" />
                    <RadioItem label="Weeks" value="WEEKS" />
                  </Radio>

                  <div className="mt-5 flex w-full flex-col items-center justify-between gap-5 md:flex-row">
                    <Input
                      className="w-full"
                      label="Minimum"
                      placeholder={`Minimum ${watch("processing_time.type")}`}
                      {...register("processing_time.min")}
                      error={errors.processing_time?.min?.message}
                    />

                    <Input
                      className="w-full"
                      label="Maximum"
                      placeholder={`Maximum ${watch("processing_time.type")}`}
                      {...register("processing_time.max")}
                      error={errors.processing_time?.max?.message}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="my-10 w-full border-t"></div>

          <div className="mb-10">
            <h3 className="text-sm font-medium text-gray-800">
              Standard shipping
            </h3>

            <p className="mt-1 text-xs text-gray-600">
              Where will you ship to? We’ll show your listings to shoppers in
              the countries you add here.
            </p>
          </div>

          <div className="w-full">
            {standardShippingArray.fields.map((field, index) => (
              <Fragment key={field.id}>
                {index > 0 && (
                  <div className="mb-5 mt-12 flex w-full items-center justify-start gap-5">
                    <div className="w-1/4">
                      {!watch(`standard_shipping.${index}.country`) ? (
                        <Select
                          placeholder="Select country"
                          className="w-full whitespace-nowrap"
                          value={watch(`standard_shipping.${index}.country`)}
                          onValueChange={(val) => {
                            setValue(`standard_shipping.${index}.country`, val);
                          }}
                          error={
                            errors.standard_shipping &&
                            errors.standard_shipping[index]?.country?.message
                          }
                        >
                          <SelectGroup>
                            {watch("standard_shipping").filter(
                              (shipping) =>
                                shipping.country === "Every where else",
                            ).length === 0 && (
                              <>
                                <OptionLabel>All other locations</OptionLabel>
                                <Option level={2} value="Every where else">
                                  Every where else
                                </Option>
                              </>
                            )}
                            <OptionLabel>Add Location</OptionLabel>
                            {filteredCountries.map((country) => (
                              <Option
                                level={2}
                                key={country.code + country.name}
                                value={country.name}
                              >
                                <span className="sr-only">{country.name}</span>
                                {country.emoji} {country.name}
                              </Option>
                            ))}
                          </SelectGroup>
                        </Select>
                      ) : (
                        <p className="text-sm font-medium text-gray-800">
                          {watch(`standard_shipping.${index}.country`)}
                        </p>
                      )}
                    </div>
                    <div className="flex h-px w-3/4 items-center justify-end bg-gray-300">
                      <BasicButton
                        onClick={() => standardShippingArray.remove(index)}
                        wrapperClass="-mt-1"
                        className={
                          "bg-white p-2 pr-0 text-red-700 hover:bg-white hover:underline data-[pressed]:bg-white md:p-2 md:pr-0"
                        }
                        variant={"ghost"}
                      >
                        Remove
                      </BasicButton>
                    </div>
                  </div>
                )}
                <div
                  key={field.id}
                  className="relative flex w-full flex-col items-start justify-between gap-5 md:flex-row"
                >
                  <div className="w-1/4">
                    {index === 0 && (
                      <p className="text-sm font-medium text-gray-800">
                        {watch(`standard_shipping.${index}.country`)}
                      </p>
                    )}
                  </div>

                  <div className="w-3/4">
                    <div className="flex w-full items-start justify-between gap-5">
                      <Select
                        label="Shipping service"
                        SubLabel={() => (
                          <p className="mb-2 max-w-xs text-xs text-gray-600">
                            Not sure?, you can update this any time.
                          </p>
                        )}
                        placeholder="Select a shipping service"
                        className="w-full"
                        value={watch(
                          `standard_shipping.${index}.shipping_service`,
                        )}
                        onValueChange={(val) => {
                          setValue(
                            `standard_shipping.${index}.shipping_service`,
                            val,
                          );
                          trigger(
                            `standard_shipping.${index}.shipping_service`,
                          );
                        }}
                        error={
                          errors.standard_shipping &&
                          errors.standard_shipping[index]?.shipping_service
                            ?.message
                        }
                      >
                        <Option value="other">Other</Option>
                      </Select>

                      <div className="flex w-full items-start justify-start gap-5">
                        <Select
                          label="Minimum"
                          SubLabel={() => (
                            <p className="mb-2 text-xs text-gray-600">
                              Business Days
                            </p>
                          )}
                          placeholder=""
                          className="w-full whitespace-nowrap"
                          value={watch(
                            `standard_shipping.${index}.delivery_time.min`,
                          )}
                          onValueChange={(val) => {
                            if (
                              watch(
                                `standard_shipping.${index}.delivery_time.max`,
                              ) &&
                              parseInt(val) >
                                parseInt(
                                  watch(
                                    `standard_shipping.${index}.delivery_time.max`,
                                  ),
                                )
                            ) {
                              setValue(
                                `standard_shipping.${index}.delivery_time.max`,
                                val,
                              );
                              trigger(
                                `standard_shipping.${index}.delivery_time.max`,
                              );
                            }

                            setValue(
                              `standard_shipping.${index}.delivery_time.min`,
                              val,
                            );
                            trigger(
                              `standard_shipping.${index}.delivery_time.min`,
                            );
                          }}
                          error={
                            errors.standard_shipping &&
                            errors.standard_shipping[index]?.delivery_time?.min
                              ?.message
                          }
                        >
                          {arrayOf(45, 1).map((date) => (
                            <Option key={date} value={date.toString()}>
                              {date} day{date > 1 && "s"}
                            </Option>
                          ))}
                        </Select>

                        <Select
                          label="Maximum"
                          SubLabel={() => (
                            <p className="mb-2 text-xs text-gray-600">
                              Business Days
                            </p>
                          )}
                          placeholder=""
                          className="w-full whitespace-nowrap"
                          value={watch(
                            `standard_shipping.${index}.delivery_time.max`,
                          )}
                          onValueChange={(val) => {
                            setValue(
                              `standard_shipping.${index}.delivery_time.max`,
                              val,
                            );
                            trigger(
                              `standard_shipping.${index}.delivery_time.max`,
                            );
                          }}
                          error={
                            errors.standard_shipping &&
                            errors.standard_shipping[index]?.delivery_time?.max
                              ?.message
                          }
                        >
                          {arrayOf(
                            45,
                            isValid(
                              watch(
                                `standard_shipping.${index}.delivery_time.min`,
                              ),
                            )
                              ? parseInt(
                                  watch(
                                    `standard_shipping.${index}.delivery_time.min`,
                                  ),
                                )
                              : 1,
                          ).map((date) => (
                            <Option key={date} value={date.toString()}>
                              {date} day{date > 1 && "s"}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <Select
                      label="What you'll charge"
                      placeholder="Select type"
                      className="mt-7 w-full"
                      value={watch(`standard_shipping.${index}.charge.type`)}
                      onValueChange={(val) => {
                        setTimeout(() => {
                          setFocus(
                            `standard_shipping.${index}.charge.one_item`,
                          );
                        }, 50);

                        if (val == $Enums.ShippingCharge.FREE) {
                          setValue(
                            `standard_shipping.${index}.charge.one_item`,
                            "",
                          );
                          setValue(
                            `standard_shipping.${index}.charge.additional_item`,
                            "",
                          );
                        }

                        setValue(
                          `standard_shipping.${index}.charge.type`,
                          val as $Enums.ShippingCharge,
                        );
                        trigger(`standard_shipping.${index}.charge.type`);
                      }}
                      error={
                        errors.standard_shipping &&
                        errors.standard_shipping[index]?.charge?.message
                      }
                    >
                      <Option value={$Enums.ShippingCharge.FREE}>
                        Free Shipping
                      </Option>
                      <Option value={$Enums.ShippingCharge.FIXED}>
                        Fixed Shipping
                      </Option>
                    </Select>

                    {watch(`standard_shipping.${index}.charge.type`) ===
                      $Enums.ShippingCharge.FIXED && (
                      <div className="mt-7 flex w-full flex-col items-center justify-between gap-5 md:flex-row">
                        <Input
                          label="One Item"
                          className="w-full"
                          inputClass="pl-10 bg-white"
                          LeadingIcon={() => (
                            <svg
                              className="ml-3 h-5 w-5 text-gray-600"
                              viewBox="0 0 227 94"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.227273 94V0.909088H14.2727V81.9091H56.4545V94H0.227273ZM72.4773 94V0.909088H86.5227V45.3636H87.6591L126.705 0.909088H144.386L106.841 42.8182L144.523 94H127.614L97.5227 52.4091L86.5227 65.0455V94H72.4773ZM157.477 94V0.909088H190.659C197.871 0.909088 203.856 2.15151 208.614 4.63636C213.402 7.12121 216.977 10.5606 219.341 14.9545C221.705 19.3182 222.886 24.3636 222.886 30.0909C222.886 35.7879 221.689 40.803 219.295 45.1364C216.932 49.4394 213.356 52.7879 208.568 55.1818C203.811 57.5758 197.826 58.7727 190.614 58.7727H165.477V46.6818H189.341C193.886 46.6818 197.583 46.0303 200.432 44.7273C203.311 43.4242 205.417 41.5303 206.75 39.0455C208.083 36.5606 208.75 33.5758 208.75 30.0909C208.75 26.5758 208.068 23.5303 206.705 20.9545C205.371 18.3788 203.265 16.4091 200.386 15.0455C197.538 13.6515 193.795 12.9545 189.159 12.9545H171.523V94H157.477ZM203.432 52L226.432 94H210.432L187.886 52H203.432Z"
                                fill="black"
                              />
                            </svg>
                          )}
                          {...register(
                            `standard_shipping.${index}.charge.one_item`,
                          )}
                          error={
                            errors.standard_shipping &&
                            errors.standard_shipping[index] &&
                            errors.standard_shipping[index]?.charge?.one_item
                              ?.message
                          }
                        />

                        <Input
                          label="Additional Item"
                          className="w-full"
                          inputClass="pl-10 bg-white"
                          LeadingIcon={() => (
                            <svg
                              className="ml-3 h-5 w-5 text-gray-600"
                              viewBox="0 0 227 94"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.227273 94V0.909088H14.2727V81.9091H56.4545V94H0.227273ZM72.4773 94V0.909088H86.5227V45.3636H87.6591L126.705 0.909088H144.386L106.841 42.8182L144.523 94H127.614L97.5227 52.4091L86.5227 65.0455V94H72.4773ZM157.477 94V0.909088H190.659C197.871 0.909088 203.856 2.15151 208.614 4.63636C213.402 7.12121 216.977 10.5606 219.341 14.9545C221.705 19.3182 222.886 24.3636 222.886 30.0909C222.886 35.7879 221.689 40.803 219.295 45.1364C216.932 49.4394 213.356 52.7879 208.568 55.1818C203.811 57.5758 197.826 58.7727 190.614 58.7727H165.477V46.6818H189.341C193.886 46.6818 197.583 46.0303 200.432 44.7273C203.311 43.4242 205.417 41.5303 206.75 39.0455C208.083 36.5606 208.75 33.5758 208.75 30.0909C208.75 26.5758 208.068 23.5303 206.705 20.9545C205.371 18.3788 203.265 16.4091 200.386 15.0455C197.538 13.6515 193.795 12.9545 189.159 12.9545H171.523V94H157.477ZM203.432 52L226.432 94H210.432L187.886 52H203.432Z"
                                fill="black"
                              />
                            </svg>
                          )}
                          {...register(
                            `standard_shipping.${index}.charge.additional_item`,
                          )}
                          error={
                            errors.standard_shipping &&
                            errors.standard_shipping[index] &&
                            errors.standard_shipping[index]?.charge
                              ?.additional_item?.message
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="mt-16 flex w-full items-center justify-center border-t">
            <Button
              onClick={() => {
                standardShippingArray.append({
                  shipping_service: "",
                  charge: {
                    type: $Enums.ShippingCharge.FREE,
                    additional_item: undefined,
                    one_item: undefined,
                  },
                  country: "",
                  delivery_time: {
                    max: "",
                    min: "",
                  },
                });
              }}
              variant={"ghost"}
              wrapperClass="-mt-[1.2rem]"
              className={
                "rounded-lg bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200 data-[pressed]:bg-gray-200 md:px-3 md:py-1"
              }
            >
              <div className="whitespace-nowrap">Add another location</div>
            </Button>
          </div>

          <div className="mt-10">
            <Input
              label="Profile name"
              placeholder="Enter profile name."
              {...register("name")}
              error={errors.name?.message}
            />
          </div>
        </div>
      </fieldset>

      <div className="mt-10 flex flex-col items-end justify-end gap-5 border-t p-4 pt-5 sm:flex-row sm:items-center sm:justify-end sm:p-6">
        <Button
          onClick={() => {
            setOpenShippingModal(false);
          }}
          wrapperClass="w-full sm:w-min"
          className={"flex w-full items-center justify-center sm:w-auto"}
          variant={"secondary"}
        >
          Cancel
        </Button>
        <Button
          isSpinning={isCreateShippingProfileLoading}
          type="submit"
          wrapperClass="w-full sm:w-min"
          className={"flex w-full items-center justify-center sm:w-auto"}
        >
          Create
        </Button>
      </div>
    </form>
  );
};

const EditShippingProfile = ({
  refetchShippingProfiles,
  setEditId,
  setOpenShippingModal,
  setStep,
  editId,
}: {
  refetchShippingProfiles: any;
  editId: string | null;
  setEditId: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<Step>>;
  setOpenShippingModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    data: profile,
    isLoading: isGetShippingProfileLoading,
    refetch,
  } = useGetShippingProfile(editId);

  const {
    register,
    watch,
    setError,
    control,
    getValues,
    clearErrors,
    setValue,
    setFocus,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<CreateShippingProfileInputType>({
    mode: "all",
    defaultValues: {
      country_of_origin: "Sri Lanka",
      processing_time: {
        type: $Enums.ProcessingTime.DAYS,
      },
      standard_shipping: [
        {
          country: "Sri Lanka",
          shipping_service: undefined,
          delivery_time: {
            min: "",
            max: "",
          },
          charge: {
            type: $Enums.ShippingCharge.FREE,
            one_item: "",
            additional_item: "",
          },
        },
      ],
    },
    resolver: zodResolver(CreateShippingProfileSchema),
  });

  const [isDataSet, setIsDataSet] = useState(false);

  useEffect(() => {
    if (profile) {
      const safeParse = CreateShippingProfileSchema.safeParse(profile);
      if (safeParse.success && !isDataSet) {
        setTimeout(() => {
          reset(safeParse.data);
        }, 100);
        setIsDataSet(true);
      }
    }
  }, [profile]);

  const standardShippingArray = useFieldArray({
    control,
    name: "standard_shipping",
  });

  const filteredCountries = useMemo(() => {
    const dialCodes = JSON.parse(
      JSON.stringify(countriesWithDialCode),
    ) as typeof countriesWithDialCode;
    const selectedOptions = watch("standard_shipping").map(
      (opt) => opt.country,
    );

    return dialCodes.filter(
      (country) => !selectedOptions.includes(country.name),
    );
  }, [watch("standard_shipping")]);

  const [isUpdateShippingProfileLoading, setIsUpdateShippingProfileLoading] =
    useState(false);

  const { mutateAsync: updateShippingProfile } = useUpdateShippingProfile();

  const processForm: SubmitHandler<CreateShippingProfileInputType> = async (
    data,
  ) => {
    try {
      setIsUpdateShippingProfileLoading(true);
      await updateShippingProfile({ body: data, id: editId });
      await refetchShippingProfiles();
      await refetch();
      setOpenShippingModal(false);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsUpdateShippingProfileLoading(false);
    }
  };

  return (
    <>
      {isGetShippingProfileLoading && (
        <div className="flex min-h-[75dvh] w-full items-center justify-center">
          <Spinner size={"sm"} className="text-gray-600" />
        </div>
      )}

      {!isGetShippingProfileLoading && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(processForm)();
          }}
          className="w-full"
        >
          <div className="sticky inset-x-0 top-0 z-[999999999999999] bg-white p-4 pb-3 sm:p-6 sm:pb-3">
            <div className="relative flex w-full items-start justify-start gap-5">
              <div className="absolute right-0 top-0">
                <Modal.Close asChild>
                  <BasicButton
                    variant={"ghost"}
                    className={"text-gray-400 hover:text-gray-500"}
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
                </Modal.Close>
              </div>
              <BasicButton
                onClick={() => setStep(Step.SELECT)}
                variant={"ghost"}
                className={
                  "flex items-center justify-center bg-gray-200 p-2 hover:bg-gray-100 data-[pressed]:bg-gray-100 md:p-2"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-gray-800"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 12H4m0 0l6-6m-6 6l6 6"
                  />
                </svg>
              </BasicButton>
              <div className="">
                <Modal.Title className="text-base font-medium text-gray-800 sm:text-lg">
                  Edit Shipping Profile
                </Modal.Title>
                <Modal.Description className="mt-1 text-xs text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione porro deserunt quos, ipsum error dolorem?
                </Modal.Description>
              </div>
            </div>
          </div>

          {profile && (
            <>
              <fieldset disabled={isUpdateShippingProfileLoading}>
                <div className="mt-10 w-full p-4 pt-0 sm:p-6 sm:pt-0">
                  <div className="w-full space-y-8">
                    <Select
                      label="Country of origin"
                      SubLabel={() => (
                        <p className="mb-2 text-xs text-gray-600">
                          The country you&apos;re shipping from
                        </p>
                      )}
                      defaultValue="Sri Lanka"
                      value={watch("country_of_origin")}
                      onValueChange={(val) => {
                        setValue("country_of_origin", val);
                        trigger(`country_of_origin`);
                      }}
                      disabled
                      placeholder="Select a country"
                      error={errors.country_of_origin?.message}
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

                    <Input
                      label="Origin postal code"
                      SubLabel={() => (
                        <p className="mb-2 text-xs text-gray-600">
                          Where do you ship packages from?
                        </p>
                      )}
                      placeholder="Enter postal code"
                      {...register("origin_postal_code")}
                      error={errors.origin_postal_code?.message}
                    />
                    <div className="flex w-full flex-col items-end justify-start gap-8 md:flex-row md:gap-10">
                      <Select
                        label="Processing time"
                        SubLabel={() => (
                          <p className="mb-2 text-xs text-gray-600">
                            How much time do you need to prepare an order and
                            put it in the mail? Keep in mind, shoppers have
                            shown they&apos;re more likely to buy items that
                            ship quickly.
                          </p>
                        )}
                        value={watch("processing_time.value")}
                        onValueChange={(val) => {
                          setValue("processing_time.value", val);
                          if (val === "__CUSTOM__") {
                            console.log("custom triggered");
                            setValue("processing_time.min", "");
                            setValue("processing_time.max", "");
                            setTimeout(() => {
                              setFocus("processing_time.min");
                            }, 50);
                            return;
                          }

                          if (
                            errors.processing_time?.max ||
                            errors.processing_time?.min
                          ) {
                            setError("processing_time.max", {
                              message: undefined,
                            });
                            setError("processing_time.min", {
                              message: undefined,
                            });
                          }

                          const [min, max] = val.split("-");
                          setValue("processing_time.min", min);
                          setValue("processing_time.max", max);
                        }}
                        placeholder="Select your processing time"
                        error={
                          (errors.processing_time?.min?.message ||
                            errors.processing_time?.max?.message) &&
                          "Processing time is required."
                        }
                      >
                        <Option value="1-1">1 day</Option>
                        <Option value="1-2">1 to 2 days</Option>
                        <Option value="1-3">1 to 3 days</Option>
                        <Option value="3-5">3 to 5 days</Option>
                        <Option value="5-7">5 to 7 days</Option>
                        <Option value="__CUSTOM__">custom</Option>
                      </Select>

                      {watch("processing_time.value") === "__CUSTOM__" && (
                        <div className="w-full">
                          <Radio
                            control={control}
                            name="processing_time.type"
                            value={watch("processing_time.type")}
                          >
                            <RadioItem label="Days" value="DAYS" />
                            <RadioItem label="Weeks" value="WEEKS" />
                          </Radio>

                          <div className="mt-5 flex w-full flex-col items-center justify-between gap-5 md:flex-row">
                            <Input
                              className="w-full"
                              label="Minimum"
                              placeholder={`Minimum ${watch(
                                "processing_time.type",
                              )}`}
                              {...register("processing_time.min")}
                              error={errors.processing_time?.min?.message}
                            />

                            <Input
                              className="w-full"
                              label="Maximum"
                              placeholder={`Maximum ${watch(
                                "processing_time.type",
                              )}`}
                              {...register("processing_time.max")}
                              error={errors.processing_time?.max?.message}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="my-10 w-full border-t"></div>

                  <div className="mb-10">
                    <h3 className="text-sm font-medium text-gray-800">
                      Standard shipping
                    </h3>

                    <p className="mt-1 text-xs text-gray-600">
                      Where will you ship to? We’ll show your listings to
                      shoppers in the countries you add here.
                    </p>
                  </div>

                  <div className="w-full">
                    {standardShippingArray.fields.map((field, index) => (
                      <Fragment key={field.id}>
                        {index > 0 && (
                          <div className="mb-5 mt-12 flex w-full items-center justify-start gap-5">
                            <div className="w-1/4">
                              {!watch(`standard_shipping.${index}.country`) ? (
                                <Select
                                  placeholder="Select country"
                                  className="w-full whitespace-nowrap"
                                  value={watch(
                                    `standard_shipping.${index}.country`,
                                  )}
                                  onValueChange={(val) => {
                                    setValue(
                                      `standard_shipping.${index}.country`,
                                      val,
                                    );
                                  }}
                                  error={
                                    errors.standard_shipping &&
                                    errors.standard_shipping[index]?.country
                                      ?.message
                                  }
                                >
                                  <SelectGroup>
                                    {watch("standard_shipping").filter(
                                      (shipping) =>
                                        shipping.country === "Every where else",
                                    ).length === 0 && (
                                      <>
                                        <OptionLabel>
                                          All other locations
                                        </OptionLabel>
                                        <Option
                                          level={2}
                                          value="Every where else"
                                        >
                                          Every where else
                                        </Option>
                                      </>
                                    )}
                                    <OptionLabel>Add Location</OptionLabel>
                                    {filteredCountries.map((country) => (
                                      <Option
                                        level={2}
                                        key={country.code + country.name}
                                        value={country.name}
                                      >
                                        <span className="sr-only">
                                          {country.name}
                                        </span>
                                        {country.emoji} {country.name}
                                      </Option>
                                    ))}
                                  </SelectGroup>
                                </Select>
                              ) : (
                                <p className="text-sm font-medium text-gray-800">
                                  {watch(`standard_shipping.${index}.country`)}
                                </p>
                              )}
                            </div>
                            <div className="flex h-px w-3/4 items-center justify-end bg-gray-300">
                              <BasicButton
                                onClick={() =>
                                  standardShippingArray.remove(index)
                                }
                                wrapperClass="-mt-1"
                                className={
                                  "bg-white p-2 pr-0 text-red-700 hover:bg-white hover:underline data-[pressed]:bg-white md:p-2 md:pr-0"
                                }
                                variant={"ghost"}
                              >
                                Remove
                              </BasicButton>
                            </div>
                          </div>
                        )}
                        <div
                          key={field.id}
                          className="relative flex w-full flex-col items-start justify-between gap-5 md:flex-row"
                        >
                          <div className="w-1/4">
                            {index === 0 && (
                              <p className="text-sm font-medium text-gray-800">
                                {watch(`standard_shipping.${index}.country`)}
                              </p>
                            )}
                          </div>

                          <div className="w-3/4">
                            <div className="flex w-full items-start justify-between gap-5">
                              <Select
                                label="Shipping service"
                                SubLabel={() => (
                                  <p className="mb-2 max-w-xs text-xs text-gray-600">
                                    Not sure?, you can update this any time.
                                  </p>
                                )}
                                placeholder="Select a shipping service"
                                className="w-full"
                                value={watch(
                                  `standard_shipping.${index}.shipping_service`,
                                )}
                                onValueChange={(val) => {
                                  setValue(
                                    `standard_shipping.${index}.shipping_service`,
                                    val,
                                  );
                                  trigger(
                                    `standard_shipping.${index}.shipping_service`,
                                  );
                                }}
                                error={
                                  errors.standard_shipping &&
                                  errors.standard_shipping[index]
                                    ?.shipping_service?.message
                                }
                              >
                                <Option value="other">Other</Option>
                              </Select>

                              <div className="flex w-full items-start justify-start gap-5">
                                <Select
                                  label="Minimum"
                                  SubLabel={() => (
                                    <p className="mb-2 text-xs text-gray-600">
                                      Business Days
                                    </p>
                                  )}
                                  placeholder=""
                                  className="w-full whitespace-nowrap"
                                  value={watch(
                                    `standard_shipping.${index}.delivery_time.min`,
                                  )}
                                  onValueChange={(val) => {
                                    if (
                                      watch(
                                        `standard_shipping.${index}.delivery_time.max`,
                                      ) &&
                                      parseInt(val) >
                                        parseInt(
                                          watch(
                                            `standard_shipping.${index}.delivery_time.max`,
                                          ),
                                        )
                                    ) {
                                      setValue(
                                        `standard_shipping.${index}.delivery_time.max`,
                                        val,
                                      );
                                      trigger(
                                        `standard_shipping.${index}.delivery_time.max`,
                                      );
                                    }

                                    setValue(
                                      `standard_shipping.${index}.delivery_time.min`,
                                      val,
                                    );
                                    trigger(
                                      `standard_shipping.${index}.delivery_time.min`,
                                    );
                                  }}
                                  error={
                                    errors.standard_shipping &&
                                    errors.standard_shipping[index]
                                      ?.delivery_time?.min?.message
                                  }
                                >
                                  {arrayOf(45, 1).map((date) => (
                                    <Option key={date} value={date.toString()}>
                                      {date} day{date > 1 && "s"}
                                    </Option>
                                  ))}
                                </Select>

                                <Select
                                  label="Maximum"
                                  SubLabel={() => (
                                    <p className="mb-2 text-xs text-gray-600">
                                      Business Days
                                    </p>
                                  )}
                                  placeholder=""
                                  className="w-full whitespace-nowrap"
                                  value={watch(
                                    `standard_shipping.${index}.delivery_time.max`,
                                  )}
                                  onValueChange={(val) => {
                                    setValue(
                                      `standard_shipping.${index}.delivery_time.max`,
                                      val,
                                    );
                                    trigger(
                                      `standard_shipping.${index}.delivery_time.max`,
                                    );
                                  }}
                                  error={
                                    errors.standard_shipping &&
                                    errors.standard_shipping[index]
                                      ?.delivery_time?.max?.message
                                  }
                                >
                                  {arrayOf(
                                    45,
                                    isValid(
                                      watch(
                                        `standard_shipping.${index}.delivery_time.min`,
                                      ),
                                    )
                                      ? parseInt(
                                          watch(
                                            `standard_shipping.${index}.delivery_time.min`,
                                          ),
                                        )
                                      : 1,
                                  ).map((date) => (
                                    <Option key={date} value={date.toString()}>
                                      {date} day{date > 1 && "s"}
                                    </Option>
                                  ))}
                                </Select>
                              </div>
                            </div>

                            <Select
                              label="What you'll charge"
                              placeholder="Select type"
                              className="mt-7 w-full"
                              value={watch(
                                `standard_shipping.${index}.charge.type`,
                              )}
                              onValueChange={(val) => {
                                setTimeout(() => {
                                  setFocus(
                                    `standard_shipping.${index}.charge.one_item`,
                                  );
                                }, 50);

                                if (val == $Enums.ShippingCharge.FREE) {
                                  setValue(
                                    `standard_shipping.${index}.charge.one_item`,
                                    "",
                                  );
                                  setValue(
                                    `standard_shipping.${index}.charge.additional_item`,
                                    "",
                                  );
                                }

                                setValue(
                                  `standard_shipping.${index}.charge.type`,
                                  val as $Enums.ShippingCharge,
                                );
                                trigger(
                                  `standard_shipping.${index}.charge.type`,
                                );
                              }}
                              error={
                                errors.standard_shipping &&
                                errors.standard_shipping[index]?.charge?.message
                              }
                            >
                              <Option value={$Enums.ShippingCharge.FREE}>
                                Free Shipping
                              </Option>
                              <Option value={$Enums.ShippingCharge.FIXED}>
                                Fixed Shipping
                              </Option>
                            </Select>

                            {watch(`standard_shipping.${index}.charge.type`) ===
                              $Enums.ShippingCharge.FIXED && (
                              <div className="mt-7 flex w-full flex-col items-center justify-between gap-5 md:flex-row">
                                <Input
                                  label="One Item"
                                  className="w-full"
                                  inputClass="pl-10 bg-white"
                                  LeadingIcon={() => (
                                    <svg
                                      className="ml-3 h-5 w-5 text-gray-600"
                                      viewBox="0 0 227 94"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0.227273 94V0.909088H14.2727V81.9091H56.4545V94H0.227273ZM72.4773 94V0.909088H86.5227V45.3636H87.6591L126.705 0.909088H144.386L106.841 42.8182L144.523 94H127.614L97.5227 52.4091L86.5227 65.0455V94H72.4773ZM157.477 94V0.909088H190.659C197.871 0.909088 203.856 2.15151 208.614 4.63636C213.402 7.12121 216.977 10.5606 219.341 14.9545C221.705 19.3182 222.886 24.3636 222.886 30.0909C222.886 35.7879 221.689 40.803 219.295 45.1364C216.932 49.4394 213.356 52.7879 208.568 55.1818C203.811 57.5758 197.826 58.7727 190.614 58.7727H165.477V46.6818H189.341C193.886 46.6818 197.583 46.0303 200.432 44.7273C203.311 43.4242 205.417 41.5303 206.75 39.0455C208.083 36.5606 208.75 33.5758 208.75 30.0909C208.75 26.5758 208.068 23.5303 206.705 20.9545C205.371 18.3788 203.265 16.4091 200.386 15.0455C197.538 13.6515 193.795 12.9545 189.159 12.9545H171.523V94H157.477ZM203.432 52L226.432 94H210.432L187.886 52H203.432Z"
                                        fill="black"
                                      />
                                    </svg>
                                  )}
                                  {...register(
                                    `standard_shipping.${index}.charge.one_item`,
                                  )}
                                  error={
                                    errors.standard_shipping &&
                                    errors.standard_shipping[index] &&
                                    errors.standard_shipping[index]?.charge
                                      ?.one_item?.message
                                  }
                                />

                                <Input
                                  label="Additional Item"
                                  className="w-full"
                                  inputClass="pl-10 bg-white"
                                  LeadingIcon={() => (
                                    <svg
                                      className="ml-3 h-5 w-5 text-gray-600"
                                      viewBox="0 0 227 94"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0.227273 94V0.909088H14.2727V81.9091H56.4545V94H0.227273ZM72.4773 94V0.909088H86.5227V45.3636H87.6591L126.705 0.909088H144.386L106.841 42.8182L144.523 94H127.614L97.5227 52.4091L86.5227 65.0455V94H72.4773ZM157.477 94V0.909088H190.659C197.871 0.909088 203.856 2.15151 208.614 4.63636C213.402 7.12121 216.977 10.5606 219.341 14.9545C221.705 19.3182 222.886 24.3636 222.886 30.0909C222.886 35.7879 221.689 40.803 219.295 45.1364C216.932 49.4394 213.356 52.7879 208.568 55.1818C203.811 57.5758 197.826 58.7727 190.614 58.7727H165.477V46.6818H189.341C193.886 46.6818 197.583 46.0303 200.432 44.7273C203.311 43.4242 205.417 41.5303 206.75 39.0455C208.083 36.5606 208.75 33.5758 208.75 30.0909C208.75 26.5758 208.068 23.5303 206.705 20.9545C205.371 18.3788 203.265 16.4091 200.386 15.0455C197.538 13.6515 193.795 12.9545 189.159 12.9545H171.523V94H157.477ZM203.432 52L226.432 94H210.432L187.886 52H203.432Z"
                                        fill="black"
                                      />
                                    </svg>
                                  )}
                                  {...register(
                                    `standard_shipping.${index}.charge.additional_item`,
                                  )}
                                  error={
                                    errors.standard_shipping &&
                                    errors.standard_shipping[index] &&
                                    errors.standard_shipping[index]?.charge
                                      ?.additional_item?.message
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>

                  <div className="mt-16 flex w-full items-center justify-center border-t">
                    <Button
                      onClick={() => {
                        standardShippingArray.append({
                          shipping_service: "",
                          charge: {
                            type: $Enums.ShippingCharge.FREE,
                            additional_item: undefined,
                            one_item: undefined,
                          },
                          country: "",
                          delivery_time: {
                            max: "",
                            min: "",
                          },
                        });
                      }}
                      variant={"ghost"}
                      wrapperClass="-mt-[1.2rem]"
                      className={
                        "rounded-lg bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200 data-[pressed]:bg-gray-200 md:px-3 md:py-1"
                      }
                    >
                      <div className="whitespace-nowrap">
                        Add another location
                      </div>
                    </Button>
                  </div>

                  <div className="mt-10">
                    <Input
                      label="Profile name"
                      placeholder="Enter profile name."
                      {...register("name")}
                      error={errors.name?.message}
                    />
                  </div>
                </div>
              </fieldset>

              <div className="mt-10 flex flex-col items-end justify-end gap-5 border-t p-4 pt-5 sm:flex-row sm:items-center sm:justify-end sm:p-6">
                <Button
                  onClick={() => {
                    setOpenShippingModal(false);
                  }}
                  wrapperClass="w-full sm:w-min"
                  className={
                    "flex w-full items-center justify-center sm:w-auto"
                  }
                  variant={"secondary"}
                >
                  Cancel
                </Button>
                <Button
                  isSpinning={isUpdateShippingProfileLoading}
                  type="submit"
                  wrapperClass="w-full sm:w-min"
                  className={
                    "flex w-full items-center justify-center whitespace-nowrap sm:w-auto"
                  }
                >
                  Save changes
                </Button>
              </div>
            </>
          )}

          {!profile && (
            <div className="flex min-h-[75dvh] w-full flex-col items-center justify-center px-4 md:px-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="aspect-square w-16 text-gray-400"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3.464 20.536C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535"
                  opacity=".5"
                />
                <path
                  fill="currentColor"
                  d="M8.397 17.447a.75.75 0 0 0 1.05.155A4.267 4.267 0 0 1 12 16.75a4.27 4.27 0 0 1 2.553.852a.75.75 0 1 0 .894-1.204A5.766 5.766 0 0 0 12 15.25a5.766 5.766 0 0 0-3.447 1.148a.75.75 0 0 0-.156 1.049M15 12c.552 0 1-.672 1-1.5S15.552 9 15 9s-1 .672-1 1.5s.448 1.5 1 1.5m-6 0c.552 0 1-.672 1-1.5S9.552 9 9 9s-1 .672-1 1.5s.448 1.5 1 1.5"
                />
              </svg>

              <h4 className="mt-3 text-sm font-medium text-gray-800">
                Shipping profile not found.
              </h4>

              <p className="mt-1 text-center text-xs text-gray-600">
                Lorem ipsum dolor sit amet.
              </p>

              <Button
                onClick={() => setStep(Step.SELECT)}
                wrapperClass="mt-5"
                variant={"secondary"}
                className={
                  "flex w-full items-center justify-center whitespace-nowrap"
                }
              >
                Go Back
              </Button>
            </div>
          )}
        </form>
      )}
    </>
  );
};

const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-gray-200 p-5">
      <div className="flex w-full items-center justify-between gap-10">
        <div className="w-full">
          <div className="h-5 w-1/3 rounded-md bg-gray-400"></div>
          <div className="mt-2 h-3 w-20 rounded-md bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

Shipping.displayName = "Shipping";
export default Shipping;
