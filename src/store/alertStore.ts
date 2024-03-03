import { create } from "zustand";

type Alert = {
  id: string;
  type: "success" | "error" | "warning" | "promise";
  title: string;
  body: string;
};

interface AlertState {
  alerts: Alert[];
  setAlert: (alert: Alert) => void;
  removeAlert: (id: string | number) => void;
}

const useAlertStore = create<AlertState>()((set) => ({
  alerts: [],
  setAlert: (alert) => {
    set((state) => ({ ...state, alerts: [alert, ...state.alerts] }));
  },

  removeAlert: (id) => {
    set((state) => ({
      ...state,
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },
}));

export default useAlertStore;
