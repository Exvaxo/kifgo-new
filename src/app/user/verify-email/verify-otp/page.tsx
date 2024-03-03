"use client";
import { useAuth } from "@/context/AuthContext";
import fetcher from "@/utilities/fetcher";
import { useRouter, useSearchParams } from "next/navigation";
import OtpVerificationForm from "./OtpVerificationForm";

const Page = () => {
  const searchParams = useSearchParams();
  return (
    <section className="h-[100dvh] bg-gray-950 p-2">
      <div className="flex h-full w-full overflow-hidden rounded-2xl bg-white">
        <div className="relative hidden h-full w-[50%] lg:block">
          {/* <div className="absolute inset-x-0 bottom-0 w-full">
          <img
            src="/signin.png"
            alt="sign in image"
            className="h-[100dvh] w-full object-cover"
          />
        </div> */}
          <div className="h-full w-full bg-gray-200"></div>
        </div>

        {/* <div className="hidden h-full items-center justify-center lg:flex">
        <div className="h-[50%] border-r"></div>
      </div> */}

        <div className="flex h-full w-[50%] grow flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex w-full flex-1 flex-col items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center">
              <div className="aspect-square rounded-full bg-gray-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[#cd0a5d]"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073a3.196 3.196 0 0 0-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709l2 1.05Z" />
                    <path
                      d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641Z"
                      opacity=".7"
                    />
                    <path
                      d="M21.403 7.14a3.153 3.153 0 0 0-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802Z"
                      opacity=".5"
                    />
                    <path d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011c.137.155.257.32.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3.062 3.062 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824a3.15 3.15 0 0 1 .362-.498l9.04 4.52l3.386-1.693l-9.063-4.985Z" />
                  </g>
                </svg>
              </div>
              <h1 className="mt-5 text-2xl">Check your email</h1>
              <p className="mt-1 text-center text-sm text-gray-500">
                We sent you a sign-in code to :{" "}
                <span className="font-medium">{searchParams.get("email")}</span>
                <br />
                Paste (or type) it below to continue.
              </p>

              <div className="mt-10 w-full max-w-xs">
                <OtpVerificationForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
