import * as actionTypes from '../actionTypes/assignment';

export const getMyFiles = (token: string) => ({
    type: actionTypes.GET_MY_FILES,
    token,
});


export const setMyFiles = (setMyFiles: any) => ({
    type: actionTypes.SET_MY_FILES,
    setMyFiles,
});

export const getMyFilesByID = (token: string, id: string) => ({
    type: actionTypes.GET_MY_FILES_BY_ID,
    token,
    id
});


export const setMyFilesByID = (setMyFilesById: any) => ({
    type: actionTypes.SET_MY_FILES_BY_ID,
    setMyFilesById,
});




export const setAssignmentError = (error: any) => ({
    type: actionTypes.SET_ASSIGNMENT_ERROR,
    error,
});

export const setAssignmentLoading = (loading: any) => ({
    type: actionTypes.SET_ASSIGNMENT_LOADING,
    loading,
});

