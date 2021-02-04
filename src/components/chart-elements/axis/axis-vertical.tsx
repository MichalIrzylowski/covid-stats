import React from "react";
import { useSvgDimensions } from "../chart-svg";

import { AxisProps } from "./types";

export const AxisVertical: React.FC<AxisProps> = ({ scale, timeFormatter }) => {
  const dimensions = useSvgDimensions();

  if (!dimensions) return null;

  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  const ticks = (scale.nice().ticks(numberOfTicks) as unknown) as Date[];

  console.log(ticks);

  const displayedTicks = ticks.map((tick) => (
    <text key={tick.toString()} transform={`translate(-70, ${scale(tick)})`}>
      {(timeFormatter && timeFormatter(tick)) || tick.toString()}
    </text>
  ));

  return (
    <g>
      <line y2={dimensions.boundedHeight} stroke="#bdc3c7" />
      {displayedTicks}
    </g>
  );
};
