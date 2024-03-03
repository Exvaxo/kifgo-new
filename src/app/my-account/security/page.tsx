import { BasicButton, Button } from "@/components/Button";
import React from "react";
import { EditEmail, EditPassword, EditPhone, EditUserName } from "./Modals";

const page = () => {
  return (
    <div className="">
      <h3 className="text-2xl font-medium text-gray-800">
        Sign-In And Security
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        Manage settings related to signing in to your account, account security,
        as well as how to recover your data when you’re having trouble signing
        in.
      </p>

      <div className="mt-5 flex flex-col divide-y rounded-xl border p-5">
        <div className="flex w-full items-center justify-between gap-10 pb-5">
          <div className="">
            <p className="text-sm font-medium text-gray-800">User name</p>
            <p className="mt-1 text-sm text-gray-600">Uthaysandh</p>
          </div>

          <EditUserName />
        </div>

        <div className="flex w-full items-center justify-between gap-10 py-5">
          <div className="truncate">
            <p className="text-sm font-medium text-gray-800">Email</p>
            <p className="mt-1 truncate text-sm text-gray-600">
              Uthaysandh@gmail.com
            </p>
          </div>

          <EditEmail />
        </div>

        <div className="flex w-full items-center justify-between gap-10 py-5">
          <div className="">
            <p className="text-sm font-medium text-gray-800">
              Primary mobile number
            </p>
            <p className="mt-1 text-sm text-gray-600">+94 77 7288 480</p>

            <p className="mt-1 text-xs text-gray-500">
              Quickly sign-in, easily recover passwords, and receive security
              notifications with this mobile number.
            </p>
          </div>

          <EditPhone />
        </div>

        <div className="flex w-full items-center justify-between gap-10 pt-5">
          <div className="">
            <p className="text-sm font-medium text-gray-800">Password</p>
            <p className="mt-1 text-sm text-gray-600">************</p>
          </div>

          <EditPassword />
        </div>
      </div>
    </div>
  );
};

export default page;
