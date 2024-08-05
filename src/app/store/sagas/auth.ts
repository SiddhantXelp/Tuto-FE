import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/auth';

import { setSignup, setCreateUser, setAuthError, setAuthLoading } from '../actions/auth';

import { postSignup } from '../../api/auth.service';

function* getAuthEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAuthLoading(true));
        yield put(setAuthError(''));
        yield put(setSignup(null));

        const response = yield call(postSignup, action.token, action.data);
        yield put(setSignup(response));

        yield put(setAuthLoading(false));
    } catch (e: any) {
        yield put(setAuthLoading(false));
        yield put(setAuthError(e.response));
    }
}


function* CreateUserEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAuthLoading(true));
        yield put(setAuthError(''));
        yield put(setCreateUser(null));

        const response = yield call(postSignup, action.token, action.data);
        yield put(setCreateUser(response));

        yield put(setAuthLoading(false));
    } catch (e: any) {
        yield put(setAuthLoading(false));
        yield put(setAuthError(e.response));
    }
}


export function* AuthSaga() {
    yield takeEvery(actionTypes.GET_SIGNUP, getAuthEffect);
    yield takeEvery(actionTypes.GET_CREATE_USER, CreateUserEffect);

}
