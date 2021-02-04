import { createReducer, ActionType } from "typesafe-actions";

import { CountryTimeline } from "@custom-types/country-timeline";

import * as actions from "./actions";

type Actions = ActionType<typeof actions>;

interface CountryTimelineState extends Partial<CountryTimeline> {
  loading: boolean;
  error?: string;
}

const initialState: CountryTimelineState = {
  loading: false,
};

export const countryTimeline = createReducer<CountryTimelineState, Actions>(
  initialState
)
  .handleAction(actions.fetchCountryCovidTimelineData.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    actions.fetchCountryCovidTimelineData.success,
    (state, action) => ({
      ...state,
      ...action.payload,
      loading: false,
    })
  )
  .handleAction(
    actions.fetchCountryCovidTimelineData.failure,
    (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.message,
    })
  );
