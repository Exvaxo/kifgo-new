"use client";

import Step from "@/components/Step";
import useOnBaordingStepStore from "@/store/onBoardingStepStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Steps = () => {
  const { steps } = useOnBaordingStepStore();
  const router = useRouter();

  return (
    <>
      {steps.map((step) => (
        <Step
          key={step.href}
          onClick={() => router.push(step.href)}
          step={step.step}
          text={step.name}
          variant={
            step.done ? "complete" : step.started ? "active" : "deactive"
          }
        />
      ))}
    </>
  );
};

Steps.displayName = "Steps";

export default Steps;
