import Fetch from '../../_utils/fetch';
import { VIP_LIST } from '../constant/api';

const vipService = {
  list() {
    return Fetch.get(VIP_LIST);
  }
};

export default vipService;
