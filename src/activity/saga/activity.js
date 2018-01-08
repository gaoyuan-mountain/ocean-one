import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import { ACTIVITY_LIST, ERROR } from '../constant/actionType';
import activityService from '../service/activity';

export function* list(action) {
  try {
    const [ activityList ] = yield all([
      call(activityService.list)
    ]);

    yield put({
      type: ACTIVITY_LIST.SUCCESS,
      payload: {
        list: activityList.list,
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
        message: '获取活动列表失败',
      },
    });
  }
}

export function* watchList() {
  yield takeEvery(ACTIVITY_LIST.ACTION, list);
}

export default function* activity() {
  yield fork(watchList);
}
