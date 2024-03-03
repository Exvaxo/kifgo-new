"use client";
import useGetProductCount from "@/app/client-apis/seller/dashboard/useGetProductCount";
import { useWhoAmIFetch } from "@/app/client-apis/user/useWhoAmI";
import { Avatar } from "@/components/Avatar";
import React from "react";

const ShopStatCard = () => {
  const { data: count, isLoading } = useGetProductCount();
  const { data: user } = useWhoAmIFetch();

  console.log({ user });
  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-gray-100 p-5">
      <div className="absolute left-0 top-0 h-10 w-32 rotate-45 rounded-full bg-gray-500 opacity-35 blur-xl"></div>
      <div className="absolute bottom-0 right-0 h-44 w-36 rounded-full bg-gray-300 opacity-35 blur-xl"></div>
      <div className="relative">
        <div className="flex flex-col items-center justify-start gap-3">
          <Avatar
            className="aspect-square w-16"
            src="https://images.pexels.com/photos/19877105/pexels-photo-19877105/free-photo-of-mong-c.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            Fallback={() => (
              <div className="flex size-16 items-center justify-center rounded-full bg-gray-100 text-base font-medium text-gray-600">
                HP
              </div>
            )}
          />
          <div className="text-center">
            <p className="text-base font-medium text-gray-800">Shopname</p>
            <p className="text-sm text-gray-600">jeyaram uthayshandh</p>
          </div>
        </div>

        <div className="mx-auto mt-10">
          <h3 className="text-center text-5xl font-bold text-gray-800">
            {count !== undefined ? 0 : count}
          </h3>
          <p className="mt-2 text-center text-[0.6rem] uppercase tracking-wider text-gray-600">
            products
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopStatCard;
