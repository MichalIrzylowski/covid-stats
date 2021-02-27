import { createReducer, ActionType } from "typesafe-actions";
import { Interval } from "@helpers/weather-api-call";

import * as actions from "./actions";

interface State {
  loading: boolean;
  timeline: Interval[];
  error?: string;
}

const initialState: State = {
  loading: false,
  timeline: [],
};

export const weatherTimeline = createReducer<State, ActionType<typeof actions>>(
  initialState
)
  .handleAction(actions.fetchWeatherTimelineData.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.fetchWeatherTimelineData.success, (_, action) => ({
    loading: false,
    timeline: action.payload,
  }))
  .handleAction(actions.fetchWeatherTimelineData.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }));
