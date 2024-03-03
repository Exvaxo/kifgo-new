"use client";
import { BasicButton, Button } from "@/components/Button";
import Menu, { MenuItem } from "@/components/Menu";
import Modal from "@/components/Modal";
import currencyFormatter from "@/utilities/currencyFormatter";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProduct } from "./listing/_actions";

interface IProductCard {
  product: Prisma.ProductGetPayload<{
    include: {
      details: true;
      variation: true;
    };
  }>;
}

const ProductCard = ({ product }: IProductCard) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLoading, setisDeleteLoading] = useState(false);

  const router = useRouter();
  return (
    <>
      <Modal
        className="max-w-xl p-0 sm:p-0"
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      >
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
            <Modal.Title className="max-w-md text-base font-medium text-gray-800 sm:text-lg">
              Delete {product.about.title}
            </Modal.Title>
            <Modal.Description className="mt-1 text-xs text-gray-600">
              This action is irreversible, are you sure?
            </Modal.Description>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-end gap-5 p-5 sm:w-auto sm:flex-row">
          <BasicButton
            onClick={() => setIsDeleteModalOpen(false)}
            wrapperClass="w-full sm:w-auto"
            className={"flex w-full items-center justify-center"}
            variant={"secondary"}
          >
            No
          </BasicButton>
          <Button
            isSpinning={isDeleteLoading}
            onClick={async () => {
              setisDeleteLoading(true);
              await deleteProduct(product.id);
              setIsDeleteModalOpen(false);
              setisDeleteLoading(false);
            }}
            wrapperClass="w-full sm:w-auto"
            className={"flex w-full items-center justify-center"}
            variant={"danger"}
          >
            Delete
          </Button>
        </div>
      </Modal>
      <div key={product.id} className="w-full rounded-xl border p-1">
        <div className="relative aspect-video min-h-[10rem] w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 animate-pulse bg-gray-100"></div>
          <Image
            alt={product.about.thumbnail.alt || ""}
            fill
            className="z-[5] bg-cover object-cover"
            src={product.about.thumbnail.lowRes.url}
          />

          <Image
            alt={product.about.thumbnail.alt || ""}
            fill
            className="z-[10] bg-cover object-cover"
            src={product.about.thumbnail.highRes.url}
          />
        </div>

        <div className="p-2">
          <div className="flex w-full items-center justify-between gap-5">
            <h3 className="cursor-pointer truncate text-sm font-medium text-gray-800 underline hover:underline">
              {product.about.title}
            </h3>

            <Menu
              open={isMenuOpen}
              setOpen={setIsMenuOpen}
              Contents={({ closeMenu }) => (
                <div className="min-w-[10rem]">
                  <div className="px-5 pb-2 pt-5">
                    <h3 className="mb-2 text-[0.65rem] font-medium uppercase tracking-wider text-gray-500">
                      Options
                    </h3>

                    <MenuItem
                      className="-mx-3 flex items-center gap-2 px-3 py-3"
                      onSelect={() => {}}
                      closeMenu={closeMenu}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M2 12c0 1.64.425 2.191 1.275 3.296C4.972 17.5 7.818 20 12 20c4.182 0 7.028-2.5 8.725-4.704C21.575 14.192 22 13.639 22 12c0-1.64-.425-2.191-1.275-3.296C19.028 6.5 16.182 4 12 4C7.818 4 4.972 6.5 3.275 8.704C2.425 9.81 2 10.361 2 12"
                            opacity=".5"
                          />
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M8.25 12a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m1.5 0a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                      View on Kifgo
                    </MenuItem>

                    <div className="my-2 w-full border-b border-gray-800"></div>

                    <MenuItem
                      className="-mx-3 flex items-center gap-2 px-3 py-3 "
                      onSelect={() => {
                        router.push(`listing/edit/${product.id}`);
                      }}
                      closeMenu={closeMenu}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M20.849 8.713a3.932 3.932 0 0 0-5.562-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.093 3.32a8.754 8.754 0 0 0 3.43 2.13z"
                            opacity=".5"
                          />
                          <path
                            fill="currentColor"
                            d="m14.439 4l-.039.038l.038.112a8.754 8.754 0 0 0 2.093 3.32a8.753 8.753 0 0 0 3.43 2.13l-8.56 8.56c-.578.577-.867.866-1.185 1.114a6.554 6.554 0 0 1-1.211.748c-.364.174-.751.303-1.526.561l-4.083 1.361a1.06 1.06 0 0 1-1.342-1.341l1.362-4.084c.258-.774.387-1.161.56-1.525c.205-.43.456-.836.749-1.212c.248-.318.537-.606 1.114-1.183z"
                          />
                        </svg>
                      </span>
                      Edit
                    </MenuItem>

                    <MenuItem
                      className="-mx-3 flex items-center gap-2 px-3 py-3 data-[highlighted]:bg-red-700"
                      onSelect={() => {
                        setIsDeleteModalOpen(true);
                      }}
                      closeMenu={closeMenu}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M2.75 6.167c0-.46.345-.834.771-.834h2.665c.529-.015.996-.378 1.176-.916l.03-.095l.115-.372c.07-.228.131-.427.217-.605c.338-.702.964-1.189 1.687-1.314c.184-.031.377-.031.6-.031h3.478c.223 0 .417 0 .6.031c.723.125 1.35.612 1.687 1.314c.086.178.147.377.217.605l.115.372l.03.095c.18.538.74.902 1.27.916h2.57c.427 0 .772.373.772.834c0 .46-.345.833-.771.833H3.52c-.426 0-.771-.373-.771-.833"
                          />
                          <path
                            fill="currentColor"
                            d="M11.607 22h.787c2.707 0 4.06 0 4.941-.863c.88-.864.97-2.28 1.15-5.111l.26-4.081c.098-1.537.147-2.305-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.487-.392 1.255-.295 2.792l.26 4.08c.18 2.833.27 4.248 1.15 5.112C7.545 22 8.9 22 11.607 22"
                            opacity=".5"
                          />
                        </svg>
                      </span>
                      Delete
                    </MenuItem>
                  </div>
                </div>
              )}
            >
              <BasicButton
                variant={"ghost"}
                onClick={() => setIsMenuOpen(true)}
                className={
                  "rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 data-[pressed]:bg-gray-200 md:p-2"
                }
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

          <div className="mt-2 flex items-center justify-start gap-3 text-xs text-gray-600">
            <p>
              {product.pricing.quantity ||
                product.variation
                  .filter((vari) => vari.visibility)
                  .reduce((a, b) => a + (b.quantity || 0), 0)}{" "}
              in stock
            </p>
            <p>|</p>
            <p>
              {product.pricing.srilanka
                ? currencyFormatter(parseInt(product.pricing.srilanka || "0"))
                : `${currencyFormatter(
                    Math.min(
                      ...product.variation
                        .filter((vari) => vari.visibility)
                        .map((v) => parseInt(v.pricing?.srilanka || "0")),
                    ),
                  )} - ${currencyFormatter(
                    Math.max(
                      ...product.variation
                        .filter((vari) => vari.visibility)
                        .map((v) => parseInt(v.pricing?.srilanka || "0")),
                    ),
                  )}`}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-start gap-3 text-xs text-gray-600">
            <p>Created on {format(product.updatedAt, "dd MMM, yyyy")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
