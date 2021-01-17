import { createAction } from "typesafe-actions";
import { DailyCountryData } from "@custom-types/daily-country-data";

const SET_SELECTED_COUNTRY = "SELECTED_COUNTRY/SET_SELECTED_COUNTRY";

export const setSelectedCountry = createAction(
  SET_SELECTED_COUNTRY
)<DailyCountryData>();
