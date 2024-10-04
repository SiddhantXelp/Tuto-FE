import * as actionTypes from '../actionTypes/user';

export const getUsersList = (token: string) => ({
  type: actionTypes.GET_USER_LIST,
  token,
});


export const setUsersList = (setUsers: any) => ({
  type: actionTypes.SET_USER_LIST,
  setUsers,
});



export const getOnBoardTutor = (token: string, data: any, id: string) => ({
  type: actionTypes.GET_ON_BOARD_TUTOR,
  token,
  data,
  id
});


export const setOnBoardTutor = (setOnBoardTutor: any) => ({
  type: actionTypes.SET_ON_BOARD_TUTOR,
  setOnBoardTutor,
});


export const getTutorSubjects = (token: string, id: string) => ({
  type: actionTypes.GET_TUTOR_SUBJECTS,
  token,
  id
});


export const setTutorSubjects = (setTutorSubjects: any) => ({
  type: actionTypes.SET_TUTOR_SUBJECTS,
  setTutorSubjects,
});




export const setUsersError = (error: any) => ({
  type: actionTypes.SET_USER_ERROR,
  error,
});

export const setUsersLoading = (loading: any) => ({
  type: actionTypes.SET_USER_LOADING,
  loading,
});

