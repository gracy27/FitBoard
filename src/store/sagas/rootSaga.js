import { fork } from 'redux-saga/effects';
import { userSaga } from './userSaga';
import { photosSaga } from './photosSaga';
import { moodboardsSaga } from './moodboardsSaga';

export function* rootSaga() {
  yield fork(userSaga);
  yield fork(photosSaga);
  yield fork(moodboardsSaga);
}
