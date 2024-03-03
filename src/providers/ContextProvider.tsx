"use client";
import AuthContextProvider from "@/context/AuthContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default ContextProvider;
