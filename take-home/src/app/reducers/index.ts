import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { getDeals } from '../actions';

interface DealsState {
  maxSalePrice: number;
}

export interface State {
  deals: DealsState
}
export function getInitialState(): State {
  return {
    deals: { maxSalePrice: 15 }
  }
}

const dealsReducer = createReducer(getInitialState().deals, on(getDeals, (state, action) => {
  return {
    ...state,
    deals: {
      maxSalePrice: action.maxSalePrice
    }
  }
}))

export const reducers: ActionReducerMap<State> = {
  deals: dealsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
