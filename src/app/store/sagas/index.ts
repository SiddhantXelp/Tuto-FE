import { spawn } from 'redux-saga/effects';



import { ClassesSaga } from './classes';
import { AuthSaga } from "./auth"
import { StudentsSaga } from './students';





export function* rootSaga() {

    yield spawn(ClassesSaga);
    yield spawn(AuthSaga);
    yield spawn(StudentsSaga);

}