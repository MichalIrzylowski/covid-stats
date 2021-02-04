import React from "react";
import { ScaleLinear, ScaleTime } from "d3-scale/index";

import { timeFormatter } from "@utils/time";

import {
  ChartSvg,
  ChartBounds,
  ChartSvgProps,
  Line,
  Axis,
  Scale,
} from "@components/chart-elements";

interface LineChartProps extends ChartSvgProps {
  data: any;
  xScale: ScaleLinear<any, any, any> | ScaleTime<any, any, any>;
  yScale: ScaleLinear<any, any, any> | ScaleTime<any, any, any>;
  xAccessor: (data: any) => any;
  yAccessor: (data: any) => any;
}

export const LineChart: React.FC<LineChartProps> = ({
  children,
  data,
  xAccessor,
  yAccessor,
  xScale,
  yScale,
  ...chartSvgProps
}) => {
  // TODO: find better way to type it
  const xAccessorScaled = (d: any) => xScale(xAccessor(d));
  const yAccessorScaled = (d: any) => yScale(yAccessor(d));

  return (
    <ChartSvg {...chartSvgProps}>
      <ChartBounds>
        <Line
          type="line"
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          fill="none"
          stroke="#9980FA"
          strokeWidth={2}
        />
        <Axis
          dimension="x"
          scale={xScale as Scale}
          timeFormatter={timeFormatter()}
        />
        <Axis dimension="y" scale={yScale as Scale} />
      </ChartBounds>
    </ChartSvg>
  );
};
