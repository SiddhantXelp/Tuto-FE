import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/assignment';

import { getMyFiles, getMyFilesById, createFolder, createFiles, deleteFolders, deleteFiles, createAssignment, getAssignments, getAssignmentById } from '../../api/assignment.service';
import { setMyFiles, setAssignmentError, setAssignmentLoading, setMyFilesByID, setCreateFolder, setCreateFiles, setDeleteFolder, setDeleteFiles, setCreateAssignment, setAssignments, setAssignmentById } from '../actions/assignment';

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


function* getCreateFolderEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setCreateFolder(null));

        const response = yield call(createFolder, action.token, action.data);
        yield put(setCreateFolder(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}

function* getCreateFilesEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setCreateFiles(null));

        const response = yield call(createFiles, action.token, action.data);
        yield put(setCreateFiles(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}



function* getDeleteFolderEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setDeleteFolder(null));

        const response = yield call(deleteFolders, action.token, action.id);
        yield put(setDeleteFolder(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}


function* getDeleteFilesEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAssignmentLoading(true));
        yield put(setAssignmentError(''));
        yield put(setDeleteFolder(null));

        const response = yield call(deleteFiles, action.token, action.id);
        yield put(setDeleteFolder(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}


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

        const response = yield call(getAssignments, action.token);
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

        const response = yield call(getAssignmentById, action.token, action.id);
        yield put(setAssignmentById(response));

        yield put(setAssignmentLoading(false));
    } catch (e: any) {
        yield put(setAssignmentLoading(false));
        yield put(setAssignmentError(e.response));
    }
}

export function* AssignmentSaga() {
    yield takeEvery(actionTypes.GET_MY_FILES, getMyFilesEffect);
    yield takeEvery(actionTypes.GET_MY_FILES_BY_ID, getMyFilesBYIdEffect);
    yield takeEvery(actionTypes.GET_CREATE_FOLDER, getCreateFolderEffect);
    yield takeEvery(actionTypes.GET_CREATE_FILES, getCreateFilesEffect);
    yield takeEvery(actionTypes.GET_DELETE_FOLDER, getDeleteFolderEffect);
    yield takeEvery(actionTypes.GET_DELETE_FILES, getDeleteFilesEffect);
    yield takeEvery(actionTypes.GET_CREATE_ASSIGNMENT, getCreateAssignmentEffect);
    yield takeEvery(actionTypes.GET_ASSIGNMENTS, getAssignmentsEffect);
    yield takeEvery(actionTypes.GET_ASSIGNMENT_BY_ID, getAssignmentByIdEffect);







}
