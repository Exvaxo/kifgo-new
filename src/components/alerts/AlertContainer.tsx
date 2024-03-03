"use client";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import Success from "./Success";
import Error from "./Error";
import Warning from "./Warning";

import "react-toastify/dist/ReactToastify.css";
import useAlertStore from "../../store/alertStore";

export interface IAlert {
  id: string;
  title: string;
  body: string;
}

const AlertContainer = () => {
  const { alerts, removeAlert } = useAlertStore();

  useEffect(() => {
    alerts.forEach((alert) => {
      if (alert.type === "success")
        toast(<Success id={alert.id} title={alert.title} body={alert.body} />, {
          toastId: alert.id,
        });

      if (alert.type === "error")
        toast(<Error id={alert.id} title={alert.title} body={alert.body} />, {
          toastId: alert.id,
        });

      if (alert.type === "warning")
        toast(<Warning id={alert.id} title={alert.title} body={alert.body} />, {
          toastId: alert.id,
        });
    });
  }, [alerts]);

  useEffect(() => {
    toast.onChange((t) => {
      if (t.status === "removed") {
        removeAlert(t.id);
      }
    });
  }, [toast]);

  return (
    <>
      <ToastContainer
        hideProgressBar={true}
        autoClose={5000}
        closeButton={false}
      />
    </>
  );
};

export default AlertContainer;
