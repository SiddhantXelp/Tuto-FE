import { spawn } from 'redux-saga/effects';



import { ClassesSaga } from './classes';






export function* rootSaga() {

    yield spawn(ClassesSaga);


    


}