import React from "react";
import { ScaleLinear, ScaleTime } from "d3-scale/index";

import {
  ChartSvg,
  ChartBounds,
  ChartSvgProps,
  Line,
  Axis,
  AxisProps,
  Scale,
  BackgroundNet,
} from "@components/chart-elements";

interface LineChartProps extends ChartSvgProps {
  data: any;
  xScale: ScaleLinear<any, any, any> | ScaleTime<any, any, any>;
  yScale: ScaleLinear<any, any, any> | ScaleTime<any, any, any>;
  xAccessor: (data: any) => any;
  yAccessor: (data: any) => any;
  horizontalTimeFormatter?: AxisProps["timeFormatter"];
  verticalTimeFormatter?: AxisProps["timeFormatter"];
  horizontalAxisNumberOfTicks?: AxisProps["numberOfTicks"];
  verticalAxisNumberOfTicks?: AxisProps["numberOfTicks"];
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xAccessor,
  yAccessor,
  xScale,
  yScale,
  horizontalTimeFormatter,
  verticalTimeFormatter,
  horizontalAxisNumberOfTicks,
  verticalAxisNumberOfTicks,
  ...chartSvgProps
}) => {
  // TODO: find better way to type it
  const xAccessorScaled = (d: any) => xScale(xAccessor(d));
  const yAccessorScaled = (d: any) => yScale(yAccessor(d));

  return (
    <ChartSvg {...chartSvgProps}>
      <ChartBounds>
        <BackgroundNet dimension="horizontal" scale={yScale as Scale} />
        <BackgroundNet
          dimension="vertical"
          scale={xScale as Scale}
          numberOfBars={horizontalAxisNumberOfTicks}
        />
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
          timeFormatter={horizontalTimeFormatter}
          numberOfTicks={horizontalAxisNumberOfTicks}
        />
        <Axis
          dimension="y"
          scale={yScale as Scale}
          timeFormatter={verticalTimeFormatter}
          numberOfTicks={verticalAxisNumberOfTicks}
        />
      </ChartBounds>
    </ChartSvg>
  );
};
