import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/auth';

import { setSignup, setCreateUser, setAuthError, setAuthLoading, setLogin, setRoles } from '../actions/auth';

import { postSignup, login, getRole } from '../../api/auth.service';

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
        yield put(setAuthError(e.response?.data?.message));
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
        console.log("::::::::::::::::::::::::::::::::::", e.response?.data?.message)
        yield put(setAuthError(e.response?.data?.message));
    }
}



function* LoginEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAuthLoading(true));
        yield put(setAuthError(''));
        yield put(setLogin(null));

        const response = yield call(login, action.data);
        yield put(setLogin(response));

        yield put(setAuthLoading(false));
    } catch (e: any) {
        yield put(setAuthLoading(false));
        yield put(setAuthError(e.response?.data?.message));
    }
}



function* getRolesEffect(action: any): Generator<any, any, any> {
    try {
        yield put(setAuthLoading(true));
        yield put(setAuthError(''));
        yield put(setRoles(null));

        const response = yield call(getRole);
        yield put(setRoles(response));

        yield put(setAuthLoading(false));
    } catch (e: any) {
        yield put(setAuthLoading(false));
        yield put(setAuthError(e.response?.data?.message));
    }
}



export function* AuthSaga() {
    yield takeEvery(actionTypes.GET_SIGNUP, getAuthEffect);
    yield takeEvery(actionTypes.GET_CREATE_USER, CreateUserEffect);
    yield takeEvery(actionTypes.GET_LOGIN_USER, LoginEffect);
    yield takeEvery(actionTypes.GET_ROLES, getRolesEffect);



}
