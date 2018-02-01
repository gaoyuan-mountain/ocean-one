# ocean-one

## 安装依赖

yarn

## 预编译公共库

yarn dll

## 启动开发服务器

yarn start

## 启动mock server

yarn run start:mock

## 编译

yarn build

## 部署

- 在了解部署容器以后，可以添加postbuild的npm script，然后编写一个build.sh文件部署
- 也可以直接将http server的根路径指向/build

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

- 公共方法可以抽出到ocean-utils中。当这些方法需要在多个子项目中反复使用，就可以抽出到公共方法中。抽出之前需要在项目组内进行讨论确认。严格避免出现功能重复的公共抽象。
- 需要根据路由来渲染的组件，需要实现成独立的child app。
- 公共组件抽出到/src/components中。

## 关于按需加载

- 子项目需要按需加载。子项目中是否按路由加载，由子项目决定，不强制。

## 关于antd主题定制

- 系统已经支持antd的less变量覆盖，修改 /src/style/ant-default-vars.less 文件

## 关于公共组件与child app

- 二者都是为了实现代码复用
- 公共组件应该是不会自己去加载外部数据的，所有数据通过props传入
- child app可以有自己的数据加载逻辑和处理逻辑，并且按路由渲染到指定id的dom中

## 关于redux
- 在1.2版本中，调整了redux相关文件组织结构。去掉了原来了/reducer，/actions，/sagas。把他们集中在了/redux中，便于统一修改。


## 常见问题
### 如何在调用action时传入参数，比如callback
- 可以参考activity下/containers/SearchTable中对于activityAction.list的调用。

### 架构里用到了redux-actions，如何使用
- 参考 https://www.gitbook.com/book/vinnymac/redux-actions

### ocean-utils都提供了哪些工具
- configStore(env)(initialState, rootReducer, rootSaga)  生成store，env要求development/production
- fetch  暴露出axios
- helper/actionGenerator  生成actionType对象
- helper/createSaga  生成saga
- message  简单的事件队列，多用于child app之间通讯
- message/MsgRegister  注册事件
- message/MsgUnregister  取消注册
- message/MsgTrigger  触发事件

