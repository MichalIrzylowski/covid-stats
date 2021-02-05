import React from "react";

import { useSvgDimensions } from "@components/chart-elements/chart-svg";

import { BackgroundNetProps } from "./types";

export const Horizontal: React.FC<BackgroundNetProps> = ({
  scale,
  numberOfBars,
}) => {
  const dimensions = useSvgDimensions();
  const bars = scale.ticks(numberOfBars);

  if (!dimensions) return null;

  return (
    <>
      {bars.map((bar) => (
        <line
          key={bar}
          x2={dimensions.boundedWidth}
          stroke="rgba(230, 230, 230, 0.9)"
          transform={`translate(0, ${scale(bar)})`}
        />
      ))}
    </>
  );
};
