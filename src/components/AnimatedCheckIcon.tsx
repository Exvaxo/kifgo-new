"use client";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "./Spinner";

const AnimatedCheckIcon = ({
  step,
  status,
}: {
  step?: number;
  status: "active" | "complete" | "deactive";
}) => {
  return (
    <motion.div
      initial={false}
      animate={status}
      variants={{
        active: { backgroundColor: "transparent", borderColor: "transparent" },
        complete: { backgroundColor: "#16a34a", borderColor: "transparent" },
        deactive: {
          backgroundColor: "transparent",
          borderColor: "transparent",
        },
      }}
      transition={{ duration: 0.2 }}
      className={`relative flex h-5 w-5 items-center justify-center rounded-full border p-2`}
    >
      {status === "active" && (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute z-10 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[0.6rem] text-white">
            {step}
          </div>
          <div className="absolute h-5 w-5 animate-ping rounded-full bg-green-300"></div>
        </div>
      )}

      {status === "deactive" && (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute z-10 h-3 w-3 rounded-full bg-gray-300"></div>
        </div>
      )}

      {status === "complete" && (
        <div className="relative flex h-full w-full items-center justify-center">
          <svg className="h-3 w-3 flex-shrink-0 text-white" viewBox="0 0 24 24">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: 0.2,
                type: "tween",
                ease: "easeOut",
                duration: 0.6,
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

interface LoadderWithCheck {
  status: "active" | "complete" | "deactive";
  value: string;
}
const LoaderWithCheck = ({ status, value }: LoadderWithCheck) => {
  return (
    <div className="flex w-full items-center justify-start gap-2">
      <AnimatePresence>
        {(status === "complete" || status === "deactive") && (
          <AnimatedCheckIcon status={status} />
        )}

        {status === "active" && (
          <motion.div>
            <Spinner
              wrapperClass="block w-auto"
              className="block h-6 w-6 text-gray-800"
              size={"sm"}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <p
        className={`whitespace-nowrap text-sm font-medium ${
          status === "deactive" ? "text-gray-400" : "text-gray-700"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export { AnimatedCheckIcon, LoaderWithCheck };
