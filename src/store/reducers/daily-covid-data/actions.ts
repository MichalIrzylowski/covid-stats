import { createAsyncAction } from "typesafe-actions";
import { DailyCountryData } from "@custom-types/daily-country-data";

const FETCH_DAILY_COVID_DATA_REQUEST =
  "DAILY_COVID_DATA/FETCH_DAILY_COVID_DATA_REQUEST";
const FETCH_DAILY_COVID_DATA_SUCCESS =
  "DAILY_COVID_DATA/FETCH_POPULATIONS_SUCCESS";
const FETCH_DAILY_COVID_DATA_FAILURE =
  "DAILY_COVID_DATA/FETCH_DAILY_COVID_DATA_FAILURE";

export const fetchDailyCovidData = createAsyncAction(
  FETCH_DAILY_COVID_DATA_REQUEST,
  FETCH_DAILY_COVID_DATA_SUCCESS,
  FETCH_DAILY_COVID_DATA_FAILURE
)<void, DailyCountryData[], Error>();
