import {
  User,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuthStore from "../store/authStore";
import { auth, googleProvider } from "@/lib/firebase.config";
import fetcher from "@/utilities/fetcher";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AuthContext = createContext({
  getTokenClaims: async () => Promise<any>,
  fetchUserPromise: async () => Promise<unknown>,
  signIn: async (email: string, password: string) => Promise<unknown>,
  socialSignIn: async (provider: "GOOGLE" | "FACEBOOK" | "LINKEDIN") =>
    Promise<unknown>,
  register: async (email: string, password: string) => Promise<unknown>,
  updateName: async (firstName: string, lastName?: string) => Promise<unknown>,
  resetPassword: async (code: string, newPassword: string) => Promise<unknown>,
  refreshToken: async () => Promise<unknown>,
  logout: async () => Promise<unknown>,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: any) {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const {
    setUser,
    setLoginError,
    setRegisterError,
    setFetchUserLoading,
    setEmailPasswordLoading,
    setPasswordResetLoading,
    setGoogleLoading,
    setProviderError,
  } = useAuthStore();
  const { getStorage, setStorage, removeStorage } = useLocalStorage();

  const readUser = async (user: User | null) => {
    if (user) {
      let userObj: User;
      userObj = user;
      /*
       *   If the user logs in for the first time, they will be redirected to verify email page.
       *
       *   Once the user logs out, and logs back in, he/she will be asked to verify the email,
       *   if it is not verified.
       */

      const hasEmailVerifiedPrompted = getStorage("hasEmailVerifiedPrompted");
      if (user.emailVerified === false && !hasEmailVerifiedPrompted) {
        //setStorage("hasEmailVerifiedPrompted", true);
        //router.push("/user/verify-email/verify-otp");
      }

      const tokenFromStorage = getStorage("token");
      if (!tokenFromStorage) {
        const token = await user.getIdToken();
        if (token) {
          setStorage("token", token);
        }
      }

      const claims = await getTokenClaims();

      setUser({
        uid: userObj.uid,
        photoURL: userObj.photoURL,
        displayName: userObj.displayName,
        ...claims,
      });

      try {
        await fetcher().get("/user/login");
      } catch (error) {
        try {
          await fetcher().post("/user/login");
        } catch (error: any) {
          if (error.code === "token-expired") {
            await refreshToken();
          }
        }
      }
    }
  };

  const getTokenClaims = async () => {
    const tokenData = await auth.currentUser?.getIdTokenResult(true);
    if (tokenData) {
      return tokenData.claims;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFetchUserLoading(true);
      readUser(firebaseUser);
      setFetchUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function fetchUserPromise() {
    return new Promise(async (resolve) => {
      let unsubscribe = onAuthStateChanged(auth, async (user) => {
        resolve(user);
        unsubscribe();
      });
    });
  }

  async function signIn(email: string, password: string) {
    try {
      setEmailPasswordLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      await fetcher().post("/user/login");
      router.refresh();
      router.push(
        searchParams.get("callback") ? searchParams.get("callback")! : "/",
      );
    } catch (error: any) {
      if (error.code === "auth/invalid-login-credentials") {
        setLoginError({ code: error.code, message: "Invalid Credentials" });
      } else {
        setLoginError({ code: error.code, message: error.message });
      }
    } finally {
      setEmailPasswordLoading(false);
    }
  }

  async function socialSignIn(provider: "GOOGLE" | "FACEBOOK" | "LINKEDIN") {
    try {
      if (provider === "GOOGLE") {
        setGoogleLoading(true);
        await signInWithPopup(auth, googleProvider);
      }

      const {
        uid,
        email: fbEmail,
        emailVerified,
        providerData,
        displayName,
        photoURL,
      } = auth.currentUser as User;

      await fetcher().post("/user/register", {
        email: fbEmail,
        firstName: displayName,
        photoURL: photoURL,
        lastName: "",
        address: null,
        city: "",
        postalCode: "",
        province: "",
        country: "",
        identityVerification: null,
      });

      await refreshToken();
      router.refresh();

      if (emailVerified) {
        if (path.includes("signin")) {
          router.push("/");
        } else {
          router.push("/user/update-name");
        }
      } else {
        await fetcher().post("/user/verify-email/send");
        router.push(`/user/verify-email/verify-otp?email=${fbEmail}`);
      }
    } catch (error: any) {
      setProviderError({ code: error.code, message: error.message });
    } finally {
      setGoogleLoading(false);
    }
  }

  async function register(email: string, password: string) {
    try {
      setEmailPasswordLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await fetcher().post("/user/register", {
        email: email,
        photoURL: "",
        firstName: "",
        lastName: "",
        address: null,
        city: "",
        postalCode: "",
        province: "",
        country: "",
        identityVerification: null,
      });

      await refreshToken();
      router.refresh();
      await fetcher().post("/user/verify-email/send");

      if (user.emailVerified) {
        router.push("/user/update-name");
      } else {
        router.push(`/user/verify-email/verify-otp?email=${user.email}`);
      }
    } catch (error: any) {
      setRegisterError({ code: error.code, message: error.message });
    } finally {
      setEmailPasswordLoading(false);
    }
  }

  async function updateName(firstName: string, lastName?: string) {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: firstName + " " + lastName,
        });

        await fetcher().post("/user/update", {
          firstName: firstName,
          lastName: lastName,
        });

        await refreshToken();
      }
    } catch (error) {}
  }

  async function logout() {
    router.refresh();
    setUser(null);
    removeStorage("token");
    removeStorage("hasEmailVerifiedPrompted");
    await signOut(auth);
    await fetcher().post("/user/logout");
    router.push("/user/signin");
  }

  async function logoutWithoutRedirect() {
    setUser(null);
    removeStorage("token");
    removeStorage("hasEmailVerifiedPrompted");
    await signOut(auth);
    await fetcher().post("/user/logout");
  }

  async function refreshToken() {
    if (auth.currentUser) {
      try {
        await fetcher().post("/user/logout");
        const token = await auth.currentUser.getIdToken(true);
        setStorage("token", token);
        auth.onIdTokenChanged(async (firebaseUser) => {
          readUser(firebaseUser);
        });

        await fetcher().post("/user/login");
      } catch (error: any) {
        console.log(error);
      }
    }
  }

  async function resetPassword(code: string, newPassword: string) {
    try {
      setPasswordResetLoading(true);
      await confirmPasswordReset(auth, code, newPassword);
      router.push("/user/signin");
      setPasswordResetLoading(false);
    } catch (error: any) {
      console.log(error.code);
    } finally {
      setPasswordResetLoading(false);
    }
  }

  const value: any = {
    getTokenClaims,
    fetchUserPromise,
    signIn,
    updateName,
    socialSignIn,
    register,
    resetPassword,
    refreshToken,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
