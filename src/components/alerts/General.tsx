import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { IAlert } from "./AlertContainer";
import { ComponentProps, useId } from "react";

interface IGenralAlert extends ComponentProps<"div"> {
  children: React.ReactNode;
}
const General = ({ children }: IGenralAlert) => {
  const id = useId();
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
    <div
      key={id}
      onMouseMove={handleMouseMove}
      className="group relative h-full w-full rounded-2xl border border-white/10 bg-skin-primary bg-gradient-to-r p-3"
    >
      {/* gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-20 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(55, 65, 81, 0.25),
              transparent 80%
            )
          `,
        }}
      />
      <div
        style={{
          background: `
          radial-gradient(
            250px circle at 50px 20px,
            rgba(55, 65, 81, 0.25),
            transparent 80%
          )
        `,
        }}
        className="pointer-events-none absolute -inset-px z-20 rounded-2xl transition duration-300 group-hover:opacity-0"
      />
      {/* end of  gradient */}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default General;
