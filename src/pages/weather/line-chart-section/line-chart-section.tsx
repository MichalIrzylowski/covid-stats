import React from "react";
import { useSelector } from "react-redux";

import { LineChart } from "./line-chart";

import css from "./line-chart-section.module.scss";

export const LineChartSection: React.FC = () => {
  const timeline = useSelector((state) => state.weatherTimeline.timeline);
  return (
    <div className={css.wrapper}>
      <LineChart data={timeline} />
    </div>
  );
};
