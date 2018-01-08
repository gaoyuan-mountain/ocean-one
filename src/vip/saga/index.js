import { fork } from 'redux-saga/effects';
import global from '../../_saga/global';
import vip from './vip';

export default function* () {
  yield fork(global);
  yield fork(vip);
}
