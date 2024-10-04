import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/student';

import { setCreateStudentPackages, setStudents, setStudentError, setStudentLoading, setStudentGroup, setCreateGroup, setValidateStudent, setOnboardStudent } from '../actions/student';

import { createPackage, createStudentGroup, getStudent, getStudentGroup, onBoardStudent, validateStudentCredentials } from '../../api/student.service';

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
        // yield put(setStudentError(e.response));
        if (e.response) {
            yield put(setStudentError(e.response?.data?.message || 'Something went wrong.'));
        } else if (e.request) {
            yield put(setStudentError('Server not working. Please try again later.'));
        } else {
            yield put(setStudentError('Network error. Please check your connection.'));
        }
    }
}


function* getStudentsEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setStudentLoading(true));
        yield put(setStudentError(''));
        yield put(setStudents(null));

        const response = yield call(getStudent, action.token, action.id, action.page, action.limit);
        yield put(setStudents(response));

        yield put(setStudentLoading(false));
    } catch (e: any) {
        yield put(setStudentLoading(false));
        // yield put(setStudentError(e.response));
        if (e.response) {
            yield put(setStudentError(e.response?.data?.message || 'Something went wrong.'));
        } else if (e.request) {
            yield put(setStudentError('Server not working. Please try again later.'));
        } else {
            yield put(setStudentError('Network error. Please check your connection.'));
        }
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
        // yield put(setStudentError(e.response));
        if (e.response) {
            yield put(setStudentError(e.response?.data?.message || 'Something went wrong.'));
        } else if (e.request) {
            yield put(setStudentError('Server not working. Please try again later.'));
        } else {
            yield put(setStudentError('Network error. Please check your connection.'));
        }
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
        // yield put(setStudentError(e.response));
        if (e.response) {
            yield put(setStudentError(e.response?.data?.message || 'Something went wrong.'));
        } else if (e.request) {
            yield put(setStudentError('Server not working. Please try again later.'));
        } else {
            yield put(setStudentError('Network error. Please check your connection.'));
        }
    }
}

function* getValidateStudentEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setStudentLoading(true));
        yield put(setStudentError(''));
        yield put(setValidateStudent(null));

        const response = yield call(validateStudentCredentials, action.token, action.data);
        yield put(setValidateStudent(response));

        yield put(setStudentLoading(false));
    } catch (e: any) {
        yield put(setStudentLoading(false));
        if (e.response) {
            yield put(setStudentError(e.response?.data?.message || 'Something went wrong.'));
        } else if (e.request) {
            yield put(setStudentError('Server not working. Please try again later.'));
        } else {
            yield put(setStudentError('Network error. Please check your connection.'));
        }
    }
}


function* getOnBoardStudentEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setStudentLoading(true));
        yield put(setStudentError(''));
        yield put(setOnboardStudent(null));

        const response = yield call(onBoardStudent, action.token, action.data);
        yield put(setOnboardStudent(response));

        yield put(setStudentLoading(false));
    } catch (e: any) {
        yield put(setStudentLoading(false));
        if (e.response) {
            yield put(setStudentError(e.response?.data?.message || 'Something went wrong.'));
        } else if (e.request) {
            yield put(setStudentError('Server not working. Please try again later.'));
        } else {
            yield put(setStudentError('Network error. Please check your connection.'));
        }
    }
}


export function* StudentSaga() {
    yield takeEvery(actionTypes.GET_CREATE_STUDENT_PACKAGES, getStudentPackagesEffect);
    yield takeEvery(actionTypes.GET_STUDENTS, getStudentsEffect);
    yield takeEvery(actionTypes.GET_STUDENTS_GROUP, getStudentGroupEffect);
    yield takeEvery(actionTypes.GET_CREATE_GROUP, getCreateGroupEffect);
    yield takeEvery(actionTypes.GET_VALIDATE_STUDENT, getValidateStudentEffect);
    yield takeEvery(actionTypes.GET_ONBOARD_STUDENT, getOnBoardStudentEffect);





}
