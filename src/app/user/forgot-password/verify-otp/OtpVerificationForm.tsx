"use client";
import useGetResetPasswordOtpTimer from "@/app/client-apis/user/useGetResetPasswordOtpTimer";
import useSendVerificationEmail from "@/app/client-apis/user/useSendVerificationEmail";
import { Button } from "@/components/Button";
import Countdown from "@/components/Countdown";
import Spinner from "@/components/Spinner";
import Keyboard from "@/components/form-elements/Keyboard";
import VerificationInput from "@/components/form-elements/VerificationInput";
import { useAuth } from "@/context/AuthContext";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import fetcher from "@/utilities/fetcher";
import isValid from "@/utilities/isValid";
import { differenceInSeconds } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OtpVerificationForm = () => {
  const { refreshToken } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState<number | null>(null);
  const [timer, setTimer] = useState(null);
  const NUMBER_OF_FIELDS = 5;
  const [code, setCode] = useState({
    _0: "",
    _1: "",
    _2: "",
    _3: "",
    _4: "",
  });
  const [currentFocusIndex, setCurrentFocusIndex] = useState(0);

  let searchParams = useSearchParams();
  const router = useRouter();

  const handleInput = (num: string) => {
    //if (isVerifyResetPasswordLoading) return;

    if (!isNaN(parseInt(num))) {
      const index = `_${currentFocusIndex}` as keyof typeof code;
      document
        .getElementById(
          `block_${Math.min(currentFocusIndex + 1, NUMBER_OF_FIELDS - 1)}`
        )
        ?.focus();
      if (error) setError("");
      setCode((pv) => ({ ...pv, [index]: num.toString() }));
    }
  };

  const handleBackSpace = () => {
    const index = `_${currentFocusIndex}` as keyof typeof code;
    let prev = code[index];
    if (isValid(prev)) {
      setCode((pv) => ({ ...pv, [index]: "" }));
      document?.getElementById(`block_${currentFocusIndex}`)?.focus();
      return;
    }
    document
      .getElementById(`block_${Math.max(0, currentFocusIndex - 1)}`)
      ?.focus();
    if (error) setError("");
  };

  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    const isAllFilled = Object.values(code).every((value: string) =>
      isValid(value)
    );
    if (isAllFilled) {
      handleSubmit();
    }
  }, [code]);

  const handleSubmit = async () => {
    if (error) return;
    let otp = "";
    const isAllFilled = Object.values(code).every((value: string) => {
      otp += value;
      return isValid(value);
    });

    if (!isAllFilled) {
      setError("Fill all the fields");
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await fetcher().post(
        "/user/forgot-password/verify-otp",
        {
          otp,
          id: searchParams.get("id"),
        }
      );

      if (data) {
        router.push(`/user/reset-password?code=${data.code}`);
      }
    } catch (error: any) {
      setError(" ");
      setTimeout(() => {
        setCode(() => ({
          _0: "",
          _1: "",
          _2: "",
          _3: "",
          _4: "",
        }));
        setError("");
      }, 1500);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    data: lastOtpTime,
    isPending: isTimerLoading,
    refetch: refetchTimer,
  } = useGetResetPasswordOtpTimer();

  useEffect(() => {
    if (lastOtpTime) {
      setTimer(lastOtpTime.resendIn);
    }
  }, [lastOtpTime]);

  useEffect(() => {
    if (timer) {
      setOtpTimer(differenceInSeconds(new Date(timer), new Date()));
    }
  }, [timer]);

  const { mutateAsync: sendEmail, isPending: isSendEmailLoading } =
    useSendVerificationEmail();

  return (
    <div>
      <VerificationInput
        code={code}
        setCode={setCode}
        handleInput={handleInput}
        handleBackSpace={handleBackSpace}
        currentFocusIndex={currentFocusIndex}
        setCurrentFocusIndex={setCurrentFocusIndex}
        error={error}
        setError={setError}
        isLoading={false}
      />
      {isTouchDevice && (
        <div className="mt-5 w-full">
          <Keyboard
            currentlyPressed={handleInput}
            handleBackSpace={handleBackSpace}
          />
        </div>
      )}

      {!isLoading && (
        <div className="mt-3 flex w-full items-center justify-center">
          <Button
            disabled={otpTimer && otpTimer > 0 ? true : false}
            variant={"ghost"}
            wrapperClass="flex items-center justify-center"
            className="mr-2 whitespace-nowrap px-3 py-1 text-xs text-gray-800 hover:underline disabled:bg-transparent disabled:text-gray-400 disabled:hover:no-underline md:p-1"
            onClick={async () => {
              await sendEmail();
              await refetchTimer();
              setTimer(null);
            }}
            isSpinning={isSendEmailLoading}
          >
            Resend otp
          </Button>

          {timer && otpTimer && otpTimer > 0 && (
            <div className="flex w-9 items-center justify-center">
              <Countdown
                status={"start"}
                startFrom={otpTimer}
                onEnd={() => {
                  setOtpTimer(null);
                  setTimer(null);
                }}
              />
            </div>
          )}

          {isTimerLoading && (
            <div className="flex w-9 animate-pulse items-center">
              <div className="mr-px h-3 w-2 rounded-sm bg-gray-400"></div>
              <div className="mr-1 h-3 w-2 rounded-sm bg-gray-400"></div>

              <div className="mr-px h-3 w-2 rounded-sm bg-gray-400"></div>
              <div className="h-3 w-2 rounded-sm bg-gray-400"></div>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="mt-5">
          <Spinner className="text-gray-600" size={"sm"} />
        </div>
      )}
    </div>
  );
};

export default OtpVerificationForm;
