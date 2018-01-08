/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const chalk = require('chalk');
const Mock = require('mockjs');
const path = require('path');

const app = new Koa();
const router = new Router();

app.use(compress());
app.use(bodyParser());

app.use(
  router
    .all('*', async ctx => {
      try {
        const mockTemplate = await fs.readFileSync(
          path.resolve(`./mock/mock-data${ctx.originalUrl}`),
          'utf8'
        );
        ctx.body = {
          code: 0,
          data: Mock.mock(JSON.parse(mockTemplate))
        };
      } catch (err) {
        console.error(err);
        ctx.body = {
          code: 404,
          msg: "mock api doesn't exists"
        };
      }
    })
    .routes()
);

const startMockServer = (port, callback) => {
  app.listen(port, '0.0.0.0', err => {
    if (err) {
      console.error('err');
    }
    console.info('\n===============================================');
    console.info(chalk.green(`==> Mock server is started on port ${port}`));
    console.info('===============================================\n');
    if (callback) {
      callback();
    }
  });
};

startMockServer(7001);
