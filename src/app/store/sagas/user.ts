import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/user';

import { getUsersList } from '@/app/api/user.service';
import { setUsersList, setUsersError, setUsersLoading } from '../actions/user';

function* getUsersEffect(action: any): Generator<any, any, any> {
  try {
    yield put(setUsersLoading(true));
    yield put(setUsersError(''));
    yield put(setUsersList(null));

    const response = yield call(getUsersList, action.token);
    yield put(setUsersList(response));

    yield put(setUsersLoading(false));
  } catch (e: any) {
    yield put(setUsersLoading(false));
    // yield put(setUsersError(e.response));
    if (e.response) {
      yield put(setUsersError(e.response?.data?.message));
    } else if (e.request) {
      yield put(setUsersError('Server not working. Please try again later.'));
    } else {
      yield put(setUsersError('Network error. Please check your connection.'));
    }
  }
}



export function* UsersSaga() {
  yield takeEvery(actionTypes.GET_USER_LIST, getUsersEffect);

}
