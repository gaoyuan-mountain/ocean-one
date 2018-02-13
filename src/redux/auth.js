import { fork } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import { PROFILE, LOGIN } from '../constant/actionType';
import { sagaHelper, reducerHelper } from 'ocean-utils';
import authService from '../service/auth';
import store from '../store';


// ACTION
export const authAction = {
  profile: createAction(PROFILE.ACTION),
  login: createAction(LOGIN.ACTION),
};

// SAGA
const profile = sagaHelper.createSaga([{
  promise: authService.profile,
  payload: payload => ({profile: payload}),
}], PROFILE);

const login = sagaHelper.createSaga([{
  promise: authService.login,
  payload: payload => payload,
}], LOGIN);

export function *authSaga() {
  yield fork(profile);
  yield fork(login);
}

sagaHelper.injectSagas({ authSaga });

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

reducerHelper.injectReducer(store, {
  key: 'auth',
  reducer: authReducer,
});
