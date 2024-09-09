import * as actionTypes from '../actionTypes/assignment';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface IAssignment {
    setCreateAssignments: any;
    setAssignments: any;
    setAssignmentById: any;
    setCompletedAssignment: any;
    setStudentCreateAssignment: any;
    setStudentAssignments: any;
    error: any;
    loading: any;

}
const initialState: IAssignment = {
    setCreateAssignments: null,
    setAssignments: null,
    setAssignmentById: null,
    setCompletedAssignment: null,
    setStudentCreateAssignment: null,
    setStudentAssignments: null,
    error: null,
    loading: null,

};


const setCreateAssignment = ({ setCreateAssignments }: { setCreateAssignments: any }, state: IAssignment) => ({
    ...state,
    setCreateAssignments,
});


const setAssignment = ({ setAssignments }: { setAssignments: any }, state: IAssignment) => ({
    ...state,
    setAssignments,
});

const setAssignmentById = ({ setAssignmentById }: { setAssignmentById: any }, state: IAssignment) => ({
    ...state,
    setAssignmentById,
});

const setCompletedAssignment = ({ setCompletedAssignment }: { setCompletedAssignment: any }, state: IAssignment) => ({
    ...state,
    setCompletedAssignment,
});

const setStudentCreateAssignment = ({ setStudentCreateAssignment }: { setStudentCreateAssignment: any }, state: IAssignment) => ({
    ...state,
    setStudentCreateAssignment,
});


const setStudentAssignment = ({ setStudentAssignments }: { setStudentAssignments: any }, state: IAssignment) => ({
    ...state,
    setStudentAssignments,
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

    [actionTypes.SET_ASSIGNMENT_ERROR]: setAssignmentError,
    [actionTypes.SET_ASSIGNMENT_LOADING]: setAssignmentLoading,
    [actionTypes.SET_CREATE_ASSIGNMENT]: setCreateAssignment,
    [actionTypes.SET_ASSIGNMENTS]: setAssignment,
    [actionTypes.SET_ASSIGNMENT_BY_ID]: setAssignmentById,
    [actionTypes.SET_COMPLETED_ASSIGNMENT]: setCompletedAssignment,
    [actionTypes.SET_CREATE_STUDENT_ASSIGNMENT]: setStudentCreateAssignment,
    [actionTypes.SET_STUDENT_ASSIGNMENTS]: setStudentAssignment






};

export const AssignmentReducer = (
    state: IAssignment = initialState,
    action: GenericAction,
): IAssignment => reducingFunction<IAssignment>(actionReducers, state, action);
