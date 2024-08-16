import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/user';

import { getStudents } from '@/app/api/user.service';
import { setStudents, setStudentsError, setStudentsLoading } from '../actions/user';

function* getStudentsEffect(action: any): Generator<any, any, any> {
  console.log('getStudentsEffect......API CALLING', action);

  try {
    yield put(setStudentsLoading(true));
    yield put(setStudentsError(''));
    yield put(setStudents(null));

    const response = yield call(getStudents, action.token);
    yield put(setStudents(response));

    yield put(setStudentsLoading(false));
  } catch (e: any) {
    yield put(setStudentsLoading(false));
    yield put(setStudentsError(e.response));
  }
}



export function* StudentsSaga() {
  yield takeEvery(actionTypes.GET_STUDENTS, getStudentsEffect);

}
