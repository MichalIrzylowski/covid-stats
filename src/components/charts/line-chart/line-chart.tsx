import React, { forwardRef } from "react";

import { useChartDimensions } from "@hooks/use-chart-dimensions";

import { ChartTooltip } from "@components/chart-elements/chart-tooltip";

import { LineChartProps, Data, SimpleData, ChartSize } from "./types";
import { LineChartCore } from "./line-chart-core";

const ChartWrapper = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode } & ChartSize
>(({ children, height = 400, width = "100%" }, ref) => (
  <div ref={ref} style={{ width, height, position: "relative" }}>
    <ChartTooltip>{children}</ChartTooltip>
  </div>
));

export const LineChart = <D,>({
  height,
  width,
  ...restProps
}: LineChartProps & Data<D> & ChartSize) => {
  const { setElement, dimensions } = useChartDimensions({ marginRight: 50 });

  if ("xAccessor" in restProps) {
    const { data: customData, xAccessor, yAccessor, ...chartProps } = restProps;
    const generatedData: SimpleData["data"] = customData.map((d) => ({
      x: xAccessor(d),
      y: yAccessor(d),
    }));

    return (
      <ChartWrapper ref={setElement} height={height} width={width}>
        <LineChartCore data={generatedData} {...chartProps} {...dimensions} />
      </ChartWrapper>
    );
  }

  return (
    <ChartWrapper ref={setElement} height={height} width={width}>
      <LineChartCore {...restProps} {...dimensions} />
    </ChartWrapper>
  );
};
