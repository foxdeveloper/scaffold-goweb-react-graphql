import { combineReducers } from 'redux';
import { APIReducer, APIState } from './api';

export interface RootState {
  api: APIState
}

export const rootReducer = combineReducers({
  api: APIReducer,
});
