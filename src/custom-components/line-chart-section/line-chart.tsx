import React from "react";
import { extent } from "d3";
import { scaleTime, scaleLinear } from "d3-scale";

import { useChartDimensions } from "@hooks/use-chart-dimensions";
import { LineChart as LineChartCore } from "@components/charts/line-chart";

import { timeFormatter } from "@utils/time";

import css from "./line-chart-section.module.scss";

export type CasesData = [Date, number];

interface LineChartProps {
  data: CasesData[];
  title?: string;
}

const timeAccessor = (x: CasesData) => x[0];
const casesAccessor = (y: CasesData) => y[1];

export const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const { setElement, dimensions } = useChartDimensions({ marginTop: 50 });

  const timeData = extent(data, timeAccessor) as [Date, Date];
  const casesData = extent(data, casesAccessor) as [number, number];

  const xScale = scaleTime()
    .domain(timeData)
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(casesData)
    .range([dimensions.boundedHeight, 0])
    .nice();

  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  return (
    <div className={css.chart} ref={setElement}>
      <LineChartCore
        {...dimensions}
        data={data}
        xScale={xScale}
        yScale={yScale}
        xAccessor={timeAccessor}
        yAccessor={casesAccessor}
        horizontalTimeFormatter={timeFormatter()}
        horizontalAxisNumberOfTicks={numberOfTicks}
        title={`${title} in time`}
        verticalAxisTitle="amount of people"
        horizontalAxisTitle="date"
      />
    </div>
  );
};
