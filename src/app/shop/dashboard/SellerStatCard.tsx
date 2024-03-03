"use client";
import React from "react";

const SellerStatCard = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-white p-5">
      <div className="opacity-35 absolute -left-10 top-0 h-36 w-56 rotate-45 rounded-full bg-teal-300 blur-2xl"></div>
      <div className="opacity-35 absolute -bottom-10 -left-10 h-44 w-48 rounded-full bg-sky-400 blur-xl"></div>
      <div className="opacity-35 absolute inset-y-0 right-0 h-full w-20 rounded-full bg-purple-400 blur-3xl"></div>
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
                d="M15.5 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0"
              />
              <path
                fill="currentColor"
                d="M19.5 7.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-15 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0"
                opacity="0.4"
              />
              <path
                fill="currentColor"
                d="M18 16.5c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5"
              />
              <path
                fill="currentColor"
                d="M22 16.5c0 1.38-1.79 2.5-4 2.5s-4-1.12-4-2.5s1.79-2.5 4-2.5s4 1.12 4 2.5m-20 0C2 17.88 3.79 19 6 19s4-1.12 4-2.5S8.21 14 6 14s-4 1.12-4 2.5"
                opacity="0.4"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-base font-medium text-gray-800">Total Sellers</p>
            <p className="text-sm text-gray-600">Ever growing Kifgo family</p>
          </div>
        </div>

        <div className="mx-auto mt-10">
          <h3 className="text-center text-5xl font-bold text-gray-800">3K</h3>
          <p className="mt-2 text-center text-[0.6rem] uppercase tracking-wider text-gray-600">
            sellers
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerStatCard;
