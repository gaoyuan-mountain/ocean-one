### 安装依赖
yarn

### 启动开发服务器
yarn start

### 启动mock server
yarn run start:mock

### 编译
yarn build

### 访问地址
http://localhost:8080

### 支持特性

- 支持子项目概念，子项目按需加载，子项目内部按路由加载
- react16、react-router4、redux、saga
- 子项目可以通过很小的修改变为独立可运行项目
- 支持hmr
- 支持异构，目前只引入了react的loader，也可支持angular等架构，可以参考 https://github.com/CanopyTax/single-spa
- 支持mockjs语法，独立运行mock server
