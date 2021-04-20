import React, { forwardRef } from "react";

import { useChartDimensions } from "@hooks/use-chart-dimensions";

import { LineChartProps, Data, SimpleData } from "./types";
import { LineChartCore } from "./line-chart-core";

const ChartWrapper = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <div ref={ref} style={{ width: 400, height: 200 }}>
      {children}
    </div>
  )
);

export const LineChart = <D,>(props: LineChartProps & Data<D>) => {
  const { setElement, dimensions } = useChartDimensions();
  if ("xAccessor" in props) {
    const { data: customData, xAccessor, yAccessor, ...restProps } = props;
    const generatedData: SimpleData["data"] = customData.map((d) => ({
      x: xAccessor(d),
      y: yAccessor(d),
    }));

    return (
      <ChartWrapper ref={setElement}>
        <LineChartCore data={generatedData} {...restProps} {...dimensions} />
      </ChartWrapper>
    );
  }
  return (
    <ChartWrapper ref={setElement}>
      <LineChartCore {...props} {...dimensions} />
    </ChartWrapper>
  );
};
