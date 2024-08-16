import * as actionTypes from '../actionTypes/user';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface IStudents {
  setStudents: any;
  setStudentsError: any;
  setStudentsLoading: any;

}

const initialState: IStudents = {
  setStudents: null,
  setStudentsError: null,
  setStudentsLoading: null,

};

const setStudents = ({ setStudents }: { setStudents: any }, state: IStudents) => ({
  ...state,
  setStudents,
});


const setStudentsError = (
  { setStudentsError }: { setStudentsError: any },
  state: IStudents,
) => ({
  ...state,
  setStudentsError,
});

const setStudentsLoading = (
  { setStudentsLoading }: { setStudentsLoading: any },
  state: IStudents,
) => ({
  ...state,
  setStudentsLoading,
});

// const getClasses = ({getClasses}: {getClasses: any}, state: IClasses) => ({
//   ...state,
//   getClasses,
// });

export const actionReducers = {
  [actionTypes.SET_STUDENTS]: setStudents,
  [actionTypes.SET_STUDENTS_ERROR]: setStudentsError,
  [actionTypes.SET_STUDENTS_LOADING]: setStudentsLoading,

  // [actionTypes.GET_Classes]: getClasses,
};

export const studentsReducer = (
  state: IStudents = initialState,
  action: GenericAction,
): IStudents => reducingFunction<IStudents>(actionReducers, state, action);
