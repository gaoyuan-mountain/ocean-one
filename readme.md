# ocean-one

## 安装依赖

yarn

## 启动开发服务器

yarn start

## 启动mock server

yarn run start:mock

## 编译

yarn build

## 访问地址

<http://localhost:8080>

## 支持特性

- 支持子项目概念，子项目按需加载，子项目内部按路由加载
- react16、react-router4、redux、saga
- 子项目可以通过很小的修改变为独立可运行项目
- 支持hmr
- 支持异构，目前只引入了react的loader，也可支持angular等架构，可以参考 https://github.com/CanopyTax/single-spa
- 支持mockjs语法，独立运行mock server


## 关于redux的使用原则

- 如果数据需要在页面之间共享，需要通过redux数据流来维护
- 如果只是本页面使用的数据，直接使用service去取数据，维护在自身的state里就好
- 原则上不需要针对所有接口实现对应的action和reducer，优先实现service和api constant的定义，在数据需要维护在reducer中时再实现action、saga和reducer。

## 关于公用部分抽出的原则

- 公用部分分为公共组件和共用方法。
- 公共组件是独立的app，如navbar。独立实现并且在index.js中注册，通过生效路由逻辑来控制显示。
- 公用方法包括_action, _constant, _reducer, _saga, _service, _store, _util。当这些方法需要在多个子项目中反复使用，就可以抽出到公共方法中。抽出之前需要在项目组内进行讨论确认。严格避免出现功能重复的公共抽象。

## 关于按需加载

- 子项目需要按需加载。子项目中是否按路由加载，由子项目决定，不强制。