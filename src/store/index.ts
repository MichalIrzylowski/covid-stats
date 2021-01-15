import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { dailyData } from "./reducers/daily-data";

export const reducers = combineReducers({
  dailyData,
});

export type AppState = ReturnType<typeof reducers>;

export const createAppStore = () => {
  const store = createStore(reducers, composeWithDevTools());
  return store;
};
