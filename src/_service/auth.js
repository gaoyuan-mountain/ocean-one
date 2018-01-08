import Fetch from '../_utils/fetch';
import { PROFILE } from '../_constant/api';

const authService = {
  profile() {
    return Fetch.get(PROFILE);
  }
}

export default authService;
