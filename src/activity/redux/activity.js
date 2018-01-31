import { fork } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

import { ACTIVITY_LIST } from '../constant/actionType';
import activityService from '../service/activity';
import { createSaga } from 'common-utils/helper';

// ACTION
export const activityAction = {
  profileAction: createAction(ACTIVITY_LIST.ACTION),
};

// SAGA
const list = createSaga([{
  promise: activityService.list,
  payload: (payload) => ({ list: payload.list }),
}], ACTIVITY_LIST);

export function* activitySaga() {
  yield fork(list);
}

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
