import { createAsyncAction } from "typesafe-actions";
import { Interval } from "@helpers/weather-api-call";

const FETCH_WEATHER_TIMELINE_DATA_REQUEST =
  "weather/FETCH_WEATHER_TIMELINE_DATA_REQUEST";
const FETCH_WEATHER_TIMELINE_DATA_SUCCESS =
  "weather/FETCH_WEATHER_TIMELINE_DATA_SUCCESS";
const FETCH_WEATHER_TIMELINE_DATA_FAILURE =
  "weather/FETCH_WEATHER_TIMELINE_DATA_FAILURE";

export const fetchWeatherTimelineData = createAsyncAction(
  FETCH_WEATHER_TIMELINE_DATA_REQUEST,
  FETCH_WEATHER_TIMELINE_DATA_SUCCESS,
  FETCH_WEATHER_TIMELINE_DATA_FAILURE
)<void, Interval[], string>();
