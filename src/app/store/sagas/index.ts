import { spawn } from 'redux-saga/effects';



import { ClassesSaga } from './classes';
import { AuthSaga } from "./auth"





export function* rootSaga() {

    yield spawn(ClassesSaga);
    yield spawn(AuthSaga);

}