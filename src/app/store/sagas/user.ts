import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/user';

import { getTutorSubjects, getUsersList, onBoardTutor } from '@/app/api/user.service';
import { setUsersList, setUsersError, setUsersLoading, setOnBoardTutor, setTutorSubjects } from '../actions/user';

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

function* getOnBoardTutorEffect(action: any): Generator<any, any, any> {
  try {
    yield put(setUsersLoading(true));
    yield put(setUsersError(''));
    yield put(setOnBoardTutor(null));

    const response = yield call(onBoardTutor, action?.token, action?.data, action?.id);
    yield put(setOnBoardTutor(response));

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


function* getTutorSubjectsEffect(action: any): Generator<any, any, any> {
  try {
    yield put(setUsersLoading(true));
    yield put(setUsersError(''));
    yield put(setTutorSubjects(null));

    const response = yield call(getTutorSubjects, action?.token, action?.id);
    yield put(setTutorSubjects(response));

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
  yield takeEvery(actionTypes.GET_ON_BOARD_TUTOR, getOnBoardTutorEffect);
  yield takeEvery(actionTypes.GET_TUTOR_SUBJECTS, getTutorSubjectsEffect);


}
