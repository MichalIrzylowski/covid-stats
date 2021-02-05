import React from "react";
import { useSvgDimensions } from "../chart-svg";

import { AxisProps } from "./types";

export const AxisHorizontal: React.FC<AxisProps> = ({
  scale,
  timeFormatter,
  numberOfTicks,
}) => {
  const dimensions = useSvgDimensions();

  if (!dimensions) return null;

  const ticks = (scale.nice().ticks(numberOfTicks) as unknown) as Date[];

  const displayedTicks = ticks.map((tick) => (
    <text
      fontSize={10}
      key={tick.toString()}
      x={scale(tick)}
      transform={`translate(0, 20)`}
      textAnchor="middle"
    >
      {(timeFormatter && timeFormatter(tick)) || tick.toString()}
    </text>
  ));

  const smallTicks = ticks.map((tick) => (
    <line
      y2={5}
      stroke="#bdc3c7"
      transform={`translate(${scale(tick)}, 0)`}
      key={tick.toString()}
    />
  ));

  return (
    <g transform={`translate(0, ${dimensions.boundedHeight})`}>
      <line x2={dimensions.boundedWidth} stroke="#bdc3c7" />
      {smallTicks}
      {displayedTicks}
    </g>
  );
};
