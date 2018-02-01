import { fetch } from 'ocean-utils';
import { VIP_LIST } from '../constant/api';

const vipService = {
  list() {
    return fetch.get(VIP_LIST);
  }
};

export default vipService;
