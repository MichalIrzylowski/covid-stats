import React from "react";

import { timeFormatter } from "@utils/time";

import { useSvgDimensions } from "../chart-svg";

import { AxisProps } from "./types";

const fontSize = 10;

export const AxisHorizontal: React.FC<AxisProps> = ({
  scale,
  dateFormat,
  scaleType,
  numberOfTicks,
  title,
  showBigTicks,
}) => {
  const dimensions = useSvgDimensions();

  if (!dimensions) return null;

  const ticks = scale.ticks(numberOfTicks) as any[];

  const displayedTicks = ticks.map((tick: any) => {
    const axisText =
      (scaleType === "time" && timeFormatter(dateFormat)(tick)) ||
      tick.toString();

    return (
      <text
        fontSize={fontSize}
        key={tick.toString()}
        x={scale(tick)}
        transform={`translate(0, 20)`}
        textAnchor="middle"
      >
        {axisText}
      </text>
    );
  });

  const smallTicks = ticks.map((tick: any) => (
    <line
      y2={5}
      stroke="#bdc3c7"
      transform={`translate(${scale(tick)}, 0)`}
      key={tick.toString()}
    />
  ));

  const bigTicks =
    showBigTicks &&
    ticks.map((tick: any) => (
      <line
        y2={-dimensions.boundedHeight}
        stroke="rgba(230, 230, 230, 0.9)"
        transform={`translate(${scale(tick)}, 0)`}
        key={tick.toString()}
      />
    ));

  return (
    <g transform={`translate(0, ${dimensions.boundedHeight})`}>
      <line x2={dimensions.boundedWidth} stroke="#bdc3c7" />
      {smallTicks}
      {displayedTicks}
      {bigTicks}
      <text
        fontSize={fontSize}
        transform={`translate(${dimensions.boundedWidth / 2}, 35)`}
      >
        {title}
      </text>
    </g>
  );
};
