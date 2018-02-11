import { fork } from 'redux-saga/effects';
import { activitySaga } from './activity';
import { authSaga } from './auth';

export default function *() {
  yield fork(activitySaga);
  yield fork(authSaga);
}
