import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/assignment';

import { createAssignment, getAssignments, getAssignmentById, completeAssignment, createStudentAssignment } from '../../api/assignment.service';
import { setAssignmentError, setAssignmentLoading, setCreateAssignment, setAssignments, setAssignmentById, setCompleteAssignment, setCreateStudentAssignment, setStudentAssignments } from '../actions/assignment';


function* getCreateAssignmentEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setCreateAssignment(null));

        const response = yield call(createAssignment, action.token, action.data);
        yield put(setCreateAssignment(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}


function* getAssignmentsEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setAssignments(null));

        const response = yield call(getAssignments, action.token, action.page, action.limit, action.status);
        yield put(setAssignments(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}



function* getAssignmentByIdEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setAssignmentById(null));

        const response = yield call(getAssignmentById, action.token, action.id,action.studentId);
        yield put(setAssignmentById(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}


function* getCompletedAssignmentEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setCompleteAssignment(null));

        const response = yield call(completeAssignment, action.token, action.data, action.id,action.studentId);
        yield put(setCompleteAssignment(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}


function* getStudentCreateAssignmentEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setCreateStudentAssignment(null));

        const response = yield call(createStudentAssignment, action.token, action.data);
        yield put(setCreateStudentAssignment(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}



function* getStudentAssignmentsEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setStudentAssignments(null));

        const response = yield call(getAssignments, action.token, action.page, action.limit, action.status);
        yield put(setStudentAssignments(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}


export function* AssignmentSaga() {
    yield takeEvery(actionTypes.GET_CREATE_ASSIGNMENT, getCreateAssignmentEffect);
    yield takeEvery(actionTypes.GET_ASSIGNMENTS, getAssignmentsEffect);
    yield takeEvery(actionTypes.GET_ASSIGNMENT_BY_ID, getAssignmentByIdEffect);
    yield takeEvery(actionTypes.GET_COMPLETED_ASSIGNMENT, getCompletedAssignmentEffect);
    yield takeEvery(actionTypes.GET_CREATE_STUDENT_ASSIGNMENT, getStudentCreateAssignmentEffect);
    yield takeEvery(actionTypes.GET_STUDENT_ASSIGNMENTS, getStudentAssignmentsEffect);

}
