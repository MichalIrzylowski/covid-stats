import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { timeParser as timeParserCore } from "@utils/time";

import { TimelineData } from "@custom-types/country-timeline";

import { LineChart, CasesData } from "./line-chart";

import css from "./line-chart-section.module.scss";

const timeParser = timeParserCore();

export const LineChartSection = () => {
  const country = useSelector((state) => state.selectedCountry?.country);
  const timeline = useSelector((state) => state.countryTimeline.timeline);

  const timelineData = useMemo(
    () =>
      timeline &&
      Object.entries(timeline).map(([type, data]) => [
        type,
        Object.entries(data as TimelineData).map(([date, cases]) => [
          timeParser(date),
          cases,
        ]),
      ]),
    [timeline]
  );

  if (!timelineData) return null;

  return (
    <div className={css.wrapper}>
      <h2>History of COVID in {country}</h2>
      {timelineData.map(([title, data]) => (
        <LineChart data={data as CasesData[]} />
      ))}
    </div>
  );
};
