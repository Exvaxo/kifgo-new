import { useEffect, useState } from "react";

const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in document?.documentElement;
    setIsTouch(isTouchDevice);
  }, []);

  return isTouch;
};

export default useIsTouchDevice;
