import { spawn } from 'redux-saga/effects';



import { ClassesSaga } from './classes';
import { AuthSaga } from "./auth"
import { StudentSaga } from "./student"
import { AssignmentSaga } from "./assignment"
import { UsersSaga } from "./user"






export function* rootSaga() {

    yield spawn(ClassesSaga);
    yield spawn(AuthSaga);
    yield spawn(StudentSaga);
    yield spawn(AssignmentSaga);
    yield spawn(UsersSaga);



}