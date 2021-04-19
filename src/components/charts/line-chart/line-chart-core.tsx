import React from "react";

import {
  ChartSvg,
  ChartSvgProps,
  ChartBounds,
} from "@components/chart-elements";

import { LineChartProps, SimpleData } from "./types";

export const LineChartCore = ({
  data,
  ...svgProps
}: LineChartProps & SimpleData & ChartSvgProps) => {
  return (
    <ChartSvg {...svgProps}>
      <ChartBounds></ChartBounds>
    </ChartSvg>
  );
};
