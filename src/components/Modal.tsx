"use client";
import { cn } from "@/utilities/cn";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ReactNode } from "react";

const Modal = ({
  open,
  onOpenChange,
  children,
  className,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <MotionConfig
      transition={{ type: "spring", bounce: 0.3, duration: open ? 0.7 : 0.4 }}
    >
      <Dialog.Root modal open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal
          container={
            typeof window !== "undefined"
              ? document?.getElementById("global-modal-container")
              : null
          }
          forceMount
        >
          <>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div initial="closed" animate="open" exit="closed">
                  <Dialog.Overlay asChild>
                    <motion.div
                      variants={{
                        closed: { opacity: 0 },
                        open: { opacity: 1 },
                      }}
                      className="fixed inset-0 z-[9999999999] m-1 rounded-2xl border-4 border-black bg-gray-950/60 backdrop-blur-sm"
                    ></motion.div>
                  </Dialog.Overlay>

                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="fixed inset-0 z-[99999999999]"
                  >
                    <div className="relative flex h-[100dvh] w-full grow flex-col overflow-y-auto overflow-x-hidden">
                      <div className="flex w-full flex-1 flex-col items-center justify-end sm:justify-center">
                        <div className="flex w-full flex-col items-center justify-center p-4 lg:p-0">
                          <Dialog.Content asChild>
                            <motion.div
                              variants={{
                                closed: {
                                  y: "var(--y-closed, 0)",
                                  opacity: "var(--opacity-closed)",
                                  scale: "var(--scale-closed, 1)",
                                },
                                open: {
                                  y: "var(--y-open, 0)",
                                  opacity: "var(--opacity-open)",
                                  scale: "var(--scale-open, 1)",
                                },
                              }}
                              className={cn(
                                `max-h-[95dvh] w-full overflow-y-auto rounded-lg bg-white p-4 text-left shadow-xl [--opacity-closed:0%] [--opacity-open:100%] focus:outline-none max-sm:[--y-closed:16px] max-sm:[--y-open:0px] sm:max-h-[90dvh] sm:p-6`,
                                className,
                              )}
                            >
                              {children}
                            </motion.div>
                          </Dialog.Content>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        </Dialog.Portal>
      </Dialog.Root>
    </MotionConfig>
  );
};

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Title = Dialog.Title;
Modal.Description = Dialog.Description;

export default Modal;
