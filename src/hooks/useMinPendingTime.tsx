import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

const useMinPendingTime = (timeMs: number = 1000) => {
  let { pending } = useFormStatus();
  let [locked, setLocked] = useState(pending);
  let [returnValue, setReturnValue] = useState(pending);

  useEffect(() => {
    if (!locked) {
      setReturnValue(pending);
    }
  }, [pending, locked]);

  useEffect(() => {
    setLocked(pending || locked);
    let timeoutId = setTimeout(() => {
      setLocked(false);
    }, timeMs);

    return () => clearTimeout(timeoutId);
  }, [pending, locked, timeMs]);

  return returnValue;
};

export default useMinPendingTime;
