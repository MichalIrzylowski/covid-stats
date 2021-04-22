import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { weatherApiCall } from "@helpers/weather-api-call";
import { fetchWeatherTimelineData } from "@store/reducers/weather-timeline/actions";

import { LineChart } from "@components/charts/line-chart/line-chart";

import { LineChartSection } from "./line-chart-section";

export const Weather: React.FC = () => {
  const dispatch = useDispatch();
  const weatherTimeline = useSelector((state) => state.weatherTimeline);

  useEffect(() => {
    dispatch(fetchWeatherTimelineData.request());

    weatherApiCall()
      .then(({ data }) => {
        dispatch(fetchWeatherTimelineData.success(data.timelines[0].intervals));
      })
      .catch((error) => {
        dispatch(fetchWeatherTimelineData.failure(error.message));
      });
  }, [dispatch]);

  if (weatherTimeline.error) return <>{weatherTimeline.error}</>;

  return (
    <>
      <h1>Weather data</h1>
      {weatherTimeline.loading && "Loading"}
      {!weatherTimeline.loading && <LineChartSection />}
      {!weatherTimeline.loading && (
        <LineChart
          data={weatherTimeline.timeline}
          xAccessor={(d) => new Date(d.startTime)}
          yAccessor={(d) => d.values.temperature}
          xScaleType="time"
        />
      )}
    </>
  );
};
