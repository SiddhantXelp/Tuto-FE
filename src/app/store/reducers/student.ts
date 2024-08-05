import * as actionTypes from '../actionTypes/student';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface IStudent {
    createStudentPackage: any;
    error: any;
    loading: any;
}

const initialState: IStudent = {
    createStudentPackage: null,
    error: null,
    loading: null,
};

const setCreateStudentPackages = ({ createStudentPackage }: { createStudentPackage: any }, state: IStudent) => ({
    ...state,
    createStudentPackage,
});

const setStudentError = (
    { error }: { error: any },
    state: IStudent,
) => ({
    ...state,
    error,
});

const setStudentLoading = (
    { loading }: { loading: any },
    state: IStudent,
) => ({
    ...state,
    loading,
});

export const actionReducers = {
    [actionTypes.SET_CREATE_STUDENT_PACKAGES]: setCreateStudentPackages,
    [actionTypes.SET_STUDENT_ERROR]: setStudentError,
    [actionTypes.SET_STUDENT_LOADING]: setStudentLoading,
};

export const StudentReducer = (
    state: IStudent = initialState,
    action: GenericAction,
): IStudent => reducingFunction<IStudent>(actionReducers, state, action);
