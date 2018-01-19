import configStore from 'common-store';
import reducer from '../reducer';
import saga from '../saga';

export default configStore({}, reducer, saga);
