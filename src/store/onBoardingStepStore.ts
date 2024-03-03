import { create } from "zustand";

type Step = {
  href: string;
  step: number;
  name: string;
  done: boolean;
  started: boolean;
};

interface StepStore {
  isLoading: boolean;
  setIsLoading: (cb: boolean | ((loading: boolean) => boolean)) => void;

  loadingMessage: string;
  setLoadingMessage: (message: string) => void;

  steps: Step[];
  updateStep: (step: number, body: Partial<Step>) => void;
}

const useOnBaordingStepStore = create<StepStore>()((set) => ({
  isLoading: false,
  loadingMessage: "",
  steps: [
    {
      name: "Name your shop",
      href: "/shop/onboarding/shop-name",
      done: false,
      step: 1,
      started: true,
    },
    {
      name: "Stock your shop",
      href: "/shop/onboarding/stock-your-shop",
      done: false,
      step: 2,
      started: false,
    },
    {
      name: "How you will get paid",
      href: "/shop/onboarding/how-you-will-get-paid",
      done: false,
      step: 3,
      started: false,
    },
    {
      name: "Set up billing",
      href: "/shop/onboarding/set-up-billing",
      done: false,
      step: 4,
      started: false,
    },
  ],

  updateStep: (step, body) => {
    set((state) => ({
      ...state,
      steps: state.steps.map((stp) => {
        if (stp.step === step) {
          let s = { ...stp, ...body };
          return s;
        }
        return stp;
      }),
    }));
  },

  setIsLoading: (cb) => {
    set((state) => ({
      ...state,
      isLoading: typeof cb === "function" ? cb(state.isLoading) : cb,
    }));
  },

  setLoadingMessage: (message: string) => {
    set((state) => ({
      ...state,
      loadingMessage: message,
    }));
  },
}));

export default useOnBaordingStepStore;
