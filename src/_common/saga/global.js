import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import { PROFILE, ERROR } from '../constant/actionType';
import authService from '../service/auth';

export function* profile(action) {
  try {
    const [ _profile ] = yield all([
      call(authService.profile)
    ]);
    yield put({
      type: PROFILE.SUCCESS,
      payload: {
        profile: _profile,
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
        message: '获取用户信息失败',
      },
    });
  }
}

export function* watchProfile() {
  yield takeEvery(PROFILE.ACTION, profile);
}

export default function* global() {
  yield fork(watchProfile);
}
