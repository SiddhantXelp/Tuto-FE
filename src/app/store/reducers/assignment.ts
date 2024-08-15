import * as actionTypes from '../actionTypes/assignment';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface IAssignment {
    setMyFiles: any;
    setMyFilesById: any;
    setCreateFolder: any;
    setCreateFiles: any;
    setDeleteFolders: any;
    setDeleteFile: any;
    setCreateAssignments: any;
    error: any;
    loading: any;

}
const initialState: IAssignment = {
    setMyFiles: null,
    setMyFilesById: null,
    setCreateFolder: null,
    setCreateFiles: null,
    setDeleteFolders: null,
    setDeleteFile: null,
    setCreateAssignments: null,
    error: null,
    loading: null,

};

const setMyFiles = ({ setMyFiles }: { setMyFiles: any }, state: IAssignment) => ({
    ...state,
    setMyFiles,
});


const setMyFilesById = ({ setMyFilesById }: { setMyFilesById: any }, state: IAssignment) => ({
    ...state,
    setMyFilesById,
});

const setCreateFolders = ({ setCreateFolder }: { setCreateFolder: any }, state: IAssignment) => ({
    ...state,
    setCreateFolder,
});


const setCreateFile = ({ setCreateFiles }: { setCreateFiles: any }, state: IAssignment) => ({
    ...state,
    setCreateFiles,
});


const setDeleteFolder = ({ setDeleteFolders }: { setDeleteFolders: any }, state: IAssignment) => ({
    ...state,
    setDeleteFolders,
});

const setDeleteFiles = ({ setDeleteFile }: { setDeleteFile: any }, state: IAssignment) => ({
    ...state,
    setDeleteFile,
});

const setCreateAssignment = ({ setCreateAssignments }: { setCreateAssignments: any }, state: IAssignment) => ({
    ...state,
    setCreateAssignments,
});

const setAssignmentError = (
    { error }: { error: any },
    state: IAssignment,
) => ({
    ...state,
    error,
});

const setAssignmentLoading = (
    { loading }: { loading: any },
    state: IAssignment,
) => ({
    ...state,
    loading,
});


export const actionReducers = {
    [actionTypes.SET_MY_FILES]: setMyFiles,
    [actionTypes.SET_MY_FILES_BY_ID]: setMyFilesById,
    [actionTypes.SET_CREATE_FOLDER]: setCreateFolders,
    [actionTypes.SET_CREATE_FILES]: setCreateFile,
    [actionTypes.SET_ASSIGNMENT_ERROR]: setAssignmentError,
    [actionTypes.SET_ASSIGNMENT_LOADING]: setAssignmentLoading,
    [actionTypes.SET_DELETE_FOLDER]: setDeleteFolder,
    [actionTypes.SET_DELETE_FILES]: setDeleteFiles,
    [actionTypes.SET_CREATE_ASSIGNMENT]: setCreateAssignment,


};

export const AssignmentReducer = (
    state: IAssignment = initialState,
    action: GenericAction,
): IAssignment => reducingFunction<IAssignment>(actionReducers, state, action);
