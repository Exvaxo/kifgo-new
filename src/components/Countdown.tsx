import secsToDays from "@/utilities/secsToDays";
import secsToMins from "@/utilities/secsToMins";
import { useEffect, useState } from "react";

interface ICountdown {
  status: "start" | "stop";
  startFrom?: number;
  onEnd?: () => void;
}

const Countdown = ({ status, startFrom = 60, onEnd }: ICountdown) => {
  const [time, setTime] = useState(startFrom);
  const [internalState, setInternalState] = useState(status);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (internalState === "start") {
      if (interval) {
        clearInterval(interval);
      }

      interval = setInterval(() => {
        setTime((pv) => pv - 1);
      }, 1000);
    }

    if (internalState === "stop") {
      if (interval) {
        clearInterval(interval);
      }
      if (onEnd && typeof onEnd === "function") {
        onEnd();
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [internalState]);

  useEffect(() => {
    if (time === 0) {
      setInternalState("stop");
    }
  }, [time]);

  return (
    <time className="text-xs font-medium leading-none text-gray-800">
      {time > 3600 ? secsToDays(time) : secsToMins(time)}
    </time>
  );
};

export default Countdown;
