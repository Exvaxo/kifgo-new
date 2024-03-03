import { BasicButton, Button } from "@/components/Button";
import React from "react";
import {
  EditAbout,
  EditBirthdate,
  EditCity,
  EditName,
  EditProfilePicture,
} from "./Modals";

const page = () => {
  return (
    <div className="">
      <h3 className="text-2xl font-medium text-gray-800">Public Profile</h3>
      <p className="mt-2 text-sm text-gray-600">
        Everything on this page can be seen by anyone
      </p>

      <div className="mt-5 flex flex-col divide-y rounded-xl border p-5">
        <div className="flex w-full items-center justify-between gap-10 pb-5">
          <div className="">
            <p className="text-sm font-medium text-gray-800">Profile picture</p>
            <p className="mt-1 text-sm text-gray-600">Profile.jpg</p>
            <p className="mt-1 text-xs text-gray-500">
              Must be a .jpg, .gif or .png file smaller than 10MB and at least
              400px by 400px.
            </p>
          </div>

          <EditProfilePicture />
        </div>

        <div className="flex w-full items-center justify-between gap-10 py-5">
          <div className="">
            <p className="text-sm font-medium text-gray-800">Name</p>
            <p className="mt-1 text-sm text-gray-600">Uthaysandh Uthay</p>
          </div>

          <EditName />
        </div>

        <div className="flex w-full items-center justify-between gap-10 py-5">
          <div className="">
            <p className="text-sm font-medium text-gray-800">City</p>
            <p className="mt-1 text-sm text-gray-600">Colombo</p>
          </div>

          <EditCity />
        </div>

        <div className="flex w-full items-center justify-between gap-10 py-5">
          <div className="">
            <p className="text-sm font-medium text-gray-800">Birthday</p>
            <p className="mt-1 text-sm text-gray-600">25 July 1995</p>
          </div>

          <EditBirthdate />
        </div>

        <div className="flex w-full items-center justify-between gap-10 pt-5">
          <div className="">
            <p className="text-sm font-medium text-gray-800">About</p>
            <p className="mt-1 text-sm text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus
              illum delectus corporis, libero sint voluptate.
            </p>
          </div>

          <EditAbout />
        </div>
      </div>
    </div>
  );
};

export default page;
