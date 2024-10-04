import * as actionTypes from '../actionTypes/user';
import { GenericAction, reducingFunction } from '../helpers/createReducer';

export interface IStudents {
  setUsers: any;
  setOnBoardTutor: any;
  setTutorSubjects: any;
  error: any;
  loading: any;

}

const initialState: IStudents = {
  setUsers: null,
  setOnBoardTutor: null,
  setTutorSubjects: null,
  error: null,
  loading: null,

};

const setUserList = ({ setUsers }: { setUsers: any }, state: IStudents) => ({
  ...state,
  setUsers,
});

const setOnBoardTutor = ({ setOnBoardTutor }: { setOnBoardTutor: any }, state: IStudents) => ({
  ...state,
  setOnBoardTutor,
});

const setTutorSubjects = ({ setTutorSubjects }: { setTutorSubjects: any }, state: IStudents) => ({
  ...state,
  setTutorSubjects,
});


const setUsersError = (
  { error }: { error: any },
  state: IStudents,
) => ({
  ...state,
  error,
});

const setUsersLoading = (
  { loading }: { loading: any },
  state: IStudents,
) => ({
  ...state,
  loading,
});


export const actionReducers = {
  [actionTypes.SET_USER_LIST]: setUserList,
  [actionTypes.SET_ON_BOARD_TUTOR]: setOnBoardTutor,
  [actionTypes.SET_TUTOR_SUBJECTS]: setTutorSubjects,

  [actionTypes.SET_USER_ERROR]: setUsersError,
  [actionTypes.SET_USER_LOADING]: setUsersLoading
};

export const usersReducer = (
  state: IStudents = initialState,
  action: GenericAction,
): IStudents => reducingFunction<IStudents>(actionReducers, state, action);
