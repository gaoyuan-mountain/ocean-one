import { createReducer } from '../../_utils/helper';
import { ACTIVITY_LIST } from '../constant/actionType';

export const initialState = {
  list: [],
};

export default {
  activity: createReducer(initialState, {
    [ACTIVITY_LIST.SUCCESS](state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },
  })
};
