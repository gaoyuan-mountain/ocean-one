import { fork } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import { VIP_LIST } from '../constant/actionType';
import { helper } from 'ocean-utils';
import vipService from '../service/vip';

const { createSaga } = helper;

// ACTION
export const vipAction = {
  list: createAction(VIP_LIST.ACTION),
};

// SAGA
const list = createSaga([{
  promise: vipService.list,
  payload: (payload) => ({ list: payload.list }),
}], VIP_LIST);

export function* vipSaga() {
  yield fork(list);
}

// REDUCER
const initialState = {
  list: [],
};

export const vipReducer = handleActions({
  [VIP_LIST.SUCCESS]: (state, action) => ({
    ...state,
    list: action.payload.list,
  })
}, initialState);
