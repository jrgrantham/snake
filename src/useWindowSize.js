import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export const useDivSize = (refEl) => {
  const [divDimensions, setDivDimensions] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setDivDimensions({
        width: refEl.current.offsetWidth,
        height: refEl.current.offsetHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [refEl]);

  return divDimensions;
};
