import * as actionTypes from '../actionTypes/classes';
import {GenericAction, reducingFunction} from '../helpers/createReducer';

export interface IClasses {
  setClasses: any;
  setClassesError: any;
  setClassesLoading: any;
}

const initialState: IClasses = {
  setClasses: null,
  setClassesError: null,
  setClassesLoading: null,
};

const setClasses = ({setClasses}: {setClasses: any}, state: IClasses) => ({
  ...state,
  setClasses,
});

const setClassesError = (
  {setClassesError}: {setClassesError: any},
  state: IClasses,
) => ({
  ...state,
  setClassesError,
});

const setClassesLoading = (
  {setClassesLoading}: {setClassesLoading: any},
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
  // [actionTypes.GET_Classes]: getClasses,
};

export const ClassesReducer = (
  state: IClasses = initialState,
  action: GenericAction,
): IClasses => reducingFunction<IClasses>(actionReducers, state, action);
