import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/classes';

import { setClasses, setClassesError, setClassesLoading, setCreateClasses, setStudentGroup, setClassById, setAddStudentGroup, setClassesWithStudentDetails } from '../actions/classes';

import { getClasses, createClass, getStudentGroup, getClassesById, addStudentGroup, getClassWithStudents } from '../../api/classes.service';

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
    // yield put(setClassesError(e.response?.data?.message));
    if (e.response) {
      yield put(setClassesError(e.response?.data?.message));
    } else if (e.request) {
      yield put(setClassesError('Server not working. Please try again later.'));
    } else {
      yield put(setClassesError('Network error. Please check your connection.'));
    }
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
    // yield put(setClassesError(e.response?.data?.message));
    if (e.response) {
      yield put(setClassesError(e.response?.data?.message));
    } else if (e.request) {
      yield put(setClassesError('Server not working. Please try again later.'));
    } else {
      yield put(setClassesError('Network error. Please check your connection.'));
    }
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
    // yield put(setClassesError(e.response?.data?.message));
    if (e.response) {
      yield put(setClassesError(e.response?.data?.message));
    } else if (e.request) {
      yield put(setClassesError('Server not working. Please try again later.'));
    } else {
      yield put(setClassesError('Network error. Please check your connection.'));
    }
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
    // yield put(setClassesError(e.response?.data?.message));
    if (e.response) {
      yield put(setClassesError(e.response?.data?.message));
    } else if (e.request) {
      yield put(setClassesError('Server not working. Please try again later.'));
    } else {
      yield put(setClassesError('Network error. Please check your connection.'));
    }
  }
}


function* getAddStudentGroupEffect(action: any): Generator<any, any, any> {

  try {
    yield put(setClassesLoading(true));
    yield put(setClassesError(''));
    yield put(setAddStudentGroup(null));

    const response = yield call(addStudentGroup, action.token, action.data);
    console.log("::::::::::::response", response);
    yield put(setAddStudentGroup(response));

    yield put(setClassesLoading(false));
  } catch (e: any) {
    yield put(setClassesLoading(false));
    // yield put(setClassesError(e.response?.data?.message));
    if (e.response) {
      yield put(setClassesError(e.response?.data?.message));
    } else if (e.request) {
      yield put(setClassesError('Server not working. Please try again later.'));
    } else {
      yield put(setClassesError('Network error. Please check your connection.'));
    }
  }
}


function* getStudentWithClasses(action: any): Generator<any, any, any> {

  try {
    yield put(setClassesLoading(true));
    yield put(setClassesError(''));
    yield put(setClassesWithStudentDetails(null));

    const response = yield call(getClassWithStudents, action.token, action.studentId, action.classId);
    console.log("::::::::::::response", response);
    yield put(setClassesWithStudentDetails(response));

    yield put(setClassesLoading(false));
  } catch (e: any) {
    yield put(setClassesLoading(false));
    // yield put(setClassesError(e.response?.data?.message));
    if (e.response) {
      yield put(setClassesError(e.response?.data?.message));
    } else if (e.request) {
      yield put(setClassesError('Server not working. Please try again later.'));
    } else {
      yield put(setClassesError('Network error. Please check your connection.'));
    }
  }
}



export function* ClassesSaga() {
  yield takeEvery(actionTypes.GET_CLASSES, getClassesEffect);
  yield takeEvery(actionTypes.GET_CREATE_CLASS, getCreateClassesEffect);
  yield takeEvery(actionTypes.GET_STUDENT_GROUP, getStudentGroupEffect);
  yield takeEvery(actionTypes.GET_CLASSES_ID, getCreateClassesByIdEffect);
  yield takeEvery(actionTypes.GET_STUDENT_GROUP_ADD, getAddStudentGroupEffect);
  yield takeEvery(actionTypes.GET_CLASSES_WITH_STUDENT, getStudentWithClasses)


}
