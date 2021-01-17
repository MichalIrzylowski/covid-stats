import { createReducer, ActionType } from "typesafe-actions";

import { DailyCountryData } from "@custom-types/daily-country-data";

import * as actions from "./actions";

type Actions = ActionType<typeof actions>;

export const selectedCountry = createReducer<DailyCountryData | null, Actions>(
  null
).handleAction(actions.setSelectedCountry, (state, { payload }) => payload);
