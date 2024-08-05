import * as actionTypes from '../actionTypes/classes';

export const getClasses = (token: string) => ({
  type: actionTypes.GET_CLASSES,
  token,
});


export const setClasses = (setClasses: any) => ({
  type: actionTypes.SET_CLASSES,
  setClasses,
});




export const getCreateclass = (token: string, data: any) => ({
  type: actionTypes.GET_CREATE_CLASS,
  token,
  data
});


export const setCreateClasses = (createclass: any) => ({
  type: actionTypes.SET_CREATE_CLASS,
  createclass,
});







export const getStudentGroup = (token: string) => ({
  type: actionTypes.GET_STUDENT_GROUP,
  token
});


export const setStudentGroup = (getstudentgroup: any) => ({
  type: actionTypes.SET_STUDENT_GROUP,
  getstudentgroup,
});









export const setClassesError = (setClassesError: any) => ({
  type: actionTypes.SET_CLASSES_ERROR,
  setClassesError,
});

export const setClassesLoading = (setClassesLoading: any) => ({
  type: actionTypes.SET_CLASSES_LOADING,
  setClassesLoading,
});

