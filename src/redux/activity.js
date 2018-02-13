import { fork } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

import { ACTIVITY_LIST } from '../constant/actionType';
import activityService from '../service/activity';
import { sagaHelper, reducerHelper } from 'ocean-utils';
import store from '../store';

// ACTION
export const activityAction = {
  list: createAction(ACTIVITY_LIST.ACTION)
};

// SAGA
const list = sagaHelper.createSaga([{
  promise: activityService.list,
  payload: (payload) => ({ list: payload.list }),
}], ACTIVITY_LIST);

export function *activitySaga() {
  yield fork(list);
}

sagaHelper.injectSagas({ activitySaga });

// REDUCER
const initialState = {
  list: [],
};

export const activityReducer = handleActions({
  [ACTIVITY_LIST.SUCCESS]: (state, action) => ({
    ...state,
    list: action.payload.list,
  })
}, initialState);

reducerHelper.injectReducer(store, {
  key: 'activity',
  reducer: activityReducer,
});

