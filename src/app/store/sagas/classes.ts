import {put, call, takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/classes';

import {setClasses, setClassesError, setClassesLoading} from '../actions/classes';

import {getClasses} from '../../api/classes.service';

function* getClassesEffect(action: any): Generator<any, any, any> {
  console.log('getClassesEffect......API CALLING', action);

  try {
    yield put(setClassesLoading(true));
    yield put(setClassesError(''));
    yield put(setClasses(null));

    const response = yield call(getClasses, action.token);
    yield put(setClasses(response));

    yield put(setClassesLoading(false));
  } catch (e: any) {
    yield put(setClassesLoading(false));
    yield put(setClassesError(e.response));
  }
}

export function* ClassesSaga() {
  yield takeEvery(actionTypes.GET_CLASSES, getClassesEffect);
}
