import { fork } from 'redux-saga/effects';
import global from 'common-saga/global';
import activity from './activity';

export default function* () {
  yield fork(global);
  yield fork(activity);
}
