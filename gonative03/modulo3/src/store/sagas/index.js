import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import api from '../../services/api';

import * as LoginActions from '../actions/login';

function* login(action) {
  try {
    const { username } = action.payload;

    yield call(api.get, `/users/${username}`);
    yield put(LoginActions.loginSuccess(username));
  } catch (error) {
    yield put(LoginActions.loginFailure());
  }
}

export default function* rootSaga() {
  return yield all([takeLatest('LOGIN_REQUEST', login)]);
}