"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

const Header = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let { left, top } = currentTarget?.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section onMouseMove={handleMouseMove} className="mt-5 md:mt-10">
      <div className="relative mx-auto flex w-full max-w-screen-lg flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#be0957] to-[#be0957]/90">
        {/* gradient */}
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                550px circle at ${mouseX}px ${mouseY}px,
                rgba(253, 3, 99, 0.5),
                transparent 70%
              )
            `,
          }}
          className="pointer-events-none absolute -inset-px z-20 rounded-2xl transition duration-300 group-hover:opacity-0"
        />

        <div className="relative z-30 flex w-full flex-col items-center justify-center p-10 py-28">
          <h3 className="text-6xl font-bold text-white">
            Start selling with Kifgo
          </h3>
          <p className="mt-3 text-sm text-white/90">
            Kifgo makes selling easy with a number of resources and tools to get
            you started.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
