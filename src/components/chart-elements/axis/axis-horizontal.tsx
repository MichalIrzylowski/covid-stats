import React from "react";
import { useSvgDimensions } from "../chart-svg";

import { AxisProps } from "./types";

export const AxisHorizontal: React.FC<AxisProps> = ({
  scale,
  timeFormatter,
}) => {
  const dimensions = useSvgDimensions();

  if (!dimensions) return null;

  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  const ticks = (scale.nice().ticks(numberOfTicks) as unknown) as Date[];

  const displayedTicks = ticks.map((tick) => (
    <text key={tick.toString()} transform={`translate(${scale(tick)}, 25)`}>
      {(timeFormatter && timeFormatter(tick)) || tick.toString()}
    </text>
  ));

  return (
    <g transform={`translate(0, ${dimensions.boundedHeight})`}>
      <line x2={dimensions.boundedWidth} stroke="#bdc3c7" />
      {displayedTicks}
    </g>
  );
};
