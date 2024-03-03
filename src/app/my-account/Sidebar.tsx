"use client";
import { Avatar } from "@/components/Avatar";
import { BasicButton, Button } from "@/components/Button";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

const Sidebar = () => {
  const subLinks = [
    {
      name: "Sign-in and Security",
      value: "security",
    },
    {
      name: "Public profile",
      value: "public-profile",
    },
    {
      name: "Addresses",
      value: "addresses",
    },
    {
      name: "Payments",
      value: "payments",
    },
    {
      name: "Emails",
      value: "emails",
    },
  ];

  const pathname = usePathname();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(true);

  const handleResize = (e: UIEvent) => {
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (windowWidth >= 768) {
      setIsMobileNavOpen(true);
    } else {
      setIsMobileNavOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <BasicButton
        variant="secondary"
        className={"p-3 md:hidden md:p-3"}
        onClick={() => setIsMobileNavOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.5"
            d="M4 7h3m13 0h-9m9 10h-3M4 17h9m-9-5h16"
          />
        </svg>
      </BasicButton>

      <Transition show={isMobileNavOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-all duration-200"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-all duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="fixed inset-y-0 left-0 z-[9999] my-[0.4rem] ml-[0.4rem] w-64 rounded-l-2xl bg-white p-5 shadow-lg md:static md:m-0 md:block md:w-full md:p-0 md:shadow-none">
            <div className="relative aspect-square w-20">
              <Avatar
                className="relative z-[20] aspect-square w-20"
                src="https://images.pexels.com/photos/19877105/pexels-photo-19877105/free-photo-of-mong-c.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                Fallback={() => (
                  <div className="relative z-[20] flex aspect-square w-20 items-center justify-center rounded-full bg-gray-100 text-base font-medium text-gray-600">
                    HP
                  </div>
                )}
              />

              <div className="absolute inset-0 z-10 h-full w-full animate-pulse rounded-full bg-gray-200"></div>
            </div>

            <h4 className="mt-3 text-base font-medium text-gray-800">
              Jane Eliyard
            </h4>
            <p className="text-xs text-gray-600">emailaddress@gmail.com</p>

            <div className="mt-10 space-y-3">
              {subLinks.map((link) => (
                <Link
                  key={link.value}
                  href={`/my-account/${link.value}`}
                  className={`block text-sm font-semibold ${
                    pathname.split("/")[2] === link.value
                      ? "text-skin-primary"
                      : "text-gray-800"
                  } `}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 z-[999] bg-black/10 backdrop-blur-sm md:hidden"
          ></div>
        </Transition.Child>
      </Transition>
    </>
  );
};

export default Sidebar;
