import * as actionTypes from '../actionTypes/student';

export const getCreateStudentPackage = (token: string, data: any) => ({
    type: actionTypes.GET_CREATE_STUDENT_PACKAGES,
    token,
    data
});

export const setCreateStudentPackages = (createStudentPackage: any) => ({
    type: actionTypes.SET_CREATE_STUDENT_PACKAGES,
    createStudentPackage,
});

export const setStudentError = (error: any) => ({
    type: actionTypes.SET_STUDENT_ERROR,
    error,
});

export const setStudentLoading = (loading: any) => ({
    type: actionTypes.SET_STUDENT_LOADING,
    loading,
});

