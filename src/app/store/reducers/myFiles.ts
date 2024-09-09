import * as actionTypes from '../actionTypes/myFiles';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface IMyFiles {
    setMyFiles: any;
    setMyFilesById: any;
    setCreateFolder: any;
    setCreateFiles: any;
    setDeleteFolders: any;
    setDeleteFile: any;
    error: any;
    loading: any;

}
const initialState: IMyFiles = {
    setMyFiles: null,
    setMyFilesById: null,
    setCreateFolder: null,
    setCreateFiles: null,
    setDeleteFolders: null,
    setDeleteFile: null,
    error: null,
    loading: null,

};

const setMyFiles = ({ setMyFiles }: { setMyFiles: any }, state: IMyFiles) => ({
    ...state,
    setMyFiles,
});


const setMyFilesById = ({ setMyFilesById }: { setMyFilesById: any }, state: IMyFiles) => ({
    ...state,
    setMyFilesById,
});

const setCreateFolders = ({ setCreateFolder }: { setCreateFolder: any }, state: IMyFiles) => ({
    ...state,
    setCreateFolder,
});


const setCreateFile = ({ setCreateFiles }: { setCreateFiles: any }, state: IMyFiles) => ({
    ...state,
    setCreateFiles,
});


const setDeleteFolder = ({ setDeleteFolders }: { setDeleteFolders: any }, state: IMyFiles) => ({
    ...state,
    setDeleteFolders,
});

const setDeleteFiles = ({ setDeleteFile }: { setDeleteFile: any }, state: IMyFiles) => ({
    ...state,
    setDeleteFile,
});

const setMyFilesError = (
    { error }: { error: any },
    state: IMyFiles,
) => ({
    ...state,
    error,
});

const setMyFilesLoading = (
    { loading }: { loading: any },
    state: IMyFiles,
) => ({
    ...state,
    loading,
});


export const actionReducers = {
    [actionTypes.SET_MY_FILES]: setMyFiles,
    [actionTypes.SET_MY_FILES_BY_ID]: setMyFilesById,
    [actionTypes.SET_CREATE_FOLDER]: setCreateFolders,
    [actionTypes.SET_CREATE_FILES]: setCreateFile,
    [actionTypes.SET_DELETE_FOLDER]: setDeleteFolder,
    [actionTypes.SET_DELETE_FILES]: setDeleteFiles,
    [actionTypes.SET_MYFILE_ERROR]: setMyFilesError,
    [actionTypes.SET_MYFILE_LOADING]: setMyFilesLoading,
};

export const MyFilesReducer = (
    state: IMyFiles = initialState,
    action: GenericAction,
): IMyFiles => reducingFunction<IMyFiles>(actionReducers, state, action);
