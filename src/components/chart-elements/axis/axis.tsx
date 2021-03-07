import React from "react";

import { AxisHorizontal } from "./axis-horizontal";
import { AxisVertical } from "./axis-vertical";
import { AxisProps as AxisPropsCore } from "./types";

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
};

interface AxisProps extends AxisPropsCore {
  dimension: keyof typeof axisComponentsByDimension;
}

export const Axis: React.FC<AxisProps> = ({
  dimension,
  showBigTicks = true,
  ...axisProps
}) => {
  const Component = axisComponentsByDimension[dimension];

  return <Component showBigTicks={showBigTicks} {...axisProps} />;
};
