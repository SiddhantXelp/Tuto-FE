import * as actionTypes from '../actionTypes/auth';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface ISignup {
    signupData: any;
    error: any;
    loading: any;
}

const initialState: ISignup = {
    signupData: null,
    error: null,
    loading: null,
};

const setSignup = ({ signupData }: { signupData: any }, state: ISignup) => ({
    ...state,
    signupData,
});

const setSignupError = (
    { error }: { error: any },
    state: ISignup,
) => ({
    ...state,
    error,
});

const setSignupLoading = (
    { loading }: { loading: any },
    state: ISignup,
) => ({
    ...state,
    loading,
});

export const actionReducers = {
    [actionTypes.SET_SIGN_UP]: setSignup,
    [actionTypes.SET_SIGNUP_ERROR]: setSignupError,
    [actionTypes.SET_SIGNUP_LOADING]: setSignupLoading,
};

export const AuthReducer = (
    state: ISignup = initialState,
    action: GenericAction,
): ISignup => reducingFunction<ISignup>(actionReducers, state, action);
