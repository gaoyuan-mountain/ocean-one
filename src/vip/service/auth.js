import { fetch } from 'ocean-utils';
import { PROFILE, LOGIN } from '../constant/api';

const authService = {
  profile() {
    return fetch.get(PROFILE);
  },
  login(username, password) {
    return fetch.post(LOGIN, {
      username,
      password,
    });
  }
};

export default authService;
