"use client";

import { BasicButton } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import React from "react";

const DynamicLinks = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  return (
    <>
      {user ? (
        <>
          {user.role === "ADMIN" && (
            <Link
              className="text-sm text-skin-primary hover:text-skin-primary/80 hover:underline"
              href={"/admin"}
            >
              Admin
            </Link>
          )}
          <BasicButton
            onClick={() => {
              logout();
            }}
            variant={"ghost"}
            className="text-sm text-skin-primary hover:text-skin-primary/80 hover:underline"
          >
            Logout
          </BasicButton>
        </>
      ) : (
        <>
          <Link
            className="text-sm text-skin-primary hover:text-skin-primary/80 hover:underline"
            href={"/user/signin"}
          >
            Signin
          </Link>
          <Link
            className="text-sm text-skin-primary hover:text-skin-primary/80 hover:underline"
            href={"/user/register"}
          >
            Register
          </Link>
        </>
      )}
    </>
  );
};

export default DynamicLinks;
