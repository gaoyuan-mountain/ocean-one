import Fetch from '../utils/fetch';
import { PROFILE, SIGN_IN } from '../constant/api';

const authService = {
  profile() {
    return Fetch.get(PROFILE);
  },
  signin(username, password) {
    return Fetch.post(SIGN_IN, {
      username,
      password,
    });
  }
};

export default authService;
