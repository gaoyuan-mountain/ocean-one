import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import { VIP_LIST, ERROR } from '../constant/actionType';
import vipService from '../service/vip';

export function* list(action) {
  try {
    const [ vipList ] = yield all([
      call(vipService.list)
    ]);

    yield put({
      type: VIP_LIST.SUCCESS,
      payload: {
        list: vipList.list,
      },
    });

    if (action.payload.callback) {
      action.payload.callback();
    }
  } catch (error) {
    yield put({
      type: ERROR,
      payload: {
        error,
        message: '获取VIP用户列表失败',
      },
    });
  }
}

export function* watchList() {
  yield takeEvery(VIP_LIST.ACTION, list);
}

export default function* vip() {
  yield fork(watchList);
}
