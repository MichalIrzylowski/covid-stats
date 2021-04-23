import React from "react";

import { ScaleLinear, ScaleTime } from "d3";
import { leastIndex } from "d3-array";
import { pointer } from "d3-selection";

import { DefaultDataObject } from "@components/charts/line-chart/types";
import { timeFormatter } from "@utils/time";

import { useSvgDimensions } from "../chart-svg";
import {
  useChartTooltipPosition,
  useChartTooltipOpacity,
  useChartTooltipChildren,
} from "../chart-tooltip";

type Scale =
  | ScaleTime<number, number, never>
  | ScaleLinear<number, number, never>;
interface ScannerProps {
  data: DefaultDataObject[];
  xScale: Scale;
  yScale: Scale;
}

const dataAccessor = (d: DefaultDataObject, key: keyof DefaultDataObject) =>
  d[key];

export const Scanner = ({ data, xScale, yScale }: ScannerProps) => {
  const dimensions = useSvgDimensions();
  const setChartPosition = useChartTooltipPosition();
  const setOpacity = useChartTooltipOpacity();
  const setReactChildren = useChartTooltipChildren();
  const formatTime = timeFormatter();

  if (!dimensions) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    const [pageX, pageY] = pointer(e);
    const xAxisData = xScale.invert(pageX) as any;

    const getDistanceFromHoveredPoint = (d: DefaultDataObject) =>
      Math.abs((dataAccessor(d, "x") as any) - xAxisData);

    const index = leastIndex(
      data,
      (a, b) => getDistanceFromHoveredPoint(a) - getDistanceFromHoveredPoint(b)
    );

    if (index || index === 0) {
      const { x, y } = data[index];
      const xValue = xScale(x as any);
      const yValue = yScale(y as any);

      setChartPosition({ x: xValue + dimensions.marginLeft, y: yValue });
      setReactChildren(
        <>
          <p>{`temperature ${y}`}</p>
          <p>{`date: ${formatTime(x as Date)}`}</p>
        </>
      );
    }
  };

  return (
    <rect
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onMouseMove={handleMouseMove}
      width={dimensions.boundedWidth}
      height={dimensions.boundedHeight}
      fill="transparent"
    />
  );
};
