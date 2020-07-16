import { Action } from "redux";

export const FETCH_API_REQUEST = 'FETCH_API_REQUEST';
export const FETCH_API_FAILURE = 'FETCH_API_FAILURE';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';

export interface FetchAPIAction extends Action {}

export function fetchAPIAction(): FetchAPIAction {
  return { type: FETCH_API_REQUEST };
}
