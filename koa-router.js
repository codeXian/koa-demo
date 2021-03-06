const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({
  prefix: '/codexian'
});

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello codexian';
  })
  .get('/todo', (ctx, next) => {
    ctx.body = 'todo page';
  })

app
   .use(router.routes())
   .use(router.allowedMethods())      // 支持get请求

app.listen(3000, () => {
  console.log('server is running on 3000 port');
})