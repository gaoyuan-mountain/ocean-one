import { fork } from 'redux-saga/effects';
import global from 'common-saga/global';
import vip from './vip';

export default function* () {
  yield fork(global);
  yield fork(vip);
}
