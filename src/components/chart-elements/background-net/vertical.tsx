import React from "react";

import { useSvgDimensions } from "@components/chart-elements/chart-svg";

import { BackgroundNetProps } from "./types";

export const Vertical: React.FC<BackgroundNetProps> = ({
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
          y2={dimensions.boundedHeight}
          stroke="rgba(230, 230, 230, 0.9)"
          transform={`translate(${scale(bar)}, 0)`}
        />
      ))}
    </>
  );
};
