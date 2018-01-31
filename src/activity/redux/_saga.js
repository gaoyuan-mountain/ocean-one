import { fork } from 'redux-saga/effects';
import { activitySaga } from './activity';

export default function* () {
  yield fork(activitySaga);
}
