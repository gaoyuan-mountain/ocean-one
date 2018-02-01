const prefix = (path) => `/api/${path}`;

// 获取vip用户列表
export const VIP_LIST = prefix('vip/list');

// 获取当前用户的信息
export const PROFILE = prefix('profile');

// 登录
export const SIGN_IN = prefix('signin');
