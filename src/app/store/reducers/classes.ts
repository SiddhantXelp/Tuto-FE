import * as actionTypes from '../actionTypes/classes';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface IClasses {
  setClasses: any;
  setClassesError: any;
  setClassesLoading: any;
  createclass: any;
  getstudentgroup: any;
  ClassById: any
}

const initialState: IClasses = {
  setClasses: null,
  setClassesError: null,
  setClassesLoading: null,
  createclass: null,
  getstudentgroup: null,
  ClassById: null
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

// const getClasses = ({getClasses}: {getClasses: any}, state: IClasses) => ({
//   ...state,
//   getClasses,
// });

export const actionReducers = {
  [actionTypes.SET_CLASSES]: setClasses,
  [actionTypes.SET_CLASSES_ERROR]: setClassesError,
  [actionTypes.SET_CLASSES_LOADING]: setClassesLoading,
  [actionTypes.SET_CREATE_CLASS]: setCreateClasses,
  [actionTypes.SET_STUDENT_GROUP]: setStudentGroup,
  [actionTypes.SET_CLASSES_ID]: setClassById,
};

export const ClassesReducer = (
  state: IClasses = initialState,
  action: GenericAction,
): IClasses => reducingFunction<IClasses>(actionReducers, state, action);
