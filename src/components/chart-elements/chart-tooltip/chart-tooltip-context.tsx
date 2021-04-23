import React, { useState, createContext, useContext } from "react";

import { ChartTooltip as ChartTooltipCore } from "./chart-tooltip";

type Position = { x: number; y: number };
type Opacity = 0 | 1;

const ChartTooltipContext = createContext<
  React.Dispatch<React.SetStateAction<Position>>
>(() => {
  return;
});
const ChartTooltipOpacityContext = createContext<
  React.Dispatch<React.SetStateAction<Opacity>>
>(() => {
  return;
});
const ChartTooltipChildren = createContext<
  React.Dispatch<React.SetStateAction<React.ReactNode>>
>(() => {
  return;
});

export const ChartTooltip: React.FC = ({ children }) => {
  const [positions, setPositions] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<Opacity>(0);
  const [tooltipChildren, setTooltipChildren] = useState<React.ReactNode>();
  return (
    <ChartTooltipContext.Provider value={setPositions}>
      <ChartTooltipOpacityContext.Provider value={setOpacity}>
        <ChartTooltipChildren.Provider value={setTooltipChildren}>
          <ChartTooltipCore
            {...positions}
            opacity={opacity}
            children={tooltipChildren}
          />
          {children}
        </ChartTooltipChildren.Provider>
      </ChartTooltipOpacityContext.Provider>
    </ChartTooltipContext.Provider>
  );
};

export const useChartTooltipPosition = () => {
  const setPosition = useContext(ChartTooltipContext);

  if (!setPosition)
    throw new Error(
      "useChartTooltipPosition has to be used inside ChartTooltip"
    );

  return setPosition;
};

export const useChartTooltipOpacity = () => {
  const setOpacity = useContext(ChartTooltipOpacityContext);

  if (!setOpacity)
    throw new Error(
      "useChartTooltipPosition has to be used inside ChartTooltip"
    );

  return setOpacity;
};

export const useChartTooltipChildren = () => {
  const setChildren = useContext(ChartTooltipChildren);

  if (!setChildren)
    throw new Error(
      "useChartTooltipPosition has to be used inside ChartTooltip"
    );

  return setChildren;
};
