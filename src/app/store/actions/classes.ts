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



export const getClassById = (token: string, id: any) => ({
  type: actionTypes.GET_CLASSES_ID,
  token,
  id
});


export const setClassById = (ClassById: any) => ({
  type: actionTypes.SET_CLASSES_ID,
  ClassById,
});






export const getStudentGroup = (token: string) => ({
  type: actionTypes.GET_STUDENT_GROUP,
  token
});


export const setStudentGroup = (getstudentgroup: any) => ({
  type: actionTypes.SET_STUDENT_GROUP,
  getstudentgroup,
});




export const getAddStudentGroup = (token: string, data: any) => ({
  type: actionTypes.GET_STUDENT_GROUP_ADD,
  token,
  data
});


export const setAddStudentGroup = (addStudentGroup: any) => ({
  type: actionTypes.SET_STUDENT_GROUP_ADD,
  addStudentGroup,
});


export const getClassesWithStudentDetails = (token: string, studentId: string, classId: string) => ({
  type: actionTypes.GET_CLASSES_WITH_STUDENT,
  token,
  studentId,
  classId
});


export const setClassesWithStudentDetails = (getClassesWithStudentDetails: any) => ({
  type: actionTypes.SET_CLASSES_WITH_STUDENT,
  getClassesWithStudentDetails,
});






export const setClassesError = (setClassesError: any) => ({
  type: actionTypes.SET_CLASSES_ERROR,
  setClassesError,
});

export const setClassesLoading = (setClassesLoading: any) => ({
  type: actionTypes.SET_CLASSES_LOADING,
  setClassesLoading,
});

