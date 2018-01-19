import { createReducer } from 'common-utils/helper';
import { VIP_LIST } from '../constant/actionType';

export const initialState = {
  list: [],
};

export default {
  vip: createReducer(initialState, {
    [VIP_LIST.SUCCESS](state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },
  })
};
