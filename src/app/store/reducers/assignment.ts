import * as actionTypes from '../actionTypes/assignment';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface IAssignment {
    setMyFiles: any;
    setMyFilesById: any;
    error: any;
    loading: any;

}

const initialState: IAssignment = {
    setMyFiles: null,
    setMyFilesById: null,
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
    [actionTypes.SET_ASSIGNMENT_ERROR]: setAssignmentError,
    [actionTypes.SET_ASSIGNMENT_LOADING]: setAssignmentLoading,
};

export const AssignmentReducer = (
    state: IAssignment = initialState,
    action: GenericAction,
): IAssignment => reducingFunction<IAssignment>(actionReducers, state, action);
