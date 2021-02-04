import React from "react";

import { timeFormatter } from "@utils/time";

import { AxisHorizontal } from "./axis-horizontal";
import { AxisVertical } from "./axis-vertical";
import { Scale } from "./types";

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
};

interface AxisProps {
  dimension: keyof typeof axisComponentsByDimension;
  scale: Scale;
  timeFormatter?: ReturnType<typeof timeFormatter>;
}

export const Axis: React.FC<AxisProps> = ({
  dimension,
  scale,
  timeFormatter,
}) => {
  const Component = axisComponentsByDimension[dimension];

  return <Component scale={scale} timeFormatter={timeFormatter} />;
};
