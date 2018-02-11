import { fork } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import { PROFILE, LOGIN } from '../constant/actionType';
import { helper } from 'ocean-utils';
import authService from '../service/auth';

const { createSaga } = helper;

// ACTION
export const authAction = {
  profile: createAction(PROFILE.ACTION),
  login: createAction(LOGIN.ACTION),
};

// SAGA
const profile = createSaga([{
  promise: authService.profile,
  payload: payload => ({profile: payload}),
}], PROFILE);

const login = createSaga([{
  promise: authService.login,
  payload: payload => payload,
}], LOGIN);

export function *authSaga() {
  yield fork(profile);
  yield fork(login);
}

// REDUCER
const initialState = {
  profile: {},
  profileReady: false,
};

export const authReducer = handleActions({
  [PROFILE.SUCCESS]: (state, action) => ({
      ...state,
      profile: {
        ...action.payload.profile,
      },
      profileReady: true,
    })
}, initialState);
