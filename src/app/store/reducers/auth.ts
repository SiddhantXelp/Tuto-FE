import * as actionTypes from '../actionTypes/auth';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface ISignup {
    signupData: any;
    createUser:any;
    error: any;
    loading: any;
}

const initialState: ISignup = {
    signupData: null,
    createUser:null,
    error: null,
    loading: null,
};

const setSignup = ({ signupData }: { signupData: any }, state: ISignup) => ({
    ...state,
    signupData,
});

const setCreateUser = ({ createUser }: { createUser: any }, state: ISignup) => ({
    ...state,
    createUser,
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
    [actionTypes.SET_CREATE_USER]: setCreateUser,
};

export const AuthReducer = (
    state: ISignup = initialState,
    action: GenericAction,
): ISignup => reducingFunction<ISignup>(actionReducers, state, action);
