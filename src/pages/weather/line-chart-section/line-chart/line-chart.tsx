import React from "react";

import { useChartDimensions } from "@hooks/use-chart-dimensions";

import { LineChart as LineChartCore } from "@components/charts";

import { Interval } from "@helpers/weather-api-call";

import css from "./line-chart.module.scss";

interface LineChartProps {
  data: Interval[];
}

const timeAccessor = (el: Interval) => new Date(el.startTime).getTime();
const tempAccessor = (el: Interval) => el.values.temperature;

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const { setElement, dimensions } = useChartDimensions({
    marginRight: 40,
    marginTop: 50,
  });

  return (
    <div className={css.chart} ref={setElement}>
      <LineChartCore
        {...dimensions}
        data={data}
        xAccessor={timeAccessor}
        yAccessor={tempAccessor}
      />
    </div>
  );
};
