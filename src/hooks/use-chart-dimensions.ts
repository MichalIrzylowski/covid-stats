import { useState, useEffect } from "react";

import ResizeObserver from "resize-observer-polyfill";

import {
  combineChartDimensions,
  Dimensions,
} from "@utils/combine-chart-dimensions";

export const useChartDimensions = (passedSettings: Dimensions) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const dimensions = combineChartDimensions(passedSettings);

  const [width, changeWidth] = useState(0);
  const [height, changeHeight] = useState(0);

  useEffect(() => {
    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) return;
        if (!entries.length) return;

        const entry = entries[0];

        if (width !== entry.contentRect.width)
          changeWidth(entry.contentRect.width);
        if (height !== entry.contentRect.height)
          changeHeight(entry.contentRect.height);
      });

      resizeObserver.observe(element);
      // eslint-disable-next-line consistent-return
      return () => {
        resizeObserver.unobserve(element);
      };
    }
    return undefined;
  }, [passedSettings, height, width, dimensions, element]);

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return { setElement, dimensions: newSettings };
};
