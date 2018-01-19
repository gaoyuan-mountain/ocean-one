import Fetch from 'common-utils/fetch';
import { ACTIVITY_LIST } from '../constant/api';

const activityService = {
  list() {
    return Fetch.get(ACTIVITY_LIST);
  }
};

export default activityService;
