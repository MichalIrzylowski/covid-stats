import React from "react";
import { extent } from "d3";
import { scaleTime, scaleLinear } from "d3-scale";

import { useChartDimensions } from "@hooks/use-chart-dimensions";
import { LineChart as LineChartCore } from "@components/charts/line-chart";

import css from "./line-chart-section.module.scss";

export type CasesData = [Date, number];

interface LineChartProps {
  data: CasesData[];
}

const timeAccessor = (x: CasesData) => x[0];
const casesAccessor = (y: CasesData) => y[1];

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const { setElement, dimensions } = useChartDimensions();

  const timeData = extent(data, timeAccessor) as [Date, Date];
  const casesData = extent(data, casesAccessor) as [number, number];

  const xScale = scaleTime()
    .domain(timeData)
    .range([0, dimensions.boundedWidth]);

  const yScale = scaleLinear()
    .domain(casesData)
    .range([dimensions.boundedHeight, 0]);

  return (
    <div className={css.chart} ref={setElement}>
      <LineChartCore
        {...dimensions}
        data={data}
        xScale={xScale}
        yScale={yScale}
        xAccessor={timeAccessor}
        yAccessor={casesAccessor}
      />
    </div>
  );
};
