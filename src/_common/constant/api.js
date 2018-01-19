const prefix = (path) => `/api/${path}`;

// 获取当前用户的信息
export const PROFILE = prefix('profile');

// 登录
export const SIGN_IN = prefix('signin');
