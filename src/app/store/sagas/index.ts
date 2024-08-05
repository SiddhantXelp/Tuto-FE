import { spawn } from 'redux-saga/effects';



import { ClassesSaga } from './classes';
import { AuthSaga } from "./auth"
import { StudentSaga } from "./student"




export function* rootSaga() {

    yield spawn(ClassesSaga);
    yield spawn(AuthSaga);
    yield spawn(StudentSaga);

}