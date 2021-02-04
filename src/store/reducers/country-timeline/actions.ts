import { createAsyncAction } from "typesafe-actions";
import { CountryTimeline } from "@custom-types/country-timeline";

const FETCH_COUNTRY_COVID_TIMELINE_DATA_REQUEST =
  "COUNTRY_TIMELINE/FETCH_COUNTRY_COVID_TIMELINE_DATA_REQUEST";
const FETCH_COUNTRY_COVID_TIMELINE_DATA_SUCCESS =
  "COUNTRY_TIMELINE/FETCH_COUNTRY_COVID_TIMELINE_DATA_SUCCESS";
const FETCH_COUNTRY_COVID_TIMELINE_DATA_FAILURE =
  "COUNTRY_TIMELINE/FETCH_COUNTRY_COVID_TIMELINE_DATA_FAILURE";

export const fetchCountryCovidTimelineData = createAsyncAction(
  FETCH_COUNTRY_COVID_TIMELINE_DATA_REQUEST,
  FETCH_COUNTRY_COVID_TIMELINE_DATA_SUCCESS,
  FETCH_COUNTRY_COVID_TIMELINE_DATA_FAILURE
)<void, CountryTimeline, Error>();
