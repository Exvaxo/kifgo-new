"use client";
import useAuthStore from "@/store/authStore";
import { AnimatePresence, motion } from "framer-motion";

const ErrorToast = () => {
  const { registerError, loginError, providerError } = useAuthStore();

  return (
    <>
      <AnimatePresence>
        {(registerError || loginError || providerError) && (
          <motion.div
            initial={{ y: -10, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.8 }}
            className="absolute inset-x-0 bottom-0 mb-28"
          >
            <div className="mx-auto max-w-xl">
              <div className="mx-auto flex w-min items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-gray-950 to-gray-800 p-3 py-2 text-sm text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-red-700"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="truncate whitespace-nowrap">
                  {registerError?.message ||
                    loginError?.message ||
                    providerError?.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ErrorToast;
