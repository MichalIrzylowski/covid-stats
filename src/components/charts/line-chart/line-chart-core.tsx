import React from "react";

import {
  ChartSvg,
  ChartSvgProps,
  ChartBounds,
  Axis,
  Line,
} from "@components/chart-elements";

import { generateScale } from "@utils/generate-scale";
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
    yScaleType,
    data.map((d) => d.y),
    [svgProps.boundedHeight, 0]
  );

  return (
    <ChartSvg {...svgProps}>
      <ChartBounds>
        <Axis dimension="x" scale={niceXScale ? xScale.nice() : xScale} />
        <Axis dimension="y" scale={niceYScale ? yScale.nice() : yScale} />
        <Line
          data={data}
          xAccessor={(d) => xScale(d.x as number)}
          yAccessor={(d) => yScale(d.y as number)}
          type="line"
          stroke="#9980FA"
          strokeWidth={2}
        />
      </ChartBounds>
    </ChartSvg>
  );
};
