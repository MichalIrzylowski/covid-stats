import React from "react";

import { useSvgDimensions } from "../chart-svg";

interface ScannerProps {}

export const Scanner = (props: ScannerProps) => {
  const dimensions = useSvgDimensions();
  if (!dimensions) return null;

  return (
    <rect
      onMouseMove={(e) => console.log(e)}
      width={dimensions.boundedWidth}
      height={dimensions.boundedHeight}
      fill="transparent"
    ></rect>
  );
};
