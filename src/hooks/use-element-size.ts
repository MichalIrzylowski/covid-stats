import { useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

export const useElementSize = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({
          height: entry.contentRect.height,
          width: entry.contentRect.width,
        });
      }
    });

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [element]);

  return {
    element: setElement,
    size,
  };
};
