import { fork } from 'redux-saga/effects';
import { vipSaga } from './vip';
import { authSaga } from './auth';

export default function* () {
  yield fork(vipSaga);
  yield fork(authSaga);
}
