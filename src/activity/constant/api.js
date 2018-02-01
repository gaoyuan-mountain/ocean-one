const prefix = (path) => `/api/${path}`;

// 获取活动列表
export const ACTIVITY_LIST = prefix('activity/list');

// 获取当前用户的信息
export const PROFILE = prefix('profile');

// 登录
export const SIGN_IN = prefix('signin');
