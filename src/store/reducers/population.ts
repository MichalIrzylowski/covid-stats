import { createReducer, ActionType } from "typesafe-actions";

import * as actions from "./actions";

type Country = Record<string, number>;
export type Populations = Country;

interface PopulationsState {
  data: Populations;
  loading: boolean;
  error: Error | null;
}
type Actions = ActionType<typeof actions>;

const initialState: PopulationsState = {
  data: {},
  loading: true,
  error: null,
};

export const populations = createReducer<PopulationsState, Actions>(
  initialState
)
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
