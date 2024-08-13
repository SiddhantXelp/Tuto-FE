import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/assignment';

import { getMyFiles, getMyFilesById } from '../../api/assignment.service';
import { setMyFiles, setAssignmentError, setAssignmentLoading, setMyFilesByID } from '../actions/assignment';

function* getMyFilesEffect(action: any): Generator<any, any, any> {
    // console.log('getAssignmentEffect......API CALLING', action);

    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setMyFiles(null));

        const response = yield call(getMyFiles, action.token);
        yield put(setMyFiles(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}

function* getMyFilesBYIdEffect(action: any): Generator<any, any, any> {
    // console.log('getAssignmentEffect......API CALLING', action);

    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setMyFilesByID(null));

        const response = yield call(getMyFilesById, action.token, action.id);
        yield put(setMyFilesByID(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}



export function* AssignmentSaga() {
    yield takeEvery(actionTypes.GET_MY_FILES, getMyFilesEffect);
    yield takeEvery(actionTypes.GET_MY_FILES_BY_ID, getMyFilesBYIdEffect);


}
