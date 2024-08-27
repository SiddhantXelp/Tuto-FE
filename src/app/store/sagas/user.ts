import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/user';

import { getUsersList } from '@/app/api/user.service';
import { setUsersList, setUsersError, setUsersLoading } from '../actions/user';

function* getUsersEffect(action: any): Generator<any, any, any> {
  console.log('getStudentsEffect......API CALLING', action);

  try {
    yield put(setUsersLoading(true));
    yield put(setUsersError(''));
    yield put(setUsersList(null));

    const response = yield call(getUsersList, action.token);
    yield put(setUsersList(response));

    yield put(setUsersLoading(false));
  } catch (e: any) {
    yield put(setUsersLoading(false));
    yield put(setUsersError(e.response));
  }
}



export function* UsersSaga() {
  yield takeEvery(actionTypes.GET_USER_LIST, getUsersEffect);

}
