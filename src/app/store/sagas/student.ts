import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/student';

import { setCreateStudentPackages, setStudents, setStudentError, setStudentLoading, setStudentGroup, setCreateGroup } from '../actions/student';

import { createPackage, createStudentGroup, getStudent, getStudentGroup } from '../../api/student.service';

function* getStudentPackagesEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setStudentLoading(true));
        yield put(setStudentError(''));
        yield put(setCreateStudentPackages(null));

        const response = yield call(createPackage, action.token, action.data);
        yield put(setCreateStudentPackages(response));

        yield put(setStudentLoading(false));
    } catch (e: any) {
        yield put(setStudentLoading(false));
        yield put(setStudentError(e.response));
    }
}


function* getStudentsEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setStudentLoading(true));
        yield put(setStudentError(''));
        yield put(setStudents(null));

        const response = yield call(getStudent, action.token, action.page, action.limit);
        yield put(setStudents(response));

        yield put(setStudentLoading(false));
    } catch (e: any) {
        yield put(setStudentLoading(false));
        yield put(setStudentError(e.response));
    }
}


function* getStudentGroupEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setStudentLoading(true));
        yield put(setStudentError(''));
        yield put(setStudentGroup(null));

        const response = yield call(getStudentGroup, action.token, action.id);
        yield put(setStudentGroup(response));

        yield put(setStudentLoading(false));
    } catch (e: any) {
        yield put(setStudentLoading(false));
        yield put(setStudentError(e.response));
    }
}


function* getCreateGroupEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setStudentLoading(true));
        yield put(setStudentError(''));
        yield put(setCreateGroup(null));

        const response = yield call(createStudentGroup, action.token, action.data);
        yield put(setCreateGroup(response));

        yield put(setStudentLoading(false));
    } catch (e: any) {
        yield put(setStudentLoading(false));
        yield put(setStudentError(e.response));
    }
}


export function* StudentSaga() {
    yield takeEvery(actionTypes.GET_CREATE_STUDENT_PACKAGES, getStudentPackagesEffect);
    yield takeEvery(actionTypes.GET_STUDENTS, getStudentsEffect);
    yield takeEvery(actionTypes.GET_STUDENTS_GROUP, getStudentGroupEffect);
    yield takeEvery(actionTypes.GET_CREATE_GROUP, getCreateGroupEffect);



}
