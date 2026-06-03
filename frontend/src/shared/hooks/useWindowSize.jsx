/*
  useWindowSize.jsx
  Custom React hook that tracks the current window width.
*/
import { useState, useEffect } from "react";

function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width: windowWidth,
    isMobile: windowWidth < 768,
  };
}

export default useWindowSize;
