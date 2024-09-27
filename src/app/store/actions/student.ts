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


export const getStudents = (token: string, page: string, limit: string) => ({
    type: actionTypes.GET_STUDENTS,
    token,
    page,
    limit
});

export const setStudents = (getStudents: any) => ({
    type: actionTypes.SET_STUDENTS,
    getStudents,
});


export const getStudentGroup = (token: string, id: string) => ({
    type: actionTypes.GET_STUDENTS_GROUP,
    token,
    id,
});

export const setStudentGroup = (getStudentGroup: any) => ({
    type: actionTypes.SET_STUDENTS_GROUP,
    getStudentGroup,
});


export const getCreateGroup = (token: string, data: any) => ({
    type: actionTypes.GET_CREATE_GROUP,
    token,
    data,
});

export const setCreateGroup = (getCreateGroup: any) => ({
    type: actionTypes.SET_CREATE_GROUP,
    getCreateGroup,
});


export const setStudentError = (error: any) => ({
    type: actionTypes.SET_STUDENT_ERROR,
    error,
});

export const setStudentLoading = (loading: any) => ({
    type: actionTypes.SET_STUDENT_LOADING,
    loading,
});

