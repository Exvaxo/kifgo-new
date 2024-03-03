"use client";
import useCreatePolicy from "@/app/client-apis/seller/policy/useCreatePolicy";
import useDeletePolicy from "@/app/client-apis/seller/policy/useDeletePolicy";
import useGetPolicies from "@/app/client-apis/seller/policy/useGetPolicies";
import useGetPolicy from "@/app/client-apis/seller/policy/useGetPolicy";
import useUpdatePolicy from "@/app/client-apis/seller/policy/useUpdatePolicy";
import { StockYouShopType } from "@/app/schema/StockYourShopSchema";
import { BasicButton, Button } from "@/components/Button";
import Menu, { MenuItem } from "@/components/Menu";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import Input from "@/components/form-elements/Input";
import {
  Option,
  OptionLabel,
  Select,
  SelectGroup,
} from "@/components/form-elements/Select";
import Switch from "@/components/form-elements/Switch";
import TextArea from "@/components/form-elements/TextArea";
import useGetPreviousState from "@/hooks/useGetPreviousState";
import uppercaseFirstLetter from "@/utilities/uppercaseFirstLetter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import useMeasure from "react-use-measure";
import { z } from "zod";

const AddSectionSchema = z.object({
  section: z
    .string({ required_error: "Section is required." })
    .trim()
    .min(3, "Section has to be atleast 3 characters long."),
});

export type AddSectionInputType = z.infer<typeof AddSectionSchema>;

interface ISettings {}

enum Step {
  SELECT = 1,
  CREATE = 2,
  EDIT = 3,
}

const Settings = forwardRef<HTMLElement, ISettings>(({}, ref) => {
  const {
    data: policies,
    isPending: isPolicyLoading,
    refetch: refetchPolicies,
  } = useGetPolicies();

  const [step, setStep] = useState<number>(Step.SELECT);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openAddSection, setOpenAddSection] = useState(false);
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

  const addSectionForm = useForm<AddSectionInputType>({
    mode: "all",
    resolver: zodResolver(AddSectionSchema),
  });

  const rootFormMethods = useFormContext<StockYouShopType>();

  const [sections, setSections] = useState(["clothing", "gifts", "hand made"]);

  useEffect(() => {
    const value = rootFormMethods.watch("settings.section")?.toLowerCase();
    if (value && !sections.includes(value)) {
      setSections((pv) => [...Array.from(new Set(pv).add(value))]);
      setTimeout(() => {
        rootFormMethods.setValue("settings.section", value);
      }, 100);
    }
  }, [rootFormMethods.watch("settings.section"), sections]);

  return (
    <section ref={ref} id="settings" className="mb-10 w-full px-3 md:px-10">
      <div className="flex w-full items-center justify-between gap-10">
        <div className="">
          <h3 className="text-xl font-medium text-gray-800">Settings</h3>
          <p className="text-xs text-gray-600">
            Choose how this listing will display in your shop
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex w-full items-center justify-between gap-10">
          <div className="">
            <h3
              className={`inline-flex text-sm font-medium ${
                rootFormMethods.formState.errors.settings?.policyId?.message
                  ? "text-red-600"
                  : "text-gray-800"
              }`}
            >
              {rootFormMethods.formState.errors.settings?.policyId?.message && (
                <svg className="mr-1 h-5 w-5 text-red-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              Returns and exchanges
            </h3>

            {rootFormMethods.formState.errors.settings?.policyId?.message ? (
              <p className="mt-1 text-xs text-red-600">
                {rootFormMethods.formState.errors.settings?.policyId?.message}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-600">
                The selected policy will apply to this listing
              </p>
            )}
          </div>

          <Button
            onClick={() => setOpenProfileModal(true)}
            variant={"secondary"}
          >
            <div className="whitespace-nowrap">Select policy</div>
          </Button>

          <Modal
            className="max-w-3xl p-0 sm:p-0"
            open={openProfileModal}
            onOpenChange={setOpenProfileModal}
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
                                  Policies
                                </Modal.Title>
                                <Modal.Description className="mt-1 text-xs text-gray-600">
                                  Although the services are best there are some
                                  uncertain situations where there will be a
                                  return of product. Add all information about
                                  your shop return policies.
                                </Modal.Description>
                              </div>
                            </div>
                            {!isPolicyLoading &&
                              (!policies ||
                                (policies && policies?.length <= 0)) && (
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
                                      No Policies Created
                                    </h4>

                                    <p className="mt-1 text-center text-xs text-gray-600">
                                      Get started by creating a policy.
                                    </p>

                                    <Button
                                      onClick={() => setStep(Step.CREATE)}
                                      wrapperClass="mt-5"
                                      variant={"secondary"}
                                      className={
                                        "flex w-full items-center justify-center whitespace-nowrap"
                                      }
                                    >
                                      Create policy
                                    </Button>
                                  </div>
                                </div>
                              )}

                            {!isPolicyLoading &&
                              policies &&
                              rootFormMethods.watch("settings.policyId") &&
                              policies
                                .filter(
                                  (prof) =>
                                    prof.id ===
                                    rootFormMethods.watch("settings.policyId")
                                )
                                .map((profile) => (
                                  <div
                                    key={profile.id}
                                    className="my-10 px-4 md:px-6"
                                  >
                                    <PolicyProfile
                                      editId={editId}
                                      setEditId={setEditId}
                                      setOpenProfileModal={setOpenProfileModal}
                                      setStep={setStep}
                                      profile={profile}
                                      refetch={refetchPolicies}
                                      selected
                                    />
                                  </div>
                                ))}

                            {!isPolicyLoading &&
                              policies &&
                              policies.length > 0 && (
                                <div className="mb-5 mt-10 px-4 sm:px-6">
                                  <div className="mb-5 flex w-full flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-10">
                                    <div className="">
                                      <h2 className="text-sm font-medium text-gray-800">
                                        Available policies
                                      </h2>
                                      <p className="mt-1 text-xs text-gray-700">
                                        Select your policies from here.
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
                                      Create policy
                                    </Button>
                                  </div>
                                  <div className="flex w-full flex-col items-start justify-start gap-5">
                                    {!isPolicyLoading &&
                                      policies &&
                                      policies
                                        .filter(
                                          (profile) =>
                                            profile.id !==
                                              rootFormMethods.watch(
                                                "settings.policyId"
                                              ) || ""
                                        )
                                        .map((profile) => (
                                          <PolicyProfile
                                            editId={editId}
                                            setEditId={setEditId}
                                            setOpenProfileModal={
                                              setOpenProfileModal
                                            }
                                            setStep={setStep}
                                            key={profile.id}
                                            profile={profile}
                                            refetch={refetchPolicies}
                                          />
                                        ))}
                                  </div>
                                </div>
                              )}

                            {isPolicyLoading && (
                              <div className="my-10 w-full space-y-5 px-4 md:px-6">
                                <ProfileSkeleton />
                                <ProfileSkeleton />
                                <ProfileSkeleton />
                              </div>
                            )}
                          </div>
                        )}

                        {step === 2 && (
                          <CreatePolicy
                            editId={editId}
                            setEditId={setEditId}
                            setOpenProfileModal={setOpenProfileModal}
                            setStep={setStep}
                            refetch={refetchPolicies}
                          />
                        )}

                        {step === 3 && (
                          <EditPolicy
                            editId={editId}
                            setEditId={setEditId}
                            setOpenProfileModal={setOpenProfileModal}
                            setStep={setStep}
                            refetch={refetchPolicies}
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
      </div>

      <div className="mt-10 w-full">
        {!isPolicyLoading &&
          policies &&
          rootFormMethods.watch("settings.policyId") &&
          policies
            .filter(
              (prof) => prof.id === rootFormMethods.watch("settings.policyId")
            )
            .map((profile) => (
              <div key={profile.id} className="">
                <PolicyProfile
                  editId={editId}
                  setEditId={setEditId}
                  setOpenProfileModal={setOpenProfileModal}
                  setStep={setStep}
                  profile={profile}
                  refetch={refetchPolicies}
                  selected
                />
              </div>
            ))}
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-800">
          Section{" "}
          <span className="text-xs font-normal text-gray-600">(optional)</span>
        </h3>

        <p className="mt-1 text-xs text-gray-600">
          Use shop sections to organize your products into groups shoppers can
          explore.
        </p>

        <div className="mt-2 grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <Select
            className="w-full"
            placeholder="Select a section"
            value={rootFormMethods.watch("settings.section") || undefined}
            onValueChange={(val) => {
              if (val === "__CREATE__") {
                setOpenAddSection(true);
              } else {
                rootFormMethods.setValue("settings.section", val);
              }
            }}
          >
            <SelectGroup>
              <OptionLabel>Select a Section</OptionLabel>
              {sections.map((section, idx) => (
                <Option
                  key={section + idx}
                  level={2}
                  value={section.toLowerCase()}
                >
                  {uppercaseFirstLetter(section)}
                </Option>
              ))}
              <OptionLabel>Couldn&apos;t find a section?</OptionLabel>
              <Option level={2} value="__CREATE__">
                Add a section
              </Option>
            </SelectGroup>
          </Select>

          <Modal
            className="max-w-lg p-0 sm:p-0"
            open={openAddSection}
            onOpenChange={setOpenAddSection}
          >
            <div className="w-full">
              <div className="sticky inset-x-0 top-0 z-[999999999999999] bg-white p-4 pb-3 sm:p-6 sm:pb-3">
                <div className="relative w-full">
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
                  <Modal.Title className="text-base font-medium text-gray-800 sm:text-lg">
                    Add Section
                  </Modal.Title>
                  <Modal.Description className="mt-1 text-xs text-gray-600">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Explicabo, facere.
                  </Modal.Description>
                </div>
              </div>

              <div className="mt-5 w-full p-4 pt-0 sm:p-6 sm:pt-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addSectionForm.handleSubmit((values) => {
                      setSections((pv) => [
                        ...Array.from(
                          new Set(pv).add(values.section.toLowerCase())
                        ),
                      ]);
                      setTimeout(() => {
                        rootFormMethods.setValue(
                          "settings.section",
                          values.section.toLowerCase()
                        );
                      }, 100);
                      setOpenAddSection(false);
                    })();
                  }}
                  className="w-full"
                >
                  <Input
                    className="w-full"
                    placeholder="Enter a section"
                    {...addSectionForm.register("section")}
                    error={addSectionForm?.formState?.errors?.section?.message}
                  />
                  <div className="mt-10 flex flex-col items-end justify-end gap-5 sm:flex-row sm:items-center sm:justify-end">
                    <Button
                      onClick={() => {
                        setOpenAddSection(false);
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
                      type="submit"
                      wrapperClass="w-full sm:w-min"
                      className={
                        "flex w-full items-center justify-center sm:w-auto"
                      }
                    >
                      Add
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        </div>

        <div className="mt-10 flex w-full flex-row items-center justify-between gap-3">
          <div className="">
            <h3 className="text-sm font-medium text-gray-800">
              Feature this listing
            </h3>

            <p className="mt-1 text-xs text-gray-600">
              Showcase this listing at the top of your shop&apos;s homepage to
              make it stand out.
            </p>
          </div>

          <Switch
            defaultValue={rootFormMethods.watch(`settings.featured`)}
            onChange={(e) => {
              rootFormMethods.setValue(`settings.featured`, e);
            }}
          />
        </div>
      </div>
    </section>
  );
});

const PolicyProfile = ({
  profile,
  refetch,
  selected = false,
  editId,
  setEditId,
  setOpenProfileModal,
  setStep,
}: {
  profile: Prisma.PolicyGetPayload<{ include: { _count: true } }>;
  refetch: any;
  selected?: boolean;
  editId: string | null;
  setEditId: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<Step>>;
  setOpenProfileModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const rootFormMethods = useFormContext<StockYouShopType>();
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div
      key={profile.id}
      className="relative flex w-full items-center justify-between gap-10 rounded-xl border p-5"
    >
      {selected && (
        <div className="absolute inset-x-0 top-0 flex items-center justify-center">
          <div className="-mt-3 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800">
            Selected Policy
          </div>
        </div>
      )}
      <div className="">
        <h3 className="text-sm font-medium text-gray-800">
          {profile.title}{" "}
          <span className="ml-2 rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
            {" "}
            {profile._count.Product} listings
          </span>
        </h3>

        <p className="mt-2 text-xs text-gray-600">{profile.description}</p>
      </div>

      <div className="flex items-center justify-end gap-3">
        {!selected && (
          <Button
            onClick={() => {
              rootFormMethods.setValue("settings.policyId", profile.id);
              rootFormMethods.clearErrors("settings.policyId");
              setOpenProfileModal(false);
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
                    setEditId(profile.id);
                    setStep(Step.EDIT);
                    setOpenProfileModal(true);
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

const CreatePolicySchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .trim()
    .min(3, "Title must be above 3 characters long."),

  description: z.string().trim().optional(),
  isDomesticReturns: z.boolean().default(false),
  domesticReturns: z
    .object({
      timeframe: z.string({ required_error: "Timeframe is required." }).trim(),
      returnShippingPaidBy: z.string({
        required_error: "Return Shipping paid by is required.",
      }),
      refundMethod: z.string({
        required_error: "Refund method is required.",
      }),
    })
    .optional()
    .nullable(),

  isInternationalReturns: z.boolean().default(false),
  internationalReturns: z
    .object({
      timeframe: z.string({ required_error: "Timeframe is required." }).trim(),
      returnShippingPaidBy: z.string({
        required_error: "Return Shipping paid by is required.",
      }),
      refundMethod: z.string({
        required_error: "Refund method is required.",
      }),
    })
    .optional()
    .nullable(),
});

export type CreatePolicyInputType = z.infer<typeof CreatePolicySchema>;

const CreatePolicy = ({
  refetch,
  editId,
  setEditId,
  setOpenProfileModal,
  setStep,
}: {
  refetch: any;
  editId: string | null;
  setEditId: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<Step>>;
  setOpenProfileModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePolicyInputType>({
    mode: "all",
    resolver: zodResolver(CreatePolicySchema),
  });

  const [isCreatePolicyLoading, setIsCreatePolicyLoading] = useState(false);

  const { mutateAsync: createPolicy } = useCreatePolicy();

  const processForm: SubmitHandler<CreatePolicyInputType> = async (data) => {
    try {
      setIsCreatePolicyLoading(true);
      await createPolicy(data);
      await refetch();
      setStep(Step.SELECT);
      setOpenProfileModal(false);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsCreatePolicyLoading(false);
    }
  };
  return (
    <div className="w-full">
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
              Create Policy
            </Modal.Title>

            <Modal.Description className="mt-1 text-xs text-gray-600">
              Add your shop return policy here.
            </Modal.Description>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit(processForm)();
        }}
        className="mt-5 w-full p-4 pt-0 sm:p-6 sm:pt-0"
      >
        <fieldset disabled={isCreatePolicyLoading} className="space-y-10">
          <Input
            label="Title"
            placeholder="Enter title"
            {...register("title")}
            error={errors.title?.message}
          />

          <TextArea
            label="Description (optional)"
            placeholder="Enter description"
            rows={5}
            {...register("description")}
            error={errors.description?.message}
          />

          <div
            className={`w-full ${
              watch(`isDomesticReturns`) &&
              "rounded-xl border bg-gray-50/50 p-3"
            }`}
          >
            <div className="flex w-full flex-row items-center justify-between gap-3">
              <div className="">
                <h3 className="text-sm font-medium text-gray-800">
                  Accept Domestic returns
                </h3>

                <p className="mt-1 text-xs text-gray-600">
                  Allow returns for items purchased domestically.
                </p>
              </div>

              <Switch
                defaultValue={watch(`isDomesticReturns`)}
                onChange={(e) => {
                  setValue(`isDomesticReturns`, e);
                }}
              />
            </div>

            {watch("isDomesticReturns") && (
              <>
                <Select
                  placeholder="Select timeframe"
                  className="mt-10"
                  label="Timeframe"
                  SubLabel={() => (
                    <p className="mb-2 text-xs text-gray-600">
                      Buyer must contact me and ship item back within
                    </p>
                  )}
                  value={watch("domesticReturns.timeframe")}
                  onValueChange={(val) => {
                    setValue("domesticReturns.timeframe", val);
                  }}
                  error={errors.domesticReturns?.timeframe?.message}
                >
                  <Option value="7">7 Days of delivery</Option>
                  <Option value="14">14 Days of delivery</Option>
                  <Option value="21">21 Days of delivery</Option>
                  <Option value="30">30 Days of delivery</Option>
                  <Option value="45">45 Days of delivery</Option>
                  <Option value="60">60 Days of delivery</Option>
                  <Option value="90">90 Days of delivery</Option>
                </Select>

                <Select
                  placeholder="Select shipping paid by"
                  className="mt-8"
                  label="Return Shipping paid by"
                  value={watch("domesticReturns.returnShippingPaidBy")}
                  onValueChange={(val) => {
                    setValue("domesticReturns.returnShippingPaidBy", val);
                  }}
                  error={errors.domesticReturns?.returnShippingPaidBy?.message}
                >
                  <Option value="buyer">Buyer</Option>
                  <Option value="seller">Free for buyer, you pay</Option>
                </Select>

                <Select
                  placeholder="Select refund method"
                  className="mt-8"
                  label="Refund method"
                  value={watch("domesticReturns.refundMethod")}
                  onValueChange={(val) => {
                    setValue("domesticReturns.refundMethod", val);
                  }}
                  error={errors.domesticReturns?.refundMethod?.message}
                >
                  <Option value="money back">Money back</Option>
                  <Option value="money back or replacement">
                    Money back or replacement
                  </Option>
                </Select>

                <div className="mt-5">
                  <h3 className="text-sm font-medium text-gray-800">
                    Conditions of return
                  </h3>

                  <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-700">
                    <li>Buyer can return or exchange this item</li>
                    {watch("domesticReturns.timeframe") && (
                      <li>
                        Buyer must return item within{" "}
                        {watch("domesticReturns.timeframe")} days of delivery
                      </li>
                    )}

                    {watch("domesticReturns.returnShippingPaidBy") && (
                      <li>
                        {uppercaseFirstLetter(
                          watch("domesticReturns.returnShippingPaidBy")
                        )}{" "}
                        is responsible for return shipping costs
                      </li>
                    )}
                    <li>
                      Buyer is responsible for loss in value (as agreed upon
                      with seller) if an item isn&apos;t returned in original
                      condition.
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <div
            className={`w-full ${
              watch(`isInternationalReturns`) &&
              "rounded-xl border bg-gray-50/50 p-3"
            }`}
          >
            <div className="flex w-full flex-row items-center justify-between gap-3">
              <div className="">
                <h3 className="text-sm font-medium text-gray-800">
                  Accept International returns
                </h3>

                <p className="mt-1 text-xs text-gray-600">
                  Allow returns for items purchased internationally.
                </p>
              </div>

              <Switch
                defaultValue={watch(`isInternationalReturns`)}
                onChange={(e) => {
                  setValue(`isInternationalReturns`, e);
                }}
              />
            </div>

            {watch("isInternationalReturns") && (
              <>
                <Select
                  placeholder="Select timeframe"
                  className="mt-10"
                  label="Timeframe"
                  SubLabel={() => (
                    <p className="mb-2 text-xs text-gray-600">
                      Buyer must contact me and ship item back within
                    </p>
                  )}
                  value={watch("internationalReturns.timeframe")}
                  onValueChange={(val) => {
                    setValue("internationalReturns.timeframe", val);
                  }}
                  error={errors.internationalReturns?.timeframe?.message}
                >
                  <Option value="7">7 Days of delivery</Option>
                  <Option value="14">14 Days of delivery</Option>
                  <Option value="14">14 Days of delivery</Option>
                  <Option value="21">21 Days of delivery</Option>
                  <Option value="30">30 Days of delivery</Option>
                  <Option value="45">45 Days of delivery</Option>
                  <Option value="60">60 Days of delivery</Option>
                  <Option value="90">90 Days of delivery</Option>
                </Select>

                <Select
                  placeholder="Select shipping paid by"
                  className="mt-8"
                  label="Return Shipping paid by"
                  value={watch("internationalReturns.returnShippingPaidBy")}
                  onValueChange={(val) => {
                    setValue("internationalReturns.returnShippingPaidBy", val);
                  }}
                  error={
                    errors.internationalReturns?.returnShippingPaidBy?.message
                  }
                >
                  <Option value="buyer">Buyer</Option>
                  <Option value="seller">Free for buyer, you pay</Option>
                </Select>

                <Select
                  placeholder="Select refund method"
                  className="mt-8"
                  label="Refund method"
                  value={watch("internationalReturns.refundMethod")}
                  onValueChange={(val) => {
                    setValue("internationalReturns.refundMethod", val);
                  }}
                  error={errors.internationalReturns?.refundMethod?.message}
                >
                  <Option value="money back">Money back</Option>
                  <Option value="money back or replacement">
                    Money back or replacement
                  </Option>
                </Select>

                <div className="mt-5">
                  <h3 className="text-sm font-medium text-gray-800">
                    Conditions of return
                  </h3>

                  <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-700">
                    <li>Buyer can return or exchange this item</li>
                    {watch("internationalReturns.timeframe") && (
                      <li>
                        Buyer must return item within{" "}
                        {watch("internationalReturns.timeframe")} days of
                        delivery
                      </li>
                    )}

                    {watch("internationalReturns.returnShippingPaidBy") && (
                      <li>
                        {uppercaseFirstLetter(
                          watch("internationalReturns.returnShippingPaidBy")
                        )}{" "}
                        is responsible for return shipping costs
                      </li>
                    )}
                    <li>
                      Buyer is responsible for loss in value (as agreed upon
                      with seller) if an item isn&apos;t returned in original
                      condition.
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </fieldset>

        <div className="mt-10 flex flex-col items-end justify-end gap-5 border-t pt-5 sm:flex-row sm:items-center sm:justify-end">
          <Button
            onClick={() => {
              setOpenProfileModal(false);
            }}
            wrapperClass="w-full sm:w-min"
            className={"flex w-full items-center justify-center sm:w-auto"}
            variant={"secondary"}
          >
            Cancel
          </Button>

          <Button
            isSpinning={isCreatePolicyLoading}
            type="submit"
            wrapperClass="w-full sm:w-min"
            className={"flex w-full items-center justify-center sm:w-auto"}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

const EditPolicy = ({
  refetch,
  editId,
  setEditId,
  setOpenProfileModal,
  setStep,
}: {
  refetch: any;
  editId: string | null;
  setEditId: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<Step>>;
  setOpenProfileModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    data: profile,
    isPending: isPolicyLoading,
    refetch: refetchProfile,
  } = useGetPolicy(editId);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePolicyInputType>({
    mode: "all",
    resolver: zodResolver(CreatePolicySchema),
  });

  const [isDataSet, setIsDataSet] = useState(false);

  useEffect(() => {
    if (profile) {
      const safeParse = CreatePolicySchema.safeParse(profile);
      if (safeParse.success && !isDataSet) {
        setTimeout(() => {
          reset(safeParse.data);
        }, 100);
        setIsDataSet(true);
      }
    }
  }, [profile]);

  const [isUpdatePolicyLoading, setIsUpdatePolicyLoading] = useState(false);

  const { mutateAsync: updatePolicy } = useUpdatePolicy();

  const processForm: SubmitHandler<CreatePolicyInputType> = async (data) => {
    try {
      setIsUpdatePolicyLoading(true);
      await updatePolicy({ body: data, id: profile?.id || null });
      await refetchProfile();
      await refetch();
      setStep(Step.SELECT);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsUpdatePolicyLoading(false);
    }
  };
  return (
    <div className="w-full">
      {isPolicyLoading && (
        <div className="flex min-h-[75dvh] w-full items-center justify-center">
          <Spinner size={"sm"} className="text-gray-600" />
        </div>
      )}

      {!isPolicyLoading && (
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
                  Edit Policy
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
              <fieldset disabled={isUpdatePolicyLoading}>
                <div className="mt-5 w-full space-y-10 p-4 pt-0 sm:p-6 sm:pt-0">
                  <Input
                    label="Title"
                    placeholder="Enter title"
                    {...register("title")}
                    error={errors.title?.message}
                  />

                  <TextArea
                    label="Description (optional)"
                    placeholder="Enter description"
                    rows={5}
                    {...register("description")}
                    error={errors.description?.message}
                  />

                  <div
                    className={`w-full ${
                      watch(`isDomesticReturns`) &&
                      "rounded-xl border bg-gray-50/50 p-3"
                    }`}
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-3">
                      <div className="">
                        <h3 className="text-sm font-medium text-gray-800">
                          Accept Domestic returns
                        </h3>

                        <p className="mt-1 text-xs text-gray-600">
                          Allow returns for items purchased domestically.
                        </p>
                      </div>

                      <Switch
                        defaultValue={watch(`isDomesticReturns`)}
                        onChange={(e) => {
                          setValue(`isDomesticReturns`, e);
                        }}
                      />
                    </div>

                    {watch("isDomesticReturns") && (
                      <>
                        <Select
                          placeholder="Select timeframe"
                          className="mt-10"
                          label="Timeframe"
                          SubLabel={() => (
                            <p className="mb-2 text-xs text-gray-600">
                              Buyer must contact me and ship item back within
                            </p>
                          )}
                          value={watch("domesticReturns.timeframe")}
                          onValueChange={(val) => {
                            setValue("domesticReturns.timeframe", val);
                          }}
                          error={errors.domesticReturns?.timeframe?.message}
                        >
                          <Option value="7">7 Days of delivery</Option>
                          <Option value="14">14 Days of delivery</Option>
                          <Option value="21">21 Days of delivery</Option>
                          <Option value="30">30 Days of delivery</Option>
                          <Option value="45">45 Days of delivery</Option>
                          <Option value="60">60 Days of delivery</Option>
                          <Option value="90">90 Days of delivery</Option>
                        </Select>

                        <Select
                          placeholder="Select shipping paid by"
                          className="mt-8"
                          label="Return Shipping paid by"
                          value={watch("domesticReturns.returnShippingPaidBy")}
                          onValueChange={(val) => {
                            setValue(
                              "domesticReturns.returnShippingPaidBy",
                              val
                            );
                          }}
                          error={
                            errors.domesticReturns?.returnShippingPaidBy
                              ?.message
                          }
                        >
                          <Option value="buyer">Buyer</Option>
                          <Option value="seller">
                            Free for buyer, you pay
                          </Option>
                        </Select>

                        <Select
                          placeholder="Select refund method"
                          className="mt-8"
                          label="Refund method"
                          value={watch("domesticReturns.refundMethod")}
                          onValueChange={(val) => {
                            setValue("domesticReturns.refundMethod", val);
                          }}
                          error={errors.domesticReturns?.refundMethod?.message}
                        >
                          <Option value="money back">Money back</Option>
                          <Option value="money back or replacement">
                            Money back or replacement
                          </Option>
                        </Select>

                        <div className="mt-5">
                          <h3 className="text-sm font-medium text-gray-800">
                            Conditions of return
                          </h3>

                          <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-700">
                            <li>Buyer can return or exchange this item</li>
                            {watch("domesticReturns.timeframe") && (
                              <li>
                                Buyer must return item within{" "}
                                {watch("domesticReturns.timeframe")} days of
                                delivery
                              </li>
                            )}

                            {watch("domesticReturns.returnShippingPaidBy") && (
                              <li>
                                {uppercaseFirstLetter(
                                  watch("domesticReturns.returnShippingPaidBy")
                                )}{" "}
                                is responsible for return shipping costs
                              </li>
                            )}
                            <li>
                              Buyer is responsible for loss in value (as agreed
                              upon with seller) if an item isn&apos;t returned
                              in original condition.
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    className={`w-full ${
                      watch(`isInternationalReturns`) &&
                      "rounded-xl border bg-gray-50/50 p-3"
                    }`}
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-3">
                      <div className="">
                        <h3 className="text-sm font-medium text-gray-800">
                          Accept International returns
                        </h3>

                        <p className="mt-1 text-xs text-gray-600">
                          Allow returns for items purchased internationally.
                        </p>
                      </div>

                      <Switch
                        defaultValue={watch(`isInternationalReturns`)}
                        onChange={(e) => {
                          setValue(`isInternationalReturns`, e);
                        }}
                      />
                    </div>

                    {watch("isInternationalReturns") && (
                      <>
                        <Select
                          placeholder="Select timeframe"
                          className="mt-10"
                          label="Timeframe"
                          SubLabel={() => (
                            <p className="mb-2 text-xs text-gray-600">
                              Buyer must contact me and ship item back within
                            </p>
                          )}
                          value={watch("internationalReturns.timeframe")}
                          onValueChange={(val) => {
                            setValue("internationalReturns.timeframe", val);
                          }}
                          error={
                            errors.internationalReturns?.timeframe?.message
                          }
                        >
                          <Option value="7">7 Days of delivery</Option>
                          <Option value="14">14 Days of delivery</Option>
                          <Option value="14">14 Days of delivery</Option>
                          <Option value="21">21 Days of delivery</Option>
                          <Option value="30">30 Days of delivery</Option>
                          <Option value="45">45 Days of delivery</Option>
                          <Option value="60">60 Days of delivery</Option>
                          <Option value="90">90 Days of delivery</Option>
                        </Select>

                        <Select
                          placeholder="Select shipping paid by"
                          className="mt-8"
                          label="Return Shipping paid by"
                          value={watch(
                            "internationalReturns.returnShippingPaidBy"
                          )}
                          onValueChange={(val) => {
                            setValue(
                              "internationalReturns.returnShippingPaidBy",
                              val
                            );
                          }}
                          error={
                            errors.internationalReturns?.returnShippingPaidBy
                              ?.message
                          }
                        >
                          <Option value="buyer">Buyer</Option>
                          <Option value="seller">
                            Free for buyer, you pay
                          </Option>
                        </Select>

                        <Select
                          placeholder="Select refund method"
                          className="mt-8"
                          label="Refund method"
                          value={watch("internationalReturns.refundMethod")}
                          onValueChange={(val) => {
                            setValue("internationalReturns.refundMethod", val);
                          }}
                          error={
                            errors.internationalReturns?.refundMethod?.message
                          }
                        >
                          <Option value="money back">Money back</Option>
                          <Option value="money back or replacement">
                            Money back or replacement
                          </Option>
                        </Select>

                        <div className="mt-5">
                          <h3 className="text-sm font-medium text-gray-800">
                            Conditions of return
                          </h3>

                          <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-700">
                            <li>Buyer can return or exchange this item</li>
                            {watch("internationalReturns.timeframe") && (
                              <li>
                                Buyer must return item within{" "}
                                {watch("internationalReturns.timeframe")} days
                                of delivery
                              </li>
                            )}

                            {watch(
                              "internationalReturns.returnShippingPaidBy"
                            ) && (
                              <li>
                                {uppercaseFirstLetter(
                                  watch(
                                    "internationalReturns.returnShippingPaidBy"
                                  )
                                )}{" "}
                                is responsible for return shipping costs
                              </li>
                            )}
                            <li>
                              Buyer is responsible for loss in value (as agreed
                              upon with seller) if an item isn&apos;t returned
                              in original condition.
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </fieldset>

              <div className="mt-10 flex flex-col items-end justify-end gap-5 border-t p-4 pt-5 sm:flex-row sm:items-center sm:justify-end md:p-6">
                <Button
                  onClick={() => {
                    setOpenProfileModal(false);
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
                  isSpinning={isUpdatePolicyLoading}
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
    </div>
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

Settings.displayName = "Settings";

export default Settings;
