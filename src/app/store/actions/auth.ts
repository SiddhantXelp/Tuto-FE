import * as actionTypes from '../actionTypes/auth';

export const getSignup = (token: string, data: any) => ({
    type: actionTypes.GET_SIGNUP,
    token,
    data
});

export const setSignup = (signupData: any) => ({
    type: actionTypes.SET_SIGN_UP,
    signupData,
});



export const getCreateUser = (token: string, data: any) => ({
    type: actionTypes.GET_CREATE_USER,
    token,
    data
});

export const setCreateUser = (createUser: any) => ({
    type: actionTypes.SET_CREATE_USER,
    createUser,
});

export const setAuthError = (error: any) => ({
    type: actionTypes.SET_SIGNUP_ERROR,
    error,
});

export const setAuthLoading = (loading: any) => ({
    type: actionTypes.SET_SIGNUP_LOADING,
    loading,
});

