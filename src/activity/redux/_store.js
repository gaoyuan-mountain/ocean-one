import { configStore } from 'ocean-utils';
import reducer from './_reducer';
import saga from './_saga';

export default configStore(process.env.NODE_ENV)({}, reducer, saga);
