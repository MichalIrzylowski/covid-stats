import React from "react";

import { BackgroundNetProps as BackgroundNetPropsCore } from "./types";

import { Horizontal } from "./horizontal";
import { Vertical } from "./vertical";

const netComponentByDimension = {
  horizontal: Horizontal,
  vertical: Vertical,
};

interface BackgroundNetProps extends BackgroundNetPropsCore {
  dimension: keyof typeof netComponentByDimension;
}

export const BackgroundNet: React.FC<BackgroundNetProps> = ({
  dimension,
  ...backgroundNetProps
}) => {
  const Component = netComponentByDimension[dimension];

  return <Component {...backgroundNetProps} />;
};
