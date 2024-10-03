import * as actionTypes from '../actionTypes/myFiles';

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



export const getCreateFolder = (token: string, data: any) => ({
    type: actionTypes.GET_CREATE_FOLDER,
    token,
    data
});


export const setCreateFolder = (setCreateFolder: any) => ({
    type: actionTypes.SET_CREATE_FOLDER,
    setCreateFolder,
});

export const getCreateFiles = (token: string, data: any) => ({
    type: actionTypes.GET_CREATE_FILES,
    token,
    data
});


export const setCreateFiles = (setCreateFiles: any) => ({
    type: actionTypes.SET_CREATE_FILES,
    setCreateFiles,
});


export const getDeleteFolder = (token: string, id: string) => ({
    type: actionTypes.GET_DELETE_FOLDER,
    token,
    id
});


export const setDeleteFolder = (setDeleteFolders: any) => ({
    type: actionTypes.SET_DELETE_FOLDER,
    setDeleteFolders,
});



export const getDeleteFiles = (token: string, id: string) => ({
    type: actionTypes.GET_DELETE_FILES,
    token,
    id
});


export const setDeleteFiles = (setDeleteFile: any) => ({
    type: actionTypes.SET_DELETE_FILES,
    setDeleteFile,
});


export const getUpdateFolder = (token: string, data: any, id: string) => ({
    type: actionTypes.GET_UPDATE_FOLDER,
    token,
    data,
    id
});


export const setUpdateFolder = (setUpdateFolder: any) => ({
    type: actionTypes.SET_UPDATE_FOLDER,
    setUpdateFolder,
});



export const getUpdateFiles = (token: string, data: any, id: string) => ({
    type: actionTypes.GET_UPDATE_FILE,
    token,
    data,
    id
});


export const setUpdateFiles = (setUpdateFile: any) => ({
    type: actionTypes.SET_UPDATE_FILE,
    setUpdateFile,
});



export const setMyFilesError = (error: any) => ({
    type: actionTypes.SET_MYFILE_ERROR,
    error,
});

export const setMyFilesLoading = (loading: any) => ({
    type: actionTypes.SET_MYFILE_LOADING,
    loading,
});

