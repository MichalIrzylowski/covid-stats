import React from "react";
import { useSvgDimensions } from "../chart-svg";

import { timeFormatter } from "@utils/time";

import { AxisProps } from "./types";

const fontSize = 10;

export const AxisVertical: React.FC<AxisProps> = ({
  scale,
  dateFormat,
  scaleType,
  numberOfTicks,
  title,
  showBigTicks,
}) => {
  const dimensions = useSvgDimensions();

  if (!dimensions) return null;

  const ticks = (scale.ticks() as unknown) as Date[];

  const displayedTicks = ticks.map((tick) => {
    const text =
      (scaleType === "time" && timeFormatter(dateFormat)(tick)) ||
      tick.toString();
    return (
      <text
        fontSize={fontSize}
        key={tick.toString()}
        y={scale(tick)}
        transform={`translate(-${text.length * 7}, 3)`}
      >
        {text}
      </text>
    );
  });

  const smallTicks = ticks.map((tick) => (
    <line
      x2={-5}
      stroke="#bdc3c7"
      transform={`translate(0, ${scale(tick)})`}
      key={tick.toString()}
    />
  ));

  const bigTicks =
    showBigTicks &&
    ticks.map((tick) => (
      <line
        x2={dimensions.boundedWidth}
        stroke="rgba(230, 230, 230, 0.9)"
        transform={`translate(0, ${scale(tick)})`}
        key={tick.toString()}
      />
    ));

  return (
    <g>
      <line y2={dimensions.boundedHeight} stroke="#bdc3c7" />
      {smallTicks}
      {displayedTicks}
      {bigTicks}
      <text
        fontSize={fontSize}
        transform={`translate(-50, ${
          dimensions.boundedHeight / 2
        }) rotate(-90)`}
      >
        {title}
      </text>
    </g>
  );
};
