import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { dailyData } from "./reducers/daily-covid-data/daily-data";
import { selectedCountry } from "./reducers/selected-country/selected-country";

export const reducers = combineReducers({
  dailyData,
  selectedCountry,
});

export type AppState = ReturnType<typeof reducers>;

export const createAppStore = () => {
  const store = createStore(reducers, composeWithDevTools());
  return store;
};
