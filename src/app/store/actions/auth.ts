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

export const setSignupError = (error: any) => ({
    type: actionTypes.SET_SIGNUP_ERROR,
    error,
});

export const setSignupLoading = (loading: any) => ({
    type: actionTypes.SET_SIGNUP_LOADING,
    loading,
});

