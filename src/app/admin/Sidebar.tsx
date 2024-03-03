"use client";
import { Avatar } from "@/components/Avatar";
import { BasicButton } from "@/components/Button";
import ExpandableNavLink from "@/components/ExpandableNavLink";
import NavLink from "@/components/NavLink";
import SubNavLink from "@/components/SubNavLink";
import { useAuth } from "@/context/AuthContext";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import useAuthStore from "@/store/authStore";
import useSidebarStore from "@/store/sidebarStore";
import { Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

const Sidebar = () => {
  const { isMobileNavOpen, setIsMobileNavOpen } = useSidebarStore();
  const { user } = useAuthStore();
  const { logout } = useAuth();
  return (
    <Transition show={isMobileNavOpen} as={Fragment}>
      <div className="h-full">
        {/* overlay */}
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
            className="fixed inset-0 z-[9999] bg-gray-700/40 backdrop-blur-sm md:hidden"
          ></div>
        </Transition.Child>
        {/* end of overlay */}

        <Transition.Child
          as={Fragment}
          enter="transform transition-all duration-300 ease-in-out"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition-all duration-300 ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <aside className="relative inset-y-0 left-0 z-[999999999] flex h-full w-72 flex-shrink-0 flex-col items-start justify-start rounded-l-2xl border-r bg-white shadow-xl md:static md:shadow-none">
            {/* gradients */}
            <div className="pointer-events-none absolute left-0 top-[50%] h-full w-full">
              <div className="h-72 w-32 rotate-[36deg] bg-skin-primary opacity-30 blur-3xl"></div>
            </div>

            <div className="w-full border-b p-5">
              <div className="flex w-full items-center justify-between gap-5">
                <div className="w-full">
                  <Link
                    href="/"
                    className="flex items-start justify-start gap-1"
                  >
                    <div className=" aspect-square rounded-full bg-[#cd0a5d] p-1">
                      <svg
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 218 132"
                      >
                        <g clip-path="url(#a)" fill="#F2F2F2">
                          <path d="M104.668 49.036V0H49.123c-1.07 0-2.9.347-4.245.554a49.338 49.338 0 0 0-7.595 1.699 51.656 51.656 0 0 0-7.595 2.98 33.05 33.05 0 0 0-3.107 1.629 46.989 46.989 0 0 0-4.487 2.876 50.28 50.28 0 0 0-5.8 4.748 23.799 23.799 0 0 0-1.864 1.871A50.385 50.385 0 0 0 9.7 22.11a47.23 47.23 0 0 0-2.796 4.505 33.27 33.27 0 0 0-1.622 3.119 52.101 52.101 0 0 0-2.969 7.624A52.968 52.968 0 0 0 0 52.606c-.007 2.552.177 5.1.553 7.624.37 2.58.936 5.13 1.691 7.624a53.628 53.628 0 0 0 2.969 7.624 37.568 37.568 0 0 0 1.622 3.084 47.706 47.706 0 0 0 2.866 4.61 53.21 53.21 0 0 0 4.729 5.718 32.206 32.206 0 0 0 1.864 1.906 49.99 49.99 0 0 0 5.73 4.712 55.264 55.264 0 0 0 4.488 2.912 65.077 65.077 0 0 0 3.107 1.628 51.648 51.648 0 0 0 7.595 2.981 49.417 49.417 0 0 0 7.595 1.663 49.63 49.63 0 0 0 7.594.555c2.542.007 5.08-.178 7.595-.555a51.209 51.209 0 0 0 7.594-1.663 53.224 53.224 0 0 0 7.595-2.981l3.072-1.629a55.86 55.86 0 0 0 4.522-2.91 52.783 52.783 0 0 0 7.595-6.62 52.913 52.913 0 0 0 4.695-5.718 56.193 56.193 0 0 0 2.9-4.54 86.973 86.973 0 0 0 1.622-3.084 53.647 53.647 0 0 0 2.969-7.624 49.85 49.85 0 0 0 2.106-15.317c0-1.248.069-2.391 0-3.57ZM91.239 60.23c-.242 1.213-.518 2.426-.863 3.465-.345 1.04-.897 2.703-1.415 4.02a41.983 41.983 0 0 1-4.212 7.624 45.86 45.86 0 0 1-1.968 2.565 38.714 38.714 0 0 1-5.04 5.267 45.796 45.796 0 0 1-2.554 1.976 41.721 41.721 0 0 1-7.595 4.228 54.955 54.955 0 0 1-4.004 1.42c-1.346.416-2.382.624-3.452.867a39.44 39.44 0 0 1-7.595.728 38.927 38.927 0 0 1-7.594-.728c-1.243-.243-2.417-.52-3.453-.867-1.035-.346-2.727-.9-4.004-1.42a40.582 40.582 0 0 1-7.595-4.228 36.46 36.46 0 0 1-2.589-1.976 38.424 38.424 0 0 1-5.005-5.06 46.587 46.587 0 0 1-2.002-2.564 39.825 39.825 0 0 1-4.177-7.624 34.735 34.735 0 0 1-1.416-4.02 57.534 57.534 0 0 1-.897-3.465 39.898 39.898 0 0 1-.725-7.624 39.376 39.376 0 0 1 .448-7.763c.242-1.247.553-2.426.898-3.465a30.699 30.699 0 0 1 1.415-4.02 38.824 38.824 0 0 1 4.177-7.832c.622-.901 1.312-1.768 2.003-2.6a38.05 38.05 0 0 1 5.005-5.024c.829-.693 1.692-1.386 2.59-2.01a38.581 38.581 0 0 1 7.594-4.194 30.444 30.444 0 0 1 4.004-1.42 50.99 50.99 0 0 1 3.452-.901c1.105-.243 2.866-.45 4.316-.59 1.45-.138 2.174 0 3.279 0 2.549-.003 5.092.24 7.595.728 1.208.243 2.416.555 3.452.901 1.362.391 2.7.865 4.004 1.421a39.577 39.577 0 0 1 7.595 4.193 46.479 46.479 0 0 1 2.554 2.01 38.4 38.4 0 0 1 5.386 4.887c.69.831 1.346 1.698 1.967 2.599a40.835 40.835 0 0 1 4.212 7.624 45.809 45.809 0 0 1 1.415 4.02c.415 1.386.622 2.356.863 3.465.489 2.512.732 5.065.725 7.624v2.08a36.841 36.841 0 0 1-.794 5.683ZM217.482 45.051a54.28 54.28 0 0 0-1.691-7.624 52.138 52.138 0 0 0-2.969-7.624c-.518-1.074-1.036-2.114-1.623-3.119a54.924 54.924 0 0 0-2.865-4.505 54.446 54.446 0 0 0-4.66-5.822l-1.864-1.871a53.442 53.442 0 0 0-5.731-4.748 47.365 47.365 0 0 0-4.626-2.807 37.248 37.248 0 0 0-3.072-1.629 51.669 51.669 0 0 0-7.595-2.98 52.345 52.345 0 0 0-30.378 0 51.669 51.669 0 0 0-7.595 2.98 37.41 37.41 0 0 0-3.072 1.63 47.437 47.437 0 0 0-4.522 2.875 53.44 53.44 0 0 0-5.731 4.748l-1.76 1.802a54.176 54.176 0 0 0-4.833 5.753 55.203 55.203 0 0 0-2.866 4.505c-.586 1.005-1.104 2.045-1.622 3.119a52.134 52.134 0 0 0-2.969 7.624 54.408 54.408 0 0 0-1.519 7.693 55.094 55.094 0 0 0-.552 7.624c.009 2.551.194 5.099.552 7.624a56.59 56.59 0 0 0 1.692 7.624 53.612 53.612 0 0 0 2.969 7.624c.517 1.04 1.035 2.08 1.622 3.085.898 1.56 1.83 3.084 2.865 4.54a57.615 57.615 0 0 0 4.661 5.648l1.864 1.906a53.092 53.092 0 0 0 5.73 4.713 55.804 55.804 0 0 0 4.523 2.911l3.072 1.63a51.615 51.615 0 0 0 7.595 2.979 53.365 53.365 0 0 0 30.378 0 51.659 51.659 0 0 0 7.595-2.98l3.072-1.629a55.96 55.96 0 0 0 4.522-2.91 53.2 53.2 0 0 0 5.731-4.714l1.864-1.906a57.801 57.801 0 0 0 4.626-5.648c1.035-1.456 1.967-2.98 2.865-4.54.587-1.005 1.105-2.045 1.622-3.085a53.612 53.612 0 0 0 2.969-7.624 56.59 56.59 0 0 0 1.692-7.624c.358-2.525.543-5.073.552-7.624a55.079 55.079 0 0 0-.518-7.624Zm-12.289 7.624a39.971 39.971 0 0 1-.725 7.624c-.242 1.213-.518 2.426-.863 3.466a42.626 42.626 0 0 1-1.416 4.02 39.945 39.945 0 0 1-4.211 7.624 45.962 45.962 0 0 1-1.968 2.564 40.683 40.683 0 0 1-5.04 5.198 36.254 36.254 0 0 1-2.589 1.976 40.582 40.582 0 0 1-7.595 4.228 49.576 49.576 0 0 1-4.004 1.42c-1.381.416-2.382.624-3.452.867-5.017.97-10.172.97-15.189 0-1.209-.243-2.417-.52-3.452-.866-1.036-.347-2.693-.901-4.005-1.421a40.542 40.542 0 0 1-7.594-4.228 36.5 36.5 0 0 1-2.59-1.976 40.726 40.726 0 0 1-5.005-5.06 45.962 45.962 0 0 1-1.968-2.564 40 40 0 0 1-4.211-7.624 42.704 42.704 0 0 1-1.588-4.089 32.007 32.007 0 0 1-.863-3.465 39.81 39.81 0 0 1-.725-7.624 39.33 39.33 0 0 1 .725-7.624c.219-1.172.507-2.329.863-3.466a36.623 36.623 0 0 1 1.415-4.02 38.957 38.957 0 0 1 4.212-7.624 36.588 36.588 0 0 1 1.967-2.599 40.44 40.44 0 0 1 5.006-5.025c.828-.693 1.691-1.386 2.589-2.01a38.572 38.572 0 0 1 7.595-4.193 32.33 32.33 0 0 1 4.004-1.421 57.1 57.1 0 0 1 3.452-.901 39.996 39.996 0 0 1 15.189 0c1.209.243 2.417.554 3.452.901 1.365.385 2.702.86 4.005 1.42a38.564 38.564 0 0 1 7.594 4.194c.898.624 1.761 1.317 2.59 2.01a40.363 40.363 0 0 1 5.005 5.025c.69.832 1.346 1.698 1.968 2.6a38.953 38.953 0 0 1 4.211 7.623 36.818 36.818 0 0 1 1.692 3.743 51.08 51.08 0 0 1 .863 3.465c.463 2.56.671 5.161.621 7.763l.035.07ZM97.073 117.583a61.116 61.116 0 0 1-3.97 2.669 154.567 154.567 0 0 1-2.727 1.663 86.298 86.298 0 0 1-7.595 3.812c-1.83.797-3.693 1.49-5.592 2.149l-2.002.658a81.16 81.16 0 0 1-7.595 1.941 69.253 69.253 0 0 1-7.594 1.144c-2.52.242-5.04.381-7.595.381-2.555 0-5.11 0-7.595-.381a68.046 68.046 0 0 1-7.594-1.144 76.11 76.11 0 0 1-7.595-1.941l-2.002-.658c-1.864-.659-3.728-1.352-5.558-2.149a81.704 81.704 0 0 1-7.595-3.812c-.932-.554-1.864-1.074-2.761-1.663a69.237 69.237 0 0 1-4.523-3.084l6.456-11.229.828.624a57.69 57.69 0 0 0 7.595 4.852l2.313 1.213c1.726.832 3.452 1.629 5.282 2.287a55.192 55.192 0 0 0 7.594 2.391c2.5.613 5.037 1.065 7.595 1.352 5.045.6 10.144.6 15.189 0a62.267 62.267 0 0 0 7.595-1.352 58.378 58.378 0 0 0 7.594-2.391c1.795-.658 3.452-1.455 5.248-2.287l2.347-1.213a62.581 62.581 0 0 0 7.594-4.852l.242-.173 6.421 11.193Z" />
                        </g>
                        <defs>
                          <clipPath id="a">
                            <path fill="#fff" d="M0 0h218v132H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <div className="">
                      <svg
                        fill="none"
                        className="w-20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 197 96"
                      >
                        <g clip-path="url(#a)" fill="#000">
                          <path d="m9.06 45.45 22.81-22.91a3.89 3.89 0 0 1 2.74-1.14 3.87 3.87 0 0 1 2.74 6.6L20.51 44.77l18.94 24.07a4.14 4.14 0 0 1-3.25 6.7A4.14 4.14 0 0 1 33 74L14.11 50.34l-5 4.79V71a4.53 4.53 0 0 1-4.53 4.53A4.532 4.532 0 0 1 0 71V5a4.53 4.53 0 1 1 9.06 0v40.45ZM53.08 12.29a5.41 5.41 0 0 1-4-1.67 5.4 5.4 0 0 1-1.66-4 5.371 5.371 0 0 1 1.66-4 5.46 5.46 0 0 1 4-1.64 5.53 5.53 0 0 1 4 1.64 5.37 5.37 0 0 1 1.66 4 5.4 5.4 0 0 1-1.66 4 5.482 5.482 0 0 1-4 1.67ZM48.55 71V25.93a4.53 4.53 0 1 1 9.06 0V71a4.529 4.529 0 0 1-9.06 0ZM69.56 71V28.84h-3.83A3.73 3.73 0 0 1 62 25.12a3.72 3.72 0 0 1 3.72-3.72h3.83v-6c0-5.207 1.223-9.07 3.67-11.59C75.667 1.29 79.393.02 84.4 0c.67 0 1.34 0 2 .05a3.7 3.7 0 0 1 3.52 3.7 3.689 3.689 0 0 1-3.74 3.7h-.38c-4.82 0-7.23 2.667-7.23 8v6h7.36a3.71 3.71 0 0 1 3.72 3.72 3.72 3.72 0 0 1-3.72 3.72h-7.31V71a4.531 4.531 0 0 1-9.06 0ZM115.56 96a25.88 25.88 0 0 1-15.31-4.51A19.52 19.52 0 0 1 95.6 87a4.37 4.37 0 0 1 3.54-7h.17a4.43 4.43 0 0 1 3.74 2.11 11.836 11.836 0 0 0 4.07 3.89 16.79 16.79 0 0 0 8.8 2.24c4.667 0 8.333-1.23 11-3.69a12.656 12.656 0 0 0 4-9.79v-8.54h-.21a18.87 18.87 0 0 1-7.13 7.11A20.192 20.192 0 0 1 113.42 76c-6.9 0-12.433-2.517-16.6-7.55-4.167-5.034-6.25-11.764-6.25-20.19 0-8.467 2.09-15.217 6.27-20.25 4.18-5.034 9.777-7.55 16.79-7.55a20.19 20.19 0 0 1 10.31 2.65 19.7 19.7 0 0 1 7.29 7.4h.15v-4.79a4.32 4.32 0 0 1 4.32-4.32 4.32 4.32 0 0 1 4.3 4.32v48.73c0 6.493-2.223 11.697-6.67 15.61-4.447 3.913-10.37 5.893-17.77 5.94Zm-.31-28a13.876 13.876 0 0 0 11.4-5.41c2.9-3.614 4.35-8.39 4.35-14.33 0-5.94-1.44-10.737-4.32-14.39a13.858 13.858 0 0 0-11.4-5.45A13.483 13.483 0 0 0 104 33.81c-2.8 3.6-4.197 8.416-4.19 14.45.007 6.033 1.403 10.83 4.19 14.39A13.522 13.522 0 0 0 115.25 68ZM171 76.48c-7.567 0-13.64-2.527-18.22-7.58-4.58-5.053-6.87-11.863-6.87-20.43 0-8.573 2.29-15.387 6.87-20.44 4.58-5.053 10.653-7.577 18.22-7.57 7.527 0 13.583 2.523 18.17 7.57 4.587 5.047 6.877 11.86 6.87 20.44 0 8.54-2.29 15.343-6.87 20.41s-10.637 7.6-18.17 7.6ZM159.45 63.2a15.291 15.291 0 0 0 23.14 0c2.84-3.52 4.263-8.44 4.27-14.76.007-6.32-1.417-11.24-4.27-14.76a15.272 15.272 0 0 0-23.14 0c-2.867 3.54-4.3 8.45-4.3 14.73 0 6.28 1.433 11.21 4.3 14.79Z" />
                        </g>
                        <defs>
                          <clipPath id="a">
                            <path fill="#fff" d="M0 0h196.07v95.95H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </Link>
                  <p className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.2em] text-gray-600">
                    Admin dashboard
                  </p>
                </div>

                {isMobileNavOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BasicButton
                      variant={"secondary"}
                      className={"p-3 md:p-3"}
                      onClick={() => {
                        setTimeout(() => {
                          setIsMobileNavOpen((pv) => !pv);
                        }, 100);
                      }}
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
                  </motion.div>
                )}
              </div>
            </div>

            {/* links */}
            <div className="mt-3 flex w-full flex-1 flex-col items-start justify-start gap-1 overflow-y-auto p-2 px-3">
              {/* <NavLink href="/shop/dashboard">
                {(isActive) => (
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center justify-start gap-2">
                      <div
                        className={`flex w-min items-center justify-center rounded-full p-1 ${
                          isActive ? "bg-skin-primary-light" : "bg-gray-100"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M6.222 4.601a9.499 9.499 0 0 1 1.395-.771c1.372-.615 2.058-.922 2.97-.33c.913.59.913 1.56.913 3.5v1.5c0 1.886 0 2.828.586 3.414c.586.586 1.528.586 3.414.586H17c1.94 0 2.91 0 3.5.912c.592.913.285 1.599-.33 2.97a9.498 9.498 0 0 1-10.523 5.435A9.5 9.5 0 0 1 6.222 4.601"
                            opacity=".5"
                          />
                          <path
                            fill="currentColor"
                            d="M21.446 7.069a8.026 8.026 0 0 0-4.515-4.515C15.389 1.947 14 3.344 14 5v4a1 1 0 0 0 1 1h4c1.657 0 3.053-1.39 2.446-2.931"
                          />
                        </svg>
                      </div>

                      <p>Dashboard</p>
                    </div>

                    <span className="flex min-w-[20px] items-center justify-center rounded-lg bg-skin-primary px-1 text-[0.58rem] text-white">
                      9
                    </span>
                  </div>
                )}
              </NavLink> */}

              <NavLink href="/admin/attributes">
                {(isActive) => (
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center justify-start gap-2">
                      <div
                        className={`flex w-min items-center justify-center rounded-full p-1 ${
                          isActive ? "bg-skin-primary-light" : "bg-gray-100"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073a3.196 3.196 0 0 0-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709z"
                          />
                          <path
                            fill="currentColor"
                            d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641"
                            opacity=".7"
                          />
                          <path
                            fill="currentColor"
                            d="M21.403 7.14a3.153 3.153 0 0 0-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802"
                            opacity=".5"
                          />
                          <path
                            fill="currentColor"
                            d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011c.137.155.257.32.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3.062 3.062 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824a3.15 3.15 0 0 1 .362-.498l9.04 4.52l3.387-1.693z"
                          />
                        </svg>
                      </div>

                      <p>Attributes</p>
                    </div>
                  </div>
                )}
              </NavLink>

              <NavLink href="/admin/categories">
                {(isActive) => (
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center justify-start gap-2">
                      <div
                        className={`flex w-min items-center justify-center rounded-full p-1 ${
                          isActive ? "bg-skin-primary-light" : "bg-gray-100"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073a3.196 3.196 0 0 0-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709z"
                          />
                          <path
                            fill="currentColor"
                            d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641"
                            opacity=".7"
                          />
                          <path
                            fill="currentColor"
                            d="M21.403 7.14a3.153 3.153 0 0 0-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802"
                            opacity=".5"
                          />
                          <path
                            fill="currentColor"
                            d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011c.137.155.257.32.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3.062 3.062 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824a3.15 3.15 0 0 1 .362-.498l9.04 4.52l3.387-1.693z"
                          />
                        </svg>
                      </div>

                      <p>Categories</p>
                    </div>
                  </div>
                )}
              </NavLink>

              {/* <ExpandableNavLink
                isOpen={usePathname().includes("/shop/dashboard/listing")}
                Sublinks={() => (
                  <>
                    <SubNavLink
                      className="text-xs font-medium"
                      href="/shop/dashboard/listing/create"
                    >
                      {({}) => <p> Create listing</p>}
                    </SubNavLink>
                    <SubNavLink
                      className="text-xs font-medium"
                      href="/shop/dashboard/listing/update"
                    >
                      {({}) => <p> Update listing</p>}
                    </SubNavLink>
                  </>
                )}
              >
                {(isOpen) => (
                  <div className="flex items-center justify-start gap-2">
                    <div
                      className={`flex w-min items-center justify-center rounded-full p-1 ${
                        isOpen ? "bg-skin-primary-light" : "bg-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073a3.196 3.196 0 0 0-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709z"
                        />
                        <path
                          fill="currentColor"
                          d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641"
                          opacity=".7"
                        />
                        <path
                          fill="currentColor"
                          d="M21.403 7.14a3.153 3.153 0 0 0-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802"
                          opacity=".5"
                        />
                        <path
                          fill="currentColor"
                          d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011c.137.155.257.32.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3.062 3.062 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824a3.15 3.15 0 0 1 .362-.498l9.04 4.52l3.387-1.693z"
                        />
                      </svg>
                    </div>
                    <p>Listing</p>
                  </div>
                )}
              </ExpandableNavLink> */}

              {/* <NavLink href="/shop/dashboard/message">
                {(isActive) => (
                  <div className="flex items-center justify-start gap-2">
                    <div
                      className={`flex w-min items-center justify-center rounded-full p-1 ${
                        isActive ? "bg-skin-primary-light" : "bg-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="m6.72 10.6l1.439 1.2c1.836 1.53 2.755 2.295 3.84 2.295c1.087 0 2.005-.765 3.842-2.296l1.44-1.2c.353-.294.53-.442.624-.643c.095-.202.095-.432.095-.893V7c0-.32 0-.62-.002-.898c-.012-1.771-.098-2.737-.73-3.37C16.535 2 15.357 2 13 2h-2c-2.357 0-3.536 0-4.268.732c-.633.633-.72 1.599-.732 3.37c-.002.279 0 .577 0 .898v2.063c0 .46 0 .691.094.893c.095.201.272.349.625.644M9.25 6a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9.25 6m1 3a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75"
                          clip-rule="evenodd"
                        />
                        <path
                          fill="currentColor"
                          d="m8.159 11.8l-1.44-1.2c-.353-.295-.53-.442-.625-.644C6 9.754 6 9.524 6 9.064V6.102c-1.3.128-2.175.417-2.828 1.07C2 8.343 2 10.23 2 14.002c0 3.77 0 5.656 1.172 6.827c1.171 1.172 3.057 1.172 6.828 1.172h4c3.771 0 5.657 0 6.828-1.172C22 19.659 22 17.773 22 14.002s0-5.658-1.172-6.83c-.653-.653-1.529-.942-2.83-1.07c.002.28.002.579.002.9v2.063c0 .46 0 .69-.095.892c-.094.202-.27.35-.625.644l-1.44 1.2c-1.836 1.53-2.754 2.295-3.84 2.295c-1.086 0-2.005-.765-3.841-2.296"
                          opacity=".5"
                        />
                      </svg>
                    </div>
                    <p>Messages</p>
                  </div>
                )}
              </NavLink> */}
            </div>

            <div className="flex w-full items-center justify-between gap-3 border-t p-3">
              <div className="flex w-full items-center justify-start gap-3">
                <Avatar
                  className="aspect-square w-10"
                  src="https://images.pexels.com/photos/19877105/pexels-photo-19877105/free-photo-of-mong-c.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  Fallback={() => (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-base font-medium text-gray-600">
                      HP
                    </div>
                  )}
                />

                <div className="truncate">
                  <h3 className="truncate text-sm font-medium text-gray-800">
                    {user?.displayName}
                  </h3>
                  <p className="truncate text-[0.68rem] text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              <BasicButton
                onClick={() => logout()}
                variant={"secondary"}
                className={"p-2 md:p-2"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M15 2h-1c-2.828 0-4.243 0-5.121.879C8 3.757 8 5.172 8 8v8c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2"
                    opacity=".6"
                  />
                  <path
                    fill="currentColor"
                    d="M8 8c0-1.538 0-2.657.141-3.5H8c-2.357 0-3.536 0-4.268.732C3 5.964 3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268c.732.732 1.911.732 4.268.732h.141C8 18.657 8 17.538 8 16v-4.75z"
                    opacity=".4"
                  />
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M14.53 11.47a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 1 1-1.06-1.06l.72-.72H5a.75.75 0 0 1 0-1.5h7.19l-.72-.72a.75.75 0 1 1 1.06-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </BasicButton>
            </div>
          </aside>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default Sidebar;
