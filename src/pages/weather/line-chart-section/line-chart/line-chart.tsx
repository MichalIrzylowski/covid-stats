import React from "react";
import { extent } from "d3";
import { scaleTime, scaleLinear } from "d3-scale";

import { useChartDimensions } from "@hooks/use-chart-dimensions";

import { LineChart as LineChartCore } from "@components/charts";

import { Interval } from "@helpers/weather-api-call";
import { timeFormatter } from "@utils/time";

import css from "./line-chart.module.scss";

interface LineChartProps {
  data: Interval[];
}

const timeAccessor = (el: Interval) => new Date(el.startTime).getTime();
const tempAccessor = (el: Interval) => el.values.temperature;

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const { setElement, dimensions } = useChartDimensions({ marginRight: 40 });

  const timeExtent = (extent(data, timeAccessor) as unknown) as [Date, Date];
  const tempExtent = extent(data, tempAccessor) as [Number, Number];

  const xScale = scaleTime()
    .domain(timeExtent)
    .range([0, dimensions.boundedWidth])
    .nice();
  const yScale = scaleLinear()
    .domain(tempExtent)
    .range([dimensions.boundedHeight, 0])
    .nice();

  return (
    <div className={css.chart} ref={setElement}>
      <LineChartCore
        {...dimensions}
        horizontalTimeFormatter={timeFormatter()}
        verticalAxisNumberOfTicks={5}
        data={data}
        xAccessor={timeAccessor}
        yAccessor={tempAccessor}
        xScale={xScale}
        yScale={yScale}
      />
    </div>
  );
};
