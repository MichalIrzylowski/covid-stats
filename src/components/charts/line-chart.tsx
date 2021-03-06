import React from "react";
import { curveMonotoneX } from "d3";
import { ScaleLinear, ScaleTime } from "d3-scale/index";

import {
  ChartSvg,
  ChartBounds,
  ChartSvgProps,
  Line,
  Axis,
  AxisProps,
  Scale,
  Title,
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
  title?: string;
  verticalAxisTitle?: string;
  horizontalAxisTitle?: string;
  xDimensionNet?: boolean;
  yDimensionNet?: boolean;
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
  title,
  verticalAxisTitle,
  horizontalAxisTitle,
  xDimensionNet,
  yDimensionNet,
  ...chartSvgProps
}) => {
  // TODO: find better way to type it
  const xAccessorScaled = (d: any) => xScale(xAccessor(d));
  const yAccessorScaled = (d: any) => yScale(yAccessor(d));

  return (
    <ChartSvg {...chartSvgProps}>
      {title && <Title>{title}</Title>}
      <ChartBounds>
        <Axis
          dimension="x"
          scale={xScale as Scale}
          timeFormatter={horizontalTimeFormatter}
          numberOfTicks={horizontalAxisNumberOfTicks}
          title={horizontalAxisTitle}
          showBigTicks={xDimensionNet}
        />
        <Axis
          dimension="y"
          scale={yScale as Scale}
          timeFormatter={verticalTimeFormatter}
          numberOfTicks={verticalAxisNumberOfTicks}
          title={verticalAxisTitle}
          showBigTicks={yDimensionNet}
        />
        <Line
          type="line"
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          stroke="#9980FA"
          strokeWidth={2}
          curve={curveMonotoneX}
        />
      </ChartBounds>
    </ChartSvg>
  );
};
