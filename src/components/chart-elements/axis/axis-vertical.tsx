import React from "react";
import { useSvgDimensions } from "../chart-svg";

import { AxisProps } from "./types";

import css from "./axis.module.scss";

export const AxisVertical: React.FC<AxisProps> = ({ scale, timeFormatter }) => {
  const dimensions = useSvgDimensions();

  if (!dimensions) return null;

  const ticks = (scale.nice().ticks() as unknown) as Date[];

  const displayedTicks = ticks.map((tick) => (
    <text
      className={css.text}
      key={tick.toString()}
      y={scale(tick)}
      transform="translate(-50, 3)"
    >
      {(timeFormatter && timeFormatter(tick)) || tick.toString()}
    </text>
  ));

  const smallTicks = ticks.map((tick) => (
    <line
      x2={-5}
      stroke="#bdc3c7"
      transform={`translate(0, ${scale(tick)})`}
      key={tick.toString()}
    />
  ));

  return (
    <g>
      <line y2={dimensions.boundedHeight} stroke="#bdc3c7" />
      {smallTicks}
      {displayedTicks}
    </g>
  );
};
