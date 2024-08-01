

import {combineReducers} from 'redux';
import { ClassesReducer } from './classes';




export const rootReducer = combineReducers({

  classes: ClassesReducer,

});

export type RootState = ReturnType<typeof rootReducer>;

