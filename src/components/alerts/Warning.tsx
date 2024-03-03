import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { IAlert } from "./AlertContainer";

const Warning = ({ id, title, body }: IAlert) => {
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
              rgba(255, 153, 20, 0.25),
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
            rgba(255, 153, 20, 0.25),
            transparent 80%
          )
        `,
        }}
        className="pointer-events-none absolute -inset-px z-20 rounded-2xl transition duration-300 group-hover:opacity-0"
      />
      {/* end of  gradient */}

      <div className="relative z-10 flex w-full">
        <div className="flex flex-1 items-center justify-center gap-3 rounded-l-xl px-3 py-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="h-full w-full select-none p-3">
          <h1 className="text-xl font-medium text-white">{title}</h1>
          <p className="mt-2 text-xs leading-5 text-gray-200">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Warning;
