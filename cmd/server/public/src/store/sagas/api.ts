import { FETCH_API_SUCCESS, FETCH_API_FAILURE } from "../actions/api";
import { call, put } from 'redux-saga/effects';
import { SagaIterator } from "redux-saga";
import { client } from "../../util/client";

export function* fetchAPISaga(): SagaIterator {
  try {
    const { data: { api } } = yield call(client.fetchAPI);
    yield put({type: FETCH_API_SUCCESS, api });
  } catch(err) {
    yield put({type: FETCH_API_FAILURE, error: err});
  }
}
