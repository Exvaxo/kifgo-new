"use client";
import { StockYouShopType } from "@/app/schema/StockYourShopSchema";
import { BasicButton, Button } from "@/components/Button";
import ImageComponent from "@/components/ImageComponent";
import Poppover, { Trigger } from "@/components/Poppover";
import Spinner from "@/components/Spinner";
import FileInput from "@/components/form-elements/FileInput";
import Input from "@/components/form-elements/Input";
import Switch from "@/components/form-elements/Switch";
import TextArea from "@/components/form-elements/TextArea";
import useDeleteFiles from "@/store/filesDeleteStore";
import { resizeImage } from "@/utilities/resizeImage";
import { Dispatch, SetStateAction, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface IAbout {}

const About = forwardRef<HTMLElement, IAbout>(({}, ref) => {
  const { files: deletedFiles, setFiles: setDeletedFiles } = useDeleteFiles();
  const {
    register,
    watch,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<StockYouShopType>();

  return (
    <section ref={ref} id="about" className="w-full px-3 md:px-10">
      <h3 className="text-xl font-medium text-gray-800">About</h3>
      <p className="text-xs text-gray-600">
        Tell the world all about your item and why they&apos;ll love it.
      </p>

      <div className="my-10 space-y-10">
        <Input
          label="Title"
          SubLabel={() => (
            <p className="mb-2 text-xs text-gray-500">
              Include keywords that buyers would use to search for this item.
            </p>
          )}
          placeholder="Enter your product title."
          TopRightContainer={() => (
            <div className="-mr-2 mt-3 w-full md:mt-3">
              <Poppover
                align="end"
                Trigger={() => (
                  <Trigger>
                    <Button
                      variant={"unstyled"}
                      className={
                        "whitespace-nowrap bg-gray-100 p-2 px-1 text-xs md:p-3"
                      }
                    >
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-800 md:h-5 md:w-5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M9.25 14a3 3 0 1 1 0 6a3 3 0 0 1 0-6Zm5-10a3 3 0 1 0 0 6a3 3 0 0 0 0-6Zm-5.5 2.209a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1 0-1.5h7Zm6 10a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM1 16.959a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75Zm20.75-10.75a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h2Z"
                          />
                        </svg>
                        <span className="hidden md:block">
                          See title options
                        </span>
                      </div>
                    </Button>
                  </Trigger>
                )}
              >
                <div className={`w-full max-w-xs`}>
                  <div className="flex w-full items-start justify-between gap-3">
                    <p className="w-full text-xs text-gray-500">
                      Enable the items below that you’d like to show as an
                      option when listing an item.
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-5">
                    <label
                      htmlFor=""
                      className="text-sm font-medium text-gray-800"
                    >
                      Custom label (SKU)
                      <p className="mt-1 text-xs font-normal text-gray-500">
                        Create a custom label to enter information you want to
                        track, such as yourown SKU number.
                      </p>
                    </label>

                    <Switch
                      defaultValue={watch("about.showSku")}
                      onChange={(e) => {
                        setValue("about.showSku", e);
                      }}
                    />
                  </div>
                </div>
              </Poppover>
            </div>
          )}
          RightContainer={() => (
            <div className="rounded-m absolute bottom-0 right-0 -mb-7 whitespace-nowrap p-1 text-xs font-medium text-gray-500">
              {watch("about.title")?.length || 0} / 150
            </div>
          )}
          error={errors?.about?.title?.message as string}
          {...register("about.title")}
        />

        {watch("about.showSku") && (
          <div className="w-full">
            <Input
              label="SKU"
              SubLabel={() => (
                <p className="mb-2 text-xs text-gray-500">
                  Create a custom label to enter information you want to track,
                  such as your own SKU number.
                </p>
              )}
              disabled={
                !!(
                  watch("variation") &&
                  watch("variation").some(
                    (variation) => variation.variantSettings.sku,
                  )
                )
              }
              placeholder="Enter stock keeping unit."
              error={errors?.about?.sku?.message as string}
              {...register("about.sku")}
            />

            {watch("variation") &&
              watch("variation").some(
                (variation) => variation.variantSettings.sku,
              ) && (
                <p className="mt-1 text-xs text-gray-600">
                  You can configure SKU in the variations table.
                </p>
              )}
          </div>
        )}

        <div className="mt-3 grid w-full grid-cols-1 gap-10 gap-x-5 md:grid-cols-5">
          <div className="w-full md:col-span-2">
            {watch("about.thumbnail.highRes.file") ? (
              <div className="w-full">
                <div
                  id="thumbnail"
                  className="relative mt-2 aspect-video w-full overflow-hidden rounded-xl bg-skin-primary-light"
                >
                  <div className="absolute left-0 top-0 z-20 p-3">
                    <label
                      htmlFor="thumbnail"
                      className="rounded-lg bg-gray-100/80 p-2 text-xs font-medium text-gray-800 backdrop-blur-sm sm:text-sm"
                    >
                      Thumbnail
                    </label>
                  </div>

                  <div className="absolute right-0 top-0 z-20 p-3">
                    <Button
                      onClick={() => {
                        const highResRef = getValues(
                          "about.thumbnail.highRes.ref",
                        );
                        const lowResRef = getValues(
                          "about.thumbnail.lowRes.ref",
                        );
                        if (highResRef) {
                          setDeletedFiles((pv) => {
                            const set = new Set(pv);

                            set.add(highResRef);

                            if (lowResRef) {
                              set.add(lowResRef);
                            }

                            return [...Array.from(set)];
                          });
                        }

                        setValue("about.thumbnail.highRes.file", undefined);
                        setValue("about.thumbnail.highRes.url", "");

                        setValue("about.thumbnail.lowRes.file", undefined);
                        setValue("about.thumbnail.lowRes.url", "");
                      }}
                      variant={"danger"}
                      className={"aspect-square p-0 md:p-0"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>

                  <ImageComponent
                    alt={watch("about.thumbnail.alt") || ""}
                    highResSrc={getValues("about.thumbnail.highRes.url")}
                    lowResSrc={getValues("about.thumbnail.lowRes.url")}
                  />
                </div>
                <Input
                  className="mt-6"
                  label="Alt"
                  placeholder="Enter the alternative text."
                  {...register("about.thumbnail.alt")}
                />
              </div>
            ) : (
              <div className="relative w-full">
                <div className="absolute right-0 top-0 p-3">
                  <Poppover
                    align="end"
                    Trigger={() => (
                      <Trigger>
                        <BasicButton
                          variant={"ghost"}
                          className={
                            "flex aspect-square items-center justify-center whitespace-nowrap p-1 text-xs md:p-1"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 flex-shrink-0 text-gray-600"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22Zm0-14.25c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829c-.092.095-.18.183-.264.267a6.666 6.666 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814c.07-.07.136-.135.193-.194A1.125 1.125 0 0 0 12 7.75ZM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </BasicButton>
                      </Trigger>
                    )}
                  >
                    <div className={`w-full max-w-xs`}>
                      <div className="flex w-full items-start justify-between gap-3">
                        <p className="w-full text-xs text-gray-500">
                          Enable the items below that you’d like to show as an
                          option when listing an item.
                        </p>
                      </div>
                    </div>
                  </Poppover>
                </div>
                <FileInput
                  error={
                    (errors?.about?.thumbnail?.message ||
                      errors?.about?.thumbnail?.highRes?.url?.message) &&
                    "Thumbnail is required."
                  }
                  name="thumbnail"
                  control={control}
                  onFileSelect={async (files) => {
                    const lowResImage = await resizeImage(files[0], {
                      quality: 60,
                      width: 20,
                      height: 20,
                      format: "webp",
                    });

                    const highResImage = await resizeImage(files[0], {
                      quality: 80,
                      // width: 1920,
                      // height: 1080,
                      format: "webp",
                    });

                    const lowResUrl = URL.createObjectURL(lowResImage);
                    const highResUrl = URL.createObjectURL(highResImage);

                    setValue("about.thumbnail.highRes.file", highResImage);
                    setValue("about.thumbnail.highRes.url", highResUrl);

                    setValue("about.thumbnail.lowRes.file", lowResImage);
                    setValue("about.thumbnail.lowRes.url", lowResUrl);
                  }}
                  className="w-full"
                  Title={() => (
                    <div className="flex items-center justify-start gap-1 text-sm font-medium text-gray-800">
                      Thumbnail
                    </div>
                  )}
                  Icon={() => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-white"
                      viewBox="0 0 24 24"
                    >
                      <g fill="currentColor">
                        <path d="M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" />
                        <path
                          fillRule="evenodd"
                          d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.088c0 1.909 0 3.471-.104 4.743c-.104 1.28-.317 2.347-.795 3.235c-.21.391-.47.742-.785 1.057c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.793-.793-1.203-1.78-1.42-3.006c-.215-1.203-.254-2.7-.262-4.558c-.002-.473-.002-.973-.002-1.501v-.058c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19Zm-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386v.844l1.001-.877a2.3 2.3 0 0 1 3.141.105l4.29 4.29a2 2 0 0 0 2.564.222l.298-.21a3 3 0 0 1 3.732.225l2.83 2.547c.286-.598.455-1.384.545-2.493c.098-1.205.099-2.707.099-4.653c0-2.378-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176Z"
                          clipRule="evenodd"
                        />
                      </g>
                    </svg>
                  )}
                  subTitle="You can add 1 image file, of size 2MB."
                  maxFiles={1}
                  maxFileSizeInMB={2}
                />
              </div>
            )}
          </div>

          <div className="w-full md:col-span-3">
            {watch("about.video.file") ? (
              <div
                id="thumbnail"
                className="relative mt-2 aspect-video w-full overflow-hidden rounded-xl bg-skin-primary-light"
              >
                <div className="absolute left-0 top-0 z-20 p-3">
                  <label
                    htmlFor="thumbnail"
                    className="rounded-lg bg-gray-100/80 p-2 text-xs font-medium text-gray-800 backdrop-blur-sm sm:text-sm"
                  >
                    Video
                  </label>
                </div>

                <div className="absolute right-0 top-0 z-20 p-3">
                  <Button
                    onClick={() => {
                      const videoRef = getValues("about.video.ref");
                      if (videoRef) {
                        setDeletedFiles((pv) => {
                          const set = new Set(pv);

                          set.add(videoRef);

                          return [...Array.from(set)];
                        });
                      }
                      setValue("about.video.file", undefined);
                      setValue("about.video.url", "");
                      setValue("about.video.ref", "");
                    }}
                    variant={"danger"}
                    className={"aspect-square p-0 md:p-0"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
                <div className="w-full overflow-hidden rounded-xl">
                  <video
                    controls
                    className="w-full"
                    src={getValues("about.video.url")}
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute right-0 top-0 p-3">
                  <Poppover
                    align="end"
                    Trigger={() => (
                      <Trigger>
                        <BasicButton
                          variant={"ghost"}
                          className={
                            "flex aspect-square items-center justify-center whitespace-nowrap p-1 text-xs md:p-1"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 flex-shrink-0 text-gray-600"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22Zm0-14.25c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829c-.092.095-.18.183-.264.267a6.666 6.666 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814c.07-.07.136-.135.193-.194A1.125 1.125 0 0 0 12 7.75ZM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </BasicButton>
                      </Trigger>
                    )}
                  >
                    <div className={`w-full max-w-xs`}>
                      <div className="flex w-full items-start justify-between gap-3">
                        <p className="w-full text-xs text-gray-500">
                          Enable the items below that you’d like to show as an
                          option when listing an item.
                        </p>
                      </div>
                    </div>
                  </Poppover>
                </div>
                <FileInput
                  name="video"
                  control={control}
                  className="w-full"
                  Title={() => (
                    <div className="flex items-center justify-start gap-1 text-sm font-medium text-gray-800">
                      Video
                    </div>
                  )}
                  Icon={() => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M2 12.5v-1c0-3.287 0-4.931.908-6.038a4 4 0 0 1 .554-.554C4.57 4 6.212 4 9.5 4c3.287 0 4.931 0 6.038.908a4 4 0 0 1 .554.554c.702.855.861 2.031.897 4.038l.67-.33c1.945-.972 2.918-1.459 3.63-1.019c.711.44.711 1.528.711 3.703v.292c0 2.175 0 3.263-.711 3.703c-.712.44-1.685-.047-3.63-1.02l-.67-.329c-.036 2.007-.195 3.183-.897 4.038a4.001 4.001 0 0 1-.554.554C14.43 20 12.788 20 9.5 20c-3.287 0-4.931 0-6.038-.908a4 4 0 0 1-.554-.554C2 17.43 2 15.788 2 12.5Zm11.56-2.94a1.5 1.5 0 1 0-2.121-2.12a1.5 1.5 0 0 0 2.122 2.12Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  subTitle="You can add 1 video file, of size 2MB."
                  maxFiles={1}
                  maxFileSizeInMB={15}
                  acceptedFileTypes={{ "video/mp4": [] }}
                  onFileSelect={(files) => {
                    const url = URL.createObjectURL(files[0]);
                    setValue("about.video.file", files[0]);
                    setValue("about.video.url", url);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col flex-wrap items-start justify-start gap-5 md:flex-row">
          {watch("about.images")?.length > 0 &&
            watch("about.images").map((image, idx) => (
              <div
                key={image.highRes.url}
                className="aspect-video w-full md:w-72"
              >
                <div
                  id="thumbnail"
                  className="relative mt-2 aspect-video w-full overflow-hidden rounded-xl bg-skin-primary-light"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <Spinner size={"sm"} />
                  </div>

                  <div className="absolute left-0 top-0 z-20 p-3">
                    <label
                      htmlFor="thumbnail"
                      className="rounded-lg bg-gray-100/80 p-2 text-xs font-medium text-gray-800 backdrop-blur-sm sm:text-sm"
                    >
                      {idx + 1}
                    </label>
                  </div>

                  <div className="absolute right-0 top-0 z-20 p-3">
                    <Button
                      onClick={async () => {
                        const files = getValues("about.images");
                        const highResRef = image.highRes.ref;
                        const lowResRef = image.lowRes.ref;

                        if (highResRef) {
                          setDeletedFiles((pv) => {
                            const set = new Set(pv);

                            set.add(highResRef);

                            if (lowResRef) {
                              set.add(lowResRef);
                            }

                            return [...Array.from(set)];
                          });
                        }

                        const updatedFiles = files.filter(
                          (file) => file.highRes.url !== image?.highRes?.url,
                        );

                        setValue("about.images", updatedFiles);
                      }}
                      variant={"danger"}
                      className={"aspect-square p-0 md:p-0"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </div>
                  <ImageComponent
                    alt={watch(`about.images.${idx}.alt`) || ""}
                    highResSrc={image?.highRes?.url}
                    lowResSrc={image?.lowRes?.url}
                  />
                </div>
                <Input
                  className="mt-6"
                  label="Alt"
                  placeholder="Enter the alternative text."
                  {...register(`about.images.${idx}.alt`)}
                />
              </div>
            ))}

          <div
            className={`relative ${
              !watch("about.images") || watch("about.images")?.length < 10
                ? watch("about.images")?.length > 0
                  ? "w-full flex-1"
                  : "w-full"
                : "hidden"
            }`}
          >
            <div className="absolute right-0 top-0 p-3">
              <Poppover
                align="end"
                Trigger={() => (
                  <Trigger>
                    <BasicButton
                      variant={"ghost"}
                      className={
                        "flex aspect-square items-center justify-center whitespace-nowrap p-1 text-xs md:p-1"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 flex-shrink-0 text-gray-600"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22Zm0-14.25c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829c-.092.095-.18.183-.264.267a6.666 6.666 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814c.07-.07.136-.135.193-.194A1.125 1.125 0 0 0 12 7.75ZM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </BasicButton>
                  </Trigger>
                )}
              >
                <div className={`w-full max-w-xs`}>
                  <div className="flex w-full items-start justify-between gap-3">
                    <p className="w-full text-xs text-gray-500">
                      Enable the items below that you’d like to show as an
                      option when listing an item.
                    </p>
                  </div>
                </div>
              </Poppover>
            </div>
            <FileInput
              error={
                (errors?.about?.images?.message &&
                  "Atleast 1 image is required.") ||
                errors?.about?.images?.root?.message
              }
              key={watch("about.images")?.length || 0}
              name="images"
              control={control}
              className="w-full"
              Title={() => (
                <div className="flex items-center justify-start gap-1 text-sm font-medium text-gray-800">
                  Photos
                </div>
              )}
              subTitle={`You can add ${
                10 - (watch("about.images")?.length || 0)
              } image file, of size 2MB.`}
              maxFiles={10 - (watch("about.images")?.length || 0)}
              maxFileSizeInMB={2}
              onFileSelect={async (files) => {
                clearErrors("about.images");
                let idx_start_from = watch("about.images")?.length || 0;
                for (const [idx, file] of files.entries()) {
                  if (idx_start_from >= 10) return;
                  const lowResImage = await resizeImage(file, {
                    quality: 60,
                    width: 20,
                    height: 20,
                    format: "webp",
                  });

                  const highResImage = await resizeImage(file, {
                    quality: 80,
                    // width: 1920,
                    // height: 1080,
                    format: "webp",
                  });

                  const lowResUrl = URL.createObjectURL(lowResImage);
                  const highResUrl = URL.createObjectURL(highResImage);

                  setValue(
                    `about.images.${idx_start_from}.highRes.url`,
                    highResUrl,
                  );
                  setValue(
                    `about.images.${idx_start_from}.highRes.file`,
                    highResImage,
                  );

                  setValue(
                    `about.images.${idx_start_from}.lowRes.url`,
                    lowResUrl,
                  );
                  setValue(
                    `about.images.${idx_start_from}.lowRes.file`,
                    lowResImage,
                  );
                  idx_start_from++;
                }
              }}
            />
          </div>
        </div>

        <div className="pt-5">
          <TextArea
            label="Description"
            placeholder="Enter Description."
            SubLabel={() => (
              <p className="mb-2 text-xs text-gray-500">
                What makes your item special? Buyers will only see the first few
                lines unless they expand the description.
              </p>
            )}
            rows={5}
            {...register("about.description")}
            error={errors?.about?.description?.message as string}
          />
        </div>

        <div
          className={`${
            watch("about.personalization.isPersonalization") &&
            "rounded-xl border bg-gray-50/50 p-3"
          }`}
        >
          <div className="flex w-full flex-row items-center justify-between gap-3">
            <div className="">
              <h3 className="text-sm font-medium text-gray-800">
                Personalization
              </h3>

              <p className="mt-1 text-xs text-gray-600">
                Collect personalized information for this listing.
              </p>
            </div>

            <Switch
              defaultSelected={watch("about.personalization.isPersonalization")}
              onChange={(e) =>
                setValue("about.personalization.isPersonalization", e)
              }
            />
          </div>

          {watch("about.personalization.isPersonalization") && (
            <div className="mt-5">
              <TextArea
                label="Instruction for buyers"
                SubLabel={() => (
                  <p className="mb-2 text-xs text-gray-500">
                    Enter the personalization instructions you want buyers to
                    see.
                  </p>
                )}
                rows={5}
                {...register("about.personalization.prompt")}
                error={
                  errors?.about?.personalization?.prompt?.message as string
                }
                RightContainer={() => (
                  <div className="rounded-m absolute bottom-0 right-0 -mb-7 whitespace-nowrap p-1 text-xs font-medium text-gray-500">
                    {watch("about.personalization.prompt")?.length || 0} / 150
                  </div>
                )}
              />

              <Switch
                className={"mt-10 md:mt-5"}
                name="personalization.isOptional"
                control={control}
              >
                Personalization is optional
              </Switch>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";
export default About;
