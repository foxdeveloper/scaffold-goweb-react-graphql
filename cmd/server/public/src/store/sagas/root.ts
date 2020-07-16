import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import { FETCH_API_REQUEST } from '../actions/api';
import { fetchAPISaga } from './api';
import { handleFailedActionSaga } from './failure';
import { patternFromRegExp } from '../../util/string';

export function* rootSaga() {
  yield all([
    takeLatest(FETCH_API_REQUEST, fetchAPISaga),
    takeEvery(patternFromRegExp(/^.*_FAILURE/), handleFailedActionSaga),
  ]);
}
