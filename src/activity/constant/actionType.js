import { helper } from 'ocean-utils';

const { actionGenerator } = helper;

// 全局错误提示
export const ERROR = 'ERROR';

// 获取活动列表
export const ACTIVITY_LIST = actionGenerator('ACTIVITY_LIST');

// 获取当前用户信息
export const PROFILE = actionGenerator('PROFILE');

// 登陆
export const LOGIN = actionGenerator('LOGIN');
