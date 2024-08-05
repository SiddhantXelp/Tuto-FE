import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/classes';

import { setClasses, setClassesError, setClassesLoading, setCreateClasses, setStudentGroup, setClassById } from '../actions/classes';

import { getClasses, createClass, getStudentGroup, getClassesById } from '../../api/classes.service';

function* getClassesEffect(action: any): Generator<any, any, any> {
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

function* getCreateClassesEffect(action: any): Generator<any, any, any> {

  try {
    yield put(setClassesLoading(true));
    yield put(setClassesError(''));
    yield put(setCreateClasses(null));

    const response = yield call(createClass, action.token, action.data);
    yield put(setCreateClasses(response));

    yield put(setClassesLoading(false));
  } catch (e: any) {
    yield put(setClassesLoading(false));
    yield put(setClassesError(e.response));
  }
}

function* getStudentGroupEffect(action: any): Generator<any, any, any> {

  try {
    yield put(setClassesLoading(true));
    yield put(setClassesError(''));
    yield put(setStudentGroup(null));

    const response = yield call(getStudentGroup, action.token);
    yield put(setStudentGroup(response));

    yield put(setClassesLoading(false));
  } catch (e: any) {
    yield put(setClassesLoading(false));
    yield put(setClassesError(e.response));
  }
}


function* getCreateClassesByIdEffect(action: any): Generator<any, any, any> {

  try {
    yield put(setClassesLoading(true));
    yield put(setClassesError(''));
    yield put(setClassById(null));

    const response = yield call(getClassesById, action.token, action.id);
    yield put(setClassById(response));

    yield put(setClassesLoading(false));
  } catch (e: any) {
    yield put(setClassesLoading(false));
    yield put(setClassesError(e.response));
  }
}

export function* ClassesSaga() {
  yield takeEvery(actionTypes.GET_CLASSES, getClassesEffect);
  yield takeEvery(actionTypes.GET_CREATE_CLASS, getCreateClassesEffect);
  yield takeEvery(actionTypes.GET_STUDENT_GROUP, getStudentGroupEffect);
  yield takeEvery(actionTypes.GET_CLASSES_ID, getCreateClassesByIdEffect)
}
