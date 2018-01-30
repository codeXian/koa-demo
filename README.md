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

## koa post 请求(原生版本)

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // 显示表单页面
    let html = `
      <h1>codeXian koa2 request POST</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName"/><br />
        <p>age</p>
        <input name="age"/><br />
        <p>website</p>
        <input name="website"/><br />
        <button type="submit">submit</button>
      </form>
    `;
    ctx.body = html;
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = await parsePostData(ctx);
    ctx.body = postData;
  } else {
    ctx.body = '<h1>404!</h1>'
  }
});

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener("data", data => {
        postdata += data;
      })
      ctx.req.on('end',() => {
        let parseData = parseQueryStr(postdata);
        resolve(parseData);
      })
    } catch (error) {
      reject(error);
    }
  })
}

function parseQueryStr(queryStr) {
  let queryData = {};
  let queryStrList = queryStr.split('&');
  for (let [index, queryStr] of queryStrList.entries()) {
    console.log(index, queryStr)
    let itemList = queryStr.split('=');
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }

  return queryData;
}

app.listen(3000, () => {
  console.log('server is on port 3000');
})
```

## koa 原生路由

```javascript
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

function render(page) {
  return new Promise((resolve, reject) => {
    let pageUrl = `./page/${page}`;
    fs.readFile(pageUrl, 'binary', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

async function route(url) {
  let page = '404.html';
  switch (url) {
    case '/':
      page = 'index.html';
      break;
    case '/index':
      page = 'index.html';
      break;
    case '/todo':
      page = 'todo.html';
      break;
    case '/404':
      page = '404.html';
      break;
    default:
      break;
  }

  let html = await render(page);

  return html;
}

app.use(async(ctx) => {
  let url = ctx.request.url;
  let html = await route(url);
  ctx.body = html;
})

app.listen(3000, () => console.log('demo is server on 3000 port'));
```

## koa-router

```javascript
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

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
```

## koa 父子路由

```javascript
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
```

## koa-cookie

```javascript
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
```

## ejs 模板渲染

```javascript
const Koa = require('koa');
const views = require('koa-views');
const path = require('path');

const app = new Koa();

app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

app.use(async(ctx) => {
  let title = 'hello koa2';
  await ctx.render('index', {
    title
  })
})

app.listen(3000, () => {
  console.log('server is starting at port 3000');
})
```

## koa-static

```javascript
const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

const staticPath = './static';

app.use(static(path.join(__dirname, staticPath)));

app.use(async (ctx) => {
  ctx.body = 'hello world';
})

app.listen(3000, () => {
  console.log('demo is server on port 3000');
})
```