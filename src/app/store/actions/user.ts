import * as actionTypes from '../actionTypes/user';

export const getStudents = (token: string) => ({
  type: actionTypes.GET_STUDENTS,
  token,
});


export const setStudents = (setStudents: any) => ({
  type: actionTypes.SET_STUDENTS,
  setStudents,
});





export const setStudentsError = (setStudentsError: any) => ({
  type: actionTypes.SET_STUDENTS_ERROR,
  setStudentsError,
});

export const setStudentsLoading = (setStudentsLoading: any) => ({
  type: actionTypes.SET_STUDENTS_LOADING,
  setStudentsLoading,
});

