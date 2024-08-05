

import { combineReducers } from 'redux';
import { ClassesReducer } from './classes';
import { AuthReducer } from "./auth";





export const rootReducer = combineReducers({
  classes: ClassesReducer,
  auth: AuthReducer

});

export type RootState = ReturnType<typeof rootReducer>;

