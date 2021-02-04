import React from "react";
import { useSvgDimensions } from "../chart-svg";

import { AxisProps } from "./types";

import css from "./axis.module.scss";

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
    <text
      className={css.text}
      key={tick.toString()}
      x={scale(tick)}
      transform={`translate(-15, 20)`}
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
