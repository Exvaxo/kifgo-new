import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import useIsTouchDevice from "../../hooks/useIsTouchDevice";
import arrayOf from "@/utilities/arrayOf";

type Code = {
  _0: string;
  _1: string;
  _2: string;
  _3: string;
  _4: string;
};
interface IVerificationInput {
  code: Code;
  setCode: React.Dispatch<React.SetStateAction<Code>>;
  handleBackSpace: () => void;
  handleInput: (num: string) => void;
  currentFocusIndex: number;
  setCurrentFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  ErrorIcon?: React.FC<React.SVGProps<HTMLDivElement>>;
}
const VerificationInput = ({
  code,
  setCode,
  handleBackSpace,
  handleInput,
  currentFocusIndex,
  setCurrentFocusIndex,
  error,
  setError,
  isLoading = false,
  ErrorIcon,
}: IVerificationInput) => {
  const NUMBER_OF_FIELDS = 5;
  const isTouchDevice = useIsTouchDevice();

  function setInitialFocus(index: number) {
    document?.getElementById(`block_${index}`)?.focus();
  }

  useEffect(() => {
    setInitialFocus(currentFocusIndex);
  }, []);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    setError("");
    const data = e.clipboardData.getData("text").trim();

    const splittedData = data.split("").slice(0, 5);
    if (splittedData.every((data) => !isNaN(parseInt(data)))) {
      splittedData.forEach((val, idx) => {
        const index = `_${idx}` as keyof typeof code;
        setCode((pv: any) => ({ ...pv, [index]: val }));
      });
    } else {
      //invalid format
      setError("Invalid code format, make sure you copy properly");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "Backspace") {
      handleBackSpace();
    }
  };

  const inputAnimation = useAnimation();
  const errorText = useAnimation();

  useEffect(() => {
    if (error) {
      inputAnimation.start({
        x: [-2, 0, 2, 0, -2],
        transition: { repeat: 5, duration: 0.15 },
      });

      errorText.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 },
      });
    }
  }, [error]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2">
        {arrayOf(NUMBER_OF_FIELDS).map((key: number) => (
          <motion.div
            animate={inputAnimation}
            initial={{ x: 0 }}
            key={key}
            className="relative"
          >
            <input
              id={`block_${key}`}
              autoComplete="off"
              className={`flex w-full justify-center rounded-xl border-2 border-gray-300 bg-gray-50 px-1 py-2 text-center text-3xl font-medium text-gray-800 transition duration-300 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 md:px-2 md:py-3 
            ${
              error
                ? "border-red-500 focus:border-transparent focus:ring-red-600"
                : "border-gray-300 focus:border-transparent focus:ring-blue-600"
            }
            `}
              disabled={isLoading}
              type="text"
              value={code[("_" + key) as keyof typeof code]}
              onInput={(e) => {
                //@ts-ignore
                handleInput(e.nativeEvent.data);
              }}
              onPaste={handlePaste}
              inputMode={isTouchDevice ? "none" : "numeric"}
              onFocus={(e) => {
                setCurrentFocusIndex(key);
              }}
              onKeyDown={handleKeyPress}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VerificationInput;
