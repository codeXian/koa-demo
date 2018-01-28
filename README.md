# koa-demo

👽 koa-demo-start

## 开始安装koa2

```bash
npm init -y
npm install --save koa2
```

## Hello koa

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
  ctx.body = 'Hello codeXian';
})

app.listen(3000);
console.log('app is starting at port 3000');
```

```bash
# 启动koa服务器
node index.js
```

## koa get请求

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {             // ctx 指上下文
  let url = ctx.url;                // 得到请求地址
  let request = ctx.request;        // 从request接收
  let req_query = request.query;
  let req_querystring = request.querystring;
  let ctx_query = ctx.query;        // 从ctx上下文中接收
  let ctx_querystring = ctx.querystring;

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }
})

app.listen(3000, () => {
  console.log('server is starting at port 3000');
})
```