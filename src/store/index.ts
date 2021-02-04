import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { dailyData } from "./reducers/daily-covid-data/daily-data";
import { selectedCountry } from "./reducers/selected-country/selected-country";
import { countryTimeline } from "./reducers/country-timeline/country-timeline";

export const reducers = combineReducers({
  dailyData,
  selectedCountry,
  countryTimeline,
});

export type AppState = ReturnType<typeof reducers>;

export const createAppStore = () => {
  const store = createStore(reducers, composeWithDevTools());
  return store;
};
