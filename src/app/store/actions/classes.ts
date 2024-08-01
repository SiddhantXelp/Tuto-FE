import * as actionTypes from '../actionTypes/classes';

export const setClasses = (setClasses: any) => ({
  type: actionTypes.SET_CLASSES,
  setClasses,
});

export const setClassesError = (setClassesError: any) => ({
  type: actionTypes.SET_CLASSES_ERROR,
  setClassesError,
});

export const setClassesLoading = (setClassesLoading: any) => ({
  type: actionTypes.SET_CLASSES_LOADING,
  setClassesLoading,
});

export const getClasses = (token: string) => ({
  type: actionTypes.GET_CLASSES,
  token,
});
