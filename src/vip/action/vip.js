import { VIP_LIST } from '../constant/actionType';

export function list() {
  return {
    type: VIP_LIST.ACTION,
    payload: {},
  };
}
