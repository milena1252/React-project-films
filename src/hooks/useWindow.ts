import { useEffect, useState } from "react";

export const useWindow = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    return {
        isSm: width < 768,
        isLg: width >= 768,
    }
}