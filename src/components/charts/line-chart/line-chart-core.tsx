import React from "react";

import {
  ChartSvg,
  ChartSvgProps,
  ChartBounds,
  Axis,
  Line,
  Scanner,
  Dots,
} from "@components/chart-elements";

import { generateScale } from "@utils/generate-scale";
import { LineChartProps, SimpleData } from "./types";

export const LineChartCore = ({
  data,
  xScaleType,
  yScaleType,
  niceXScale = true,
  niceYScale = true,
  xNumberOfTicks,
  yNumberOfTicks,
  showXNet,
  showYNet,
  curve,
  ...svgProps
}: LineChartProps & SimpleData & ChartSvgProps) => {
  const xScale = generateScale(
    xScaleType,
    data.map((d) => d.x),
    [0, svgProps.boundedWidth],
    niceXScale
  );
  const yScale = generateScale(
    yScaleType,
    data.map((d) => d.y),
    [svgProps.boundedHeight, 0],
    niceYScale
  );

  return (
    <ChartSvg {...svgProps}>
      <ChartBounds>
        <Axis
          scaleType={xScaleType}
          dimension="x"
          scale={xScale}
          numberOfTicks={xNumberOfTicks}
          showBigTicks={showXNet}
        />
        <Axis
          scaleType={yScaleType}
          dimension="y"
          scale={yScale}
          numberOfTicks={yNumberOfTicks}
          showBigTicks={showYNet}
        />
        <Line
          data={data}
          xAccessor={(d) => xScale(d.x as number)}
          yAccessor={(d) => yScale(d.y as number)}
          type="line"
          stroke="#9980FA"
          strokeWidth={2}
          curve={curve}
        />
        <Dots data={data} xScale={xScale} yScale={yScale} />
        <Scanner />
      </ChartBounds>
    </ChartSvg>
  );
};
