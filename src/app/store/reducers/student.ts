import * as actionTypes from '../actionTypes/student';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface IStudent {
    createStudentPackage: any;
    getStudents: any;
    getStudentGroup: any;
    getCreateGroup: any;
    getValidateStudent: any;
    getOnboardStudent: any;
    error: any;
    loading: any;
}

const initialState: IStudent = {
    createStudentPackage: null,
    getStudents: null,
    getStudentGroup: null,
    getCreateGroup: null,
    getValidateStudent: null,
    getOnboardStudent: null,
    error: null,
    loading: null,
};

const setCreateStudentPackages = ({ createStudentPackage }: { createStudentPackage: any }, state: IStudent) => ({
    ...state,
    createStudentPackage,
});


const setGetStudents = ({ getStudents }: { getStudents: any }, state: IStudent) => ({
    ...state,
    getStudents,
});

const setGetStudentGroup = ({ getStudentGroup }: { getStudentGroup: any }, state: IStudent) => ({
    ...state,
    getStudentGroup,
});

const setCreateGroup = ({ getCreateGroup }: { getCreateGroup: any }, state: IStudent) => ({
    ...state,
    getCreateGroup,
});


const setValidateStudent = ({ getValidateStudent }: { getValidateStudent: any }, state: IStudent) => ({
    ...state,
    getValidateStudent,
});


const setOnboardStudent = ({ getOnboardStudent }: { getOnboardStudent: any }, state: IStudent) => ({
    ...state,
    getOnboardStudent,
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
    [actionTypes.SET_STUDENTS]: setGetStudents,
    [actionTypes.SET_STUDENTS_GROUP]: setGetStudentGroup,
    [actionTypes.SET_CREATE_GROUP]: setCreateGroup,
    [actionTypes.SET_VALIDATE_STUDENT]: setValidateStudent,
    [actionTypes.SET_ONBOARD_STUDENT]: setOnboardStudent,

    [actionTypes.SET_STUDENT_ERROR]: setStudentError,
    [actionTypes.SET_STUDENT_LOADING]: setStudentLoading,
};

export const StudentReducer = (
    state: IStudent = initialState,
    action: GenericAction,
): IStudent => reducingFunction<IStudent>(actionReducers, state, action);
