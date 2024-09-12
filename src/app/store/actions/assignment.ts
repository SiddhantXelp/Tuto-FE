import * as actionTypes from '../actionTypes/assignment';


export const getCreateAssignment = (token: string, data: any) => ({
    type: actionTypes.GET_CREATE_ASSIGNMENT,
    token,
    data
});

export const setCreateAssignment = (setCreateAssignments: any) => ({
    type: actionTypes.SET_CREATE_ASSIGNMENT,
    setCreateAssignments,
});

export const getAssignments = (token: string, page: string, limit: string,status:string) => ({
    type: actionTypes.GET_ASSIGNMENTS,
    token,
    page,
    limit,
    status
});


export const setAssignments = (setAssignments: any) => ({
    type: actionTypes.SET_ASSIGNMENTS,
    setAssignments,
});

export const getAssignmentById = (token: string, id: string,studentId:string) => ({
    type: actionTypes.GET_ASSIGNMENT_BY_ID,
    token,
    id,
    studentId
});


export const setAssignmentById = (setAssignmentById: any) => ({
    type: actionTypes.SET_ASSIGNMENT_BY_ID,
    setAssignmentById,
});


export const getCompleteAssignment = (token: string, data: any, id: any,studentId:string) => ({
    type: actionTypes.GET_COMPLETED_ASSIGNMENT,
    token,
    data,
    id,
    studentId
});


export const setCompleteAssignment = (setCompletedAssignment: any) => ({
    type: actionTypes.SET_COMPLETED_ASSIGNMENT,
    setCompletedAssignment,
});


export const getCreateStudentAssignment = (token: string, data: any) => ({
    type: actionTypes.GET_CREATE_STUDENT_ASSIGNMENT,
    token,
    data
});


export const setCreateStudentAssignment = (setStudentCreateAssignment: any) => ({
    type: actionTypes.SET_CREATE_STUDENT_ASSIGNMENT,
    setStudentCreateAssignment,
});




export const getStudentAssignments = (token: string, page: string, limit: string) => ({
    type: actionTypes.GET_STUDENT_ASSIGNMENTS,
    token,
    page,
    limit
});


export const setStudentAssignments = (setStudentAssignments: any) => ({
    type: actionTypes.SET_ASSIGNMENTS,
    setStudentAssignments,
});

export const setAssignmentError = (error: any) => ({
    type: actionTypes.SET_STUDENT_ASSIGNMENTS,
    error,
});

export const setAssignmentLoading = (loading: any) => ({
    type: actionTypes.SET_ASSIGNMENT_LOADING,
    loading,
});

