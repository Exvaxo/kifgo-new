"use client";
import { ButtonVariants } from "@/components/Button";
import { cn } from "@/utilities/cn";
import Link from "next/link";

const EmptyListing = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <div className="flex items-center justify-center rounded-full bg-gray-100 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gray-600"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M17.5 2.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25V9.5a.75.75 0 0 1-1.5 0V7.25H14.5a.75.75 0 0 1 0-1.5h2.25V3.5a.75.75 0 0 1 .75-.75"
            clip-rule="evenodd"
          />
          <path
            fill="currentColor"
            d="M2 6.5c0-2.121 0-3.182.659-3.841C3.318 2 4.379 2 6.5 2c2.121 0 3.182 0 3.841.659C11 3.318 11 4.379 11 6.5c0 2.121 0 3.182-.659 3.841C9.682 11 8.621 11 6.5 11c-2.121 0-3.182 0-3.841-.659C2 9.682 2 8.621 2 6.5m11 11c0-2.121 0-3.182.659-3.841C14.318 13 15.379 13 17.5 13c2.121 0 3.182 0 3.841.659c.659.659.659 1.72.659 3.841c0 2.121 0 3.182-.659 3.841c-.659.659-1.72.659-3.841.659c-2.121 0-3.182 0-3.841-.659C13 20.682 13 19.621 13 17.5"
          />
          <path
            fill="currentColor"
            d="M2 17.5c0-2.121 0-3.182.659-3.841C3.318 13 4.379 13 6.5 13c2.121 0 3.182 0 3.841.659c.659.659.659 1.72.659 3.841c0 2.121 0 3.182-.659 3.841C9.682 22 8.621 22 6.5 22c-2.121 0-3.182 0-3.841-.659C2 20.682 2 19.621 2 17.5"
            opacity=".5"
          />
        </svg>
      </div>

      <h3 className="mt-3 text-sm font-medium text-gray-800">No Listing</h3>
      <p className="mt-1 text-center text-sm text-gray-500">
        Get started by creating a listing
      </p>
      <Link
        href={"/shop/dashboard/listing/create"}
        className={cn(
          ButtonVariants({ variant: "primary", className: "mt-5" }),
        )}
      >
        Create Product
      </Link>
    </div>
  );
};

export default EmptyListing;
