"use client";
import AuthContextProvider from "@/context/AuthContext";
import { Suspense } from "react";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <AuthContextProvider>{children}</AuthContextProvider>;
    </Suspense>
  );
};

export default ContextProvider;
