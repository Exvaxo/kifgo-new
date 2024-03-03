"use client";
import { useAuth } from "@/context/AuthContext";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import fetcher from "../utilities/fetcher";
import { useWhoAmI } from "./client-apis/user/useWhoAmI";
import Link from "next/link";

const HandleUser = () => {
  const { user } = useAuthStore();
  const { logout, refreshToken } = useAuth();
  const router = useRouter();

  const handleSendVerifyEmail = async () => {
    await fetcher().post("/user/verify-email/send");
    router.push("/user/verify-email/verify-otp");
  };

  const { mutateAsync: whoAmI, data: userData } = useWhoAmI();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleMakeAsAdmin = async () => {
    await fetcher().post("/admin/makeAsAdmin");
    await refreshToken();
    router.refresh();
  };

  const handleRevokeAdmin = async () => {
    await fetcher().post("/admin/revokeAdmin");
    await refreshToken();
    router.refresh();
  };

  return (
    <div className="h-screen overflow-auto">
      {user ? (
        <div className="">
          <button
            onClick={async () => {
              await whoAmI();
              await refreshToken();
            }}
          >
            api
          </button>
          {user.role !== "ADMIN" ? (
            <button className="block" onClick={handleMakeAsAdmin}>
              Make as admin
            </button>
          ) : (
            <button className="block" onClick={handleRevokeAdmin}>
              Revoke admin
            </button>
          )}

          <Link href={"/admin"}>Admin page</Link>

          <button className="block" onClick={handleSendVerifyEmail}>
            send verify email
          </button>
          <h3>user from store</h3>
          <h2>
            {localStorage.getItem(
              `${process.env.NEXT_PUBLIC_TOKEN_PREFIX}_token`,
            )}
          </h2>
          <p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </p>
          <button onClick={() => logout()}>logout</button>
        </div>
      ) : (
        <p>no user</p>
      )}
    </div>
  );
};

export default HandleUser;
