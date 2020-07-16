import { FETCH_API_SUCCESS } from "../actions/api";

export interface APIState {
  gitRef: string
  projectVersion: string
  buildDate: string
}

const defaultState: APIState = {
  gitRef: "",
  projectVersion: "",
  buildDate: ""
};

export function APIReducer(state: APIState = defaultState, action : any): any {
  switch(action.type) {
    case FETCH_API_SUCCESS:
      return handleAPIFetchSuccess(state, action);
  }
  return state;
}

function handleAPIFetchSuccess(state: APIState, action: any): APIState {
  return {
    ...state,
    ...action.api
  }
}
