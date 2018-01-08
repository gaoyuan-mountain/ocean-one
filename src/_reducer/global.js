import { createReducer } from '../_utils/helper';
import { PROFILE } from '../_constant/actionType';

export const initialState = {
  profile: {},
  profileReady: false,
};

export default {
  global: createReducer(initialState, {
    [PROFILE.SUCCESS](state, action) {
      return {
        ...state,
        profile: {
          ...action.payload.profile,
        },
        profileReady: true,
      };
    },
  })
};
