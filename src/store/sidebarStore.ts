import { create } from "zustand";

interface ISidebar {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (val: boolean | ((val: boolean) => boolean)) => void;
}

const useSidebarStore = create<ISidebar>()((set) => ({
  isMobileNavOpen: true,
  setIsMobileNavOpen: (val) => {
    set((state) => ({
      ...state,
      isMobileNavOpen:
        typeof val === "function" ? val(state.isMobileNavOpen) : val,
    }));
  },
}));

export default useSidebarStore;
