import * as actionTypes from '../actionTypes/classes';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface IClasses {
  setClasses: any;
  setClassesError: any;
  setClassesLoading: any;
  createclass: any;
  getstudentgroup: any;
  addStudentGroup: any;
  getClassesWithStudentDetails: any;
  ClassById: any
}

const initialState: IClasses = {
  setClasses: null,
  setClassesError: null,
  setClassesLoading: null,
  createclass: null,
  getstudentgroup: null,
  ClassById: null,
  addStudentGroup: null,
  getClassesWithStudentDetails: null
};

const setClasses = ({ setClasses }: { setClasses: any }, state: IClasses) => ({
  ...state,
  setClasses,
});


const setCreateClasses = ({ createclass }: { createclass: any }, state: IClasses) => ({
  ...state,
  createclass,
});


const setStudentGroup = ({ getstudentgroup }: { getstudentgroup: any }, state: IClasses) => ({
  ...state,
  getstudentgroup,
});


const setClassById = ({ ClassById }: { ClassById: any }, state: IClasses) => ({
  ...state,
  ClassById,
});


const setClassesError = (
  { setClassesError }: { setClassesError: any },
  state: IClasses,
) => ({
  ...state,
  setClassesError,
});

const setClassesLoading = (
  { setClassesLoading }: { setClassesLoading: any },
  state: IClasses,
) => ({
  ...state,
  setClassesLoading,
});


const setAddStudentGroup = ({ addStudentGroup }: { addStudentGroup: any }, state: IClasses) => ({
  ...state,
  addStudentGroup,
});


const setClassesWithStudent = ({ getClassesWithStudentDetails }: { getClassesWithStudentDetails: any }, state: IClasses) => ({
  ...state,
  getClassesWithStudentDetails,
});



export const actionReducers = {
  [actionTypes.SET_CLASSES]: setClasses,
  [actionTypes.SET_CLASSES_ERROR]: setClassesError,
  [actionTypes.SET_CLASSES_LOADING]: setClassesLoading,
  [actionTypes.SET_CREATE_CLASS]: setCreateClasses,
  [actionTypes.SET_STUDENT_GROUP]: setStudentGroup,
  [actionTypes.SET_CLASSES_ID]: setClassById,
  [actionTypes.SET_STUDENT_GROUP_ADD]: setAddStudentGroup,
  [actionTypes.SET_CLASSES_WITH_STUDENT]: setClassesWithStudent,


};

export const ClassesReducer = (
  state: IClasses = initialState,
  action: GenericAction,
): IClasses => reducingFunction<IClasses>(actionReducers, state, action);
