import React from "react";

import {
  ChartSvg,
  ChartSvgProps,
  ChartBounds,
  Axis,
  Line,
} from "@components/chart-elements";

import { generateScale } from "./helpers/generate-scale";
import { LineChartProps, SimpleData } from "./types";

export const LineChartCore = ({
  data,
  xScaleType,
  yScaleType,
  niceXScale = true,
  niceYScale = true,
  ...svgProps
}: LineChartProps & SimpleData & ChartSvgProps) => {
  const xScale = generateScale(
    xScaleType,
    data.map((d) => d.x),
    [0, svgProps.boundedWidth]
  );
  const yScale = generateScale(
    xScaleType,
    data.map((d) => d.y),
    [0, svgProps.boundedHeight]
  );

  return (
    <ChartSvg {...svgProps}>
      <ChartBounds>
        <Axis dimension="x" scale={niceXScale ? xScale.nice() : xScale} />
        <Axis dimension="y" scale={niceYScale ? yScale.nice() : xScale} />
      </ChartBounds>
    </ChartSvg>
  );
};
