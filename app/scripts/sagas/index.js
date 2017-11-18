import { all, call, put, take, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import * as actions from '../actions';
import * as api from '../services/api';


function* callAPI(endpoint, action, args) {
  const { response, error } = yield call(endpoint, ...args);
  if (response) {
    yield put(action.success(...args, response));
  } else {
    yield put(action.failure(...args, error));
  }
}

export default function* rootSaga() {
  yield all([
  ]);
}
