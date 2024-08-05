

import { combineReducers } from 'redux';
import { ClassesReducer } from './classes';
import { AuthReducer } from "./auth";
import { StudentReducer } from "./student"




export const rootReducer = combineReducers({
  classes: ClassesReducer,
  auth: AuthReducer,
  student: StudentReducer

});

export type RootState = ReturnType<typeof rootReducer>;

