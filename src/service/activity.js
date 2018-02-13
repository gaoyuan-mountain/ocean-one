import { fetch } from 'ocean-utils';
import { ACTIVITY_LIST } from '../constant/api';

const activityService = {
  list() {
    return fetch.get(ACTIVITY_LIST);
  }
};

export default activityService;
