const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

let home = new Router();
home
  .get('/codexian', async(ctx) => {
    ctx.body = 'home codexian page';
  })
  .get('/todo', async(ctx) => {
    ctx.body = 'home todo page';
  })

let page = new Router();
page
  .get('/codexian', async(ctx) => {
    ctx.body = 'page codexian page';
  })
  .get('/todo', async(ctx) => {
    ctx.body = 'page todo page';
  })

// 父级路由
let router = new Router();

// 装载路由
router.use('/home', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

app
   .use(router.routes())
   .use(router.allowedMethods())      // 支持get请求

app.listen(3000, () => {
  console.log('server is running on 3000 port');
})