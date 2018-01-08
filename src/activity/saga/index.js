import { fork } from 'redux-saga/effects';
import global from '../../_saga/global';
import activity from './activity';

export default function* () {
  yield fork(global);
  yield fork(activity);
}
