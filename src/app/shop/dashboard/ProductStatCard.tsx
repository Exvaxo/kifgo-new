"use client";
import React from "react";

const ProductStatCard = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-white p-5">
      <div className="">
        <div className="absolute -left-10 top-0 h-36 w-56 rotate-45 rounded-full bg-purple-300 opacity-35 blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 h-44 w-48 rounded-full bg-orange-400 opacity-35 blur-xl"></div>
        <div className="absolute inset-y-0 right-0 h-full w-20 rounded-full bg-yellow-400 opacity-35 blur-3xl"></div>
      </div>

      <div className="relative">
        <div className="flex flex-col items-center justify-start gap-3">
          <div className="flex aspect-square w-16 items-center justify-center rounded-full bg-white/10 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-800"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073a3.196 3.196 0 0 0-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709z"
              />
              <path
                fill="currentColor"
                d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641"
                opacity="0.7"
              />
              <path
                fill="currentColor"
                d="M21.403 7.14a3.153 3.153 0 0 0-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011c.137.155.257.32.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3.062 3.062 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824a3.15 3.15 0 0 1 .362-.498l9.04 4.52l3.387-1.693z"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-base font-medium text-gray-800">
              Total Products
            </p>
            <p className="text-sm text-gray-600">
              New line of products each day
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 flex-shrink-0">
          <h3 className="text-center text-5xl font-bold text-gray-800">
            37K <span className="ml-1 rounded-xl text-lg">/ 100K</span>
          </h3>
          <p className="mt-2 text-center text-[0.6rem] uppercase tracking-wider text-gray-600">
            Our Products
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductStatCard;
