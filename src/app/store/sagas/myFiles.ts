import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/myFiles';

import { getMyFiles, getMyFilesById, createFolder, createFiles, deleteFolders, deleteFiles } from '../../api/myFiles.service';
import { setMyFiles, setMyFilesError, setMyFilesLoading, setMyFilesByID, setCreateFolder, setCreateFiles, setDeleteFolder } from '../actions/myFiles';

function* getMyFilesEffect(action: any): Generator<any, any, any> {
    console.log('getAssignmentEffect......API CALLING', action);

    try {
        yield put(setMyFilesLoading(true));
        yield put(setMyFilesError(''));
        yield put(setMyFiles(null));

        const response = yield call(getMyFiles, action.token);
        yield put(setMyFiles(response));

        yield put(setMyFilesLoading(false));
    } catch (e: any) {
        yield put(setMyFilesLoading(false));
        // yield put(setMyFilesError(e.response));
        if (e.response) {
            yield put(setMyFilesError(e.response?.data?.message));
        } else if (e.request) {
            yield put(setMyFilesError('Server not working. Please try again later.'));
        } else {
            yield put(setMyFilesError('Network error. Please check your connection.'));
        }
    }
}

function* getMyFilesBYIdEffect(action: any): Generator<any, any, any> {
    // console.log('getAssignmentEffect......API CALLING', action);

    try {
        yield put(setMyFilesLoading(true));
        yield put(setMyFilesError(''));
        yield put(setMyFilesByID(null));

        const response = yield call(getMyFilesById, action.token, action.id);
        yield put(setMyFilesByID(response));

        yield put(setMyFilesLoading(false));
    } catch (e: any) {
        yield put(setMyFilesLoading(false));
        // yield put(setMyFilesError(e.response));
        if (e.response) {
            yield put(setMyFilesError(e.response?.data?.message));
        } else if (e.request) {
            yield put(setMyFilesError('Server not working. Please try again later.'));
        } else {
            yield put(setMyFilesError('Network error. Please check your connection.'));
        }
    }
}


function* getCreateFolderEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setMyFilesLoading(true));
        yield put(setMyFilesError(''));
        yield put(setCreateFolder(null));

        const response = yield call(createFolder, action.token, action.data);
        yield put(setCreateFolder(response));

        yield put(setMyFilesLoading(false));
    } catch (e: any) {
        yield put(setMyFilesLoading(false));
        // yield put(setMyFilesError(e.response));
        if (e.response) {
            yield put(setMyFilesError(e.response?.data?.message));
        } else if (e.request) {
            yield put(setMyFilesError('Server not working. Please try again later.'));
        } else {
            yield put(setMyFilesError('Network error. Please check your connection.'));
        }
    }
}

function* getCreateFilesEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setMyFilesLoading(true));
        yield put(setMyFilesError(''));
        yield put(setCreateFiles(null));

        const response = yield call(createFiles, action.token, action.data);
        yield put(setCreateFiles(response));

        yield put(setMyFilesLoading(false));
    } catch (e: any) {
        yield put(setMyFilesLoading(false));
        // yield put(setMyFilesError(e.response));
        if (e.response) {
            yield put(setMyFilesError(e.response?.data?.message || 'Something went wrong.'));
        } else if (e.request) {
            yield put(setMyFilesError('Server not working. Please try again later.'));
        } else {
            yield put(setMyFilesError('Network error. Please check your connection.'));
        }
    }
}



function* getDeleteFolderEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setMyFilesLoading(true));
        yield put(setMyFilesError(''));
        yield put(setDeleteFolder(null));

        const response = yield call(deleteFolders, action.token, action.id);
        yield put(setDeleteFolder(response));

        yield put(setMyFilesLoading(false));
    } catch (e: any) {
        yield put(setMyFilesLoading(false));
        // yield put(setMyFilesError(e.response));
        if (e.response) {
            yield put(setMyFilesError(e.response?.data?.message || 'Something went wrong.'));
        } else if (e.request) {
            yield put(setMyFilesError('Server not working. Please try again later.'));
        } else {
            yield put(setMyFilesError('Network error. Please check your connection.'));
        }
    }
}


function* getDeleteFilesEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setMyFilesLoading(true));
        yield put(setMyFilesError(''));
        yield put(setDeleteFolder(null));

        const response = yield call(deleteFiles, action.token, action.id);
        yield put(setDeleteFolder(response));

        yield put(setMyFilesLoading(false));
    } catch (e: any) {
        yield put(setMyFilesLoading(false));
        // yield put(setMyFilesError(e.response));
        if (e.response) {
            yield put(setMyFilesError(e.response?.data?.message || 'Something went wrong.'));
        } else if (e.request) {
            yield put(setMyFilesError('Server not working. Please try again later.'));
        } else {
            yield put(setMyFilesError('Network error. Please check your connection.'));
        }
    }
}

export function* MyFilesSaga() {
    yield takeEvery(actionTypes.GET_MY_FILES, getMyFilesEffect);
    yield takeEvery(actionTypes.GET_MY_FILES_BY_ID, getMyFilesBYIdEffect);
    yield takeEvery(actionTypes.GET_CREATE_FOLDER, getCreateFolderEffect);
    yield takeEvery(actionTypes.GET_CREATE_FILES, getCreateFilesEffect);
    yield takeEvery(actionTypes.GET_DELETE_FOLDER, getDeleteFolderEffect);
    yield takeEvery(actionTypes.GET_DELETE_FILES, getDeleteFilesEffect);

}
