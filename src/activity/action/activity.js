import { ACTIVITY_LIST } from '../constant/actionType';

export function list() {
  return {
    type: ACTIVITY_LIST.ACTION,
    payload: {},
  };
}
