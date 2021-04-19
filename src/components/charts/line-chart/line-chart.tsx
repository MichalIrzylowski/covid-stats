import React from "react";

import { LineChartProps, Data, SimpleData } from "./types";

export const LineChart = <D,>(props: LineChartProps & Data<D>) => {
  if ("xAccessor" in props) {
    const { data: customData, xAccessor, yAccessor } = props;
    const generatedData: SimpleData["data"] = customData.map((d) => ({
      x: xAccessor(d),
      y: yAccessor(d),
    }));
  }
  return <div>chart</div>;
};
