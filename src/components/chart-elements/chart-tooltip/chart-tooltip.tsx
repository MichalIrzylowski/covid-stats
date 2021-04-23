import React from "react";

import { TooltipWrapper } from "./chart-tooltip.styled";

interface ChartTooltipProps {
  x: number;
  y: number;
  opacity: 0 | 1;
  children: React.ReactNode;
}

export const ChartTooltip = ({
  x,
  y,
  opacity,
  children,
}: ChartTooltipProps) => {
  return (
    <TooltipWrapper
      style={{
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 80%))`,
        opacity,
      }}
    >
      {children}
    </TooltipWrapper>
  );
};
