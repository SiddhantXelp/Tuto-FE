

import { combineReducers } from 'redux';
import { ClassesReducer } from './classes';
import { AuthReducer } from "./auth";
import { studentsReducer } from './students';





export const rootReducer = combineReducers({
  classes: ClassesReducer,
  auth: AuthReducer,
  students: studentsReducer

});

export type RootState = ReturnType<typeof rootReducer>;

