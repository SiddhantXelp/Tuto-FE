

import { combineReducers } from 'redux';
import { ClassesReducer } from './classes';
import { AuthReducer } from "./auth";
import { StudentReducer } from "./student";
import { AssignmentReducer } from "./assignment"
import { usersReducer } from "./user"





export const rootReducer = combineReducers({
  classes: ClassesReducer,
  auth: AuthReducer,
  student: StudentReducer,
  assignment: AssignmentReducer,
  user: usersReducer

});

export type RootState = ReturnType<typeof rootReducer>;

