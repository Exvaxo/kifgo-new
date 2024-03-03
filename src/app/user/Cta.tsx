"use client";
import { Button, ButtonVariants } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import useAuthStore from "@/store/authStore";
import { cn } from "@/utilities/cn";
import Link from "next/link";
import React from "react";

const Cta = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  return (
    <div className="mt-5 flex items-center justify-center gap-5">
      {!user && (
        <Link
          href={"/start-sell"}
          className={cn(
            ButtonVariants({
              variant: "primary",
              className: "block w-max",
            }),
          )}
        >
          Learn more
        </Link>
      )}

      {user ? (
        <>
          <Link
            href={"/shop/dashboard"}
            className={cn(
              ButtonVariants({
                variant: "primary",
                className: "block w-max",
              }),
            )}
          >
            Dashboard
          </Link>
          <Button
            variant={"unstyled"}
            className="block w-max bg-gray-200"
            onClick={async () => await logout()}
          >
            Logout
          </Button>
        </>
      ) : (
        <Link
          href={"/user/signin"}
          className={cn(
            ButtonVariants({
              variant: "unstyled",
              className: "block w-max bg-gray-200",
            }),
          )}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Cta;
