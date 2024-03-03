import { Role } from "@prisma/client";
import { User } from "firebase/auth";
import { create } from "zustand";

interface UserState {
  user:
    | (User & {
        first_name: string;
        last_name: string;
        id: string;
        name?: string;
        role: Role;
      })
    | null;
  registerError: null | { code: string | number; message: string };
  loginError: null | { code: string | number; message: string };
  providerError: null | { code: string | number; message: string };
  fetchUserLoading: boolean;
  googleLoading: boolean;
  emailPaswordLoading: boolean;
  passwordResetLoading: boolean;
  resendEmailOTPTimer: boolean;

  setUser: (user: any) => void;
  setRegisterError: (params: { code: string; message: string } | null) => void;
  setLoginError: (params: { code: string; message: string } | null) => void;
  setProviderError: (params: { code: string; message: string } | null) => void;
  setFetchUserLoading: (value: boolean) => void;
  setGoogleLoading: (value: boolean) => void;
  setEmailPasswordLoading: (value: boolean) => void;
  setPasswordResetLoading: (value: boolean) => void;
  setResendEmailOTPTimer: (value: boolean) => void;
}

const useAuthStore = create<UserState>()((set) => ({
  user: null,
  loginError: null,
  registerError: null,
  providerError: null,
  fetchUserLoading: true,
  googleLoading: false,
  emailPaswordLoading: false,
  passwordResetLoading: false,
  resendEmailOTPTimer: false,

  setUser: (user) => {
    set((state) => ({
      ...state,
      user: user,
    }));
  },

  setLoginError: (params) => {
    set((state) => ({
      ...state,
      loginError: params
        ? { code: params.code, message: params.message }
        : null,
    }));
  },

  setRegisterError: (params) => {
    set((state) => ({
      ...state,
      registerError: params
        ? { code: params.code, message: params.message }
        : null,
    }));
  },

  setProviderError: (params) => {
    set((state) => ({
      ...state,
      providerError: params
        ? { code: params.code, message: params.message }
        : null,
    }));
  },

  setFetchUserLoading: (value) => {
    set((state) => ({
      ...state,
      fetchUserLoading: value,
    }));
  },

  setGoogleLoading: (value) => {
    set((state) => ({
      ...state,
      googleLoading: value,
    }));
  },

  setEmailPasswordLoading: (value) => {
    set((state) => ({
      ...state,
      emailPaswordLoading: value,
    }));
  },

  setPasswordResetLoading: (value) => {
    set((state) => ({
      ...state,
      passwordResetLoading: value,
    }));
  },

  setResendEmailOTPTimer: (value) => {
    set((state) => ({
      ...state,
      resendEmailOTPTimer: value,
    }));
  },
}));

export default useAuthStore;
