import { createAsyncAction } from "typesafe-actions";
import { DailyCountryData } from "@custom-types/daily-country-data";

const FETCH_POPULATIONS_REQUEST = "POPULATIONS/FETCH_POPULATIONS_REQUEST";
const FETCH_POPULATIONS_SUCCESS = "POPULATIONS/FETCH_POPULATIONS_SUCCESS";
const FETCH_POPULATIONS_FAILURE = "POPULATIONS/FETCH_POPULATIONS_FAILURE";

export const fetchPopulations = createAsyncAction(
  FETCH_POPULATIONS_REQUEST,
  FETCH_POPULATIONS_SUCCESS,
  FETCH_POPULATIONS_FAILURE
)<void, DailyCountryData[], Error>();
