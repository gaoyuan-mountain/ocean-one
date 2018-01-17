import { registerApplication, start } from 'single-spa';
import 'babel-polyfill';

function hashPrefix(prefix) {
  return (location) => {
    return location.hash.indexOf(`#${prefix}`) === 0;
  };
}

// TIPS: 这里用到了import()，是ecmascript stage3定义的方法，作用是动态import，返回promise。配合babel的话，需要babel-plugin-syntax-dynamic-import
// TIPS: declareChildApplication支持两种写法，当两个参数时，参数1代表appName，参数2代表生效路由前缀，加载器会默认使用import()。三个参数时，参数1代表appName，参数2代表加载器，参数3代表生效路由前缀
registerApplication('navbar', () => import(/* webpackChunkName: "navbar" */ './navbar/navbar.ocean.js'), () => true);
registerApplication('activity', () => import(/* webpackChunkName: "activity" */'./activity/activity.ocean.js'), hashPrefix('/activity'));
registerApplication('vip', () => import(/* webpackChunkName: "vip" */ './vip/vip.ocean.js'), hashPrefix('/vip'));

start();
