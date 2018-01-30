const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
  if (ctx.url === '/index') {
    if (ctx.cookies.get('MyName')) {
      ctx.body = ctx.cookies.get('MyName')
    } else {
      ctx.body = 'Cookie is ok';
    }

    ctx.cookies.set(
      'MyName', 'codexian2', {
        domain: 'localhost',                // 写cookie所在的域名
        path: '/index',                     // 写cookie所在的路径
        maxAge: 1000 * 60 * 60 * 24,        // cookie有效时长
        expires: new Date('2018-12-31'),    // cookie失效时间
        httpOnly: false,                    // 是否只用于http请求中获取
        overwrite: false                    // 是否允许重写
      }
    )
  } else {
    ctx.body = 'hello codexian';
  }
})

app.listen(3000, () => {
  console.log('server is on 3000 port');
})