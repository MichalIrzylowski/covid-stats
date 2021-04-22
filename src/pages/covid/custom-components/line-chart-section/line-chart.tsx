import React from "react";

import { useChartDimensions } from "@hooks/use-chart-dimensions";
import { LineChart as LineChartCore } from "@components/charts/line-chart";

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

  return (
    <div className={css.chart} ref={setElement}>
      <LineChartCore
        {...dimensions}
        data={data}
        xAccessor={timeAccessor}
        yAccessor={casesAccessor}
      />
    </div>
  );
};
