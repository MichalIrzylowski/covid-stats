import { createReducer, ActionType } from "typesafe-actions";

import { DailyCountryData } from "@custom-types/daily-country-data";

import * as actions from "./actions";

interface PopulationsState {
  data: DailyCountryData[];
  loading: boolean;
  error: Error | null;
}
type Actions = ActionType<typeof actions>;

const initialState: PopulationsState = {
  data: [],
  loading: true,
  error: null,
};

export const dailyData = createReducer<PopulationsState, Actions>(initialState)
  .handleAction(actions.fetchPopulations.success, (state, action) => ({
    ...state,
    loading: false,
    data: action.payload,
  }))
  .handleAction(actions.fetchPopulations.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }));
