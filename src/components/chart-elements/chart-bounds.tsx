import React from "react";
import { useSvgDimensions } from "./chart-svg";

export const ChartBounds: React.FC<React.SVGProps<SVGGElement>> = ({
  children,
  ...gElementProps
}) => {
  const dimensions = useSvgDimensions();

  return (
    <g
      {...gElementProps}
      transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      style={{
        height: dimensions.boundedHeight,
        width: dimensions.boundedWidth,
      }}
    >
      {children}
    </g>
  );
};
