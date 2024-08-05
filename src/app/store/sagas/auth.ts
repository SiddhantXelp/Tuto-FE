import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/auth';

import { setSignup, setSignupError, setSignupLoading } from '../actions/auth';

import { postSignup } from '../../api/auth.service';

function* getAuthEffect(action: any): Generator<any, any, any> {
    console.log('getClassesEffect......API CALLING', action);
    try {
        yield put(setSignupLoading(true));
        yield put(setSignupError(''));
        yield put(setSignup(null));

        const response = yield call(postSignup, action.token, action.data);
        yield put(setSignup(response));

        yield put(setSignupLoading(false));
    } catch (e: any) {
        yield put(setSignupLoading(false));
        yield put(setSignupError(e.response));
    }
}

export function* AuthSaga() {
    yield takeEvery(actionTypes.GET_SIGNUP, getAuthEffect);
}
