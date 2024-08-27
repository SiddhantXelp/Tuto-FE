import * as actionTypes from '../actionTypes/user';

export const getUsersList = (token: string) => ({
  type: actionTypes.GET_USER_LIST,
  token,
});


export const setUsersList = (setUsers: any) => ({
  type: actionTypes.SET_USER_LIST,
  setUsers,
});





export const setUsersError = (error: any) => ({
  type: actionTypes.SET_USER_ERROR,
  error,
});

export const setUsersLoading = (loading: any) => ({
  type: actionTypes.SET_USER_LOADING,
  loading,
});

