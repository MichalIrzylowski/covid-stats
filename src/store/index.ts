import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { populations } from "./reducers/population";

export const reducers = combineReducers({
  populations,
});

export type AppState = ReturnType<typeof reducers>;

export const createAppStore = () => {
  const store = createStore(reducers, composeWithDevTools());
  return store;
};
