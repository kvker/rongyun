# 点对单私聊

测试用户 root 与 test

对应 id 分别为 1 与 2

以上处于测试均写死

## 启动

npm i

node server.js

## 运行

http://localhost:8888

http://localhost:8888/test.html

分别对应 root 用户登录与 test 聊天

test 用户登录与 root 聊天

## 修改默认值

服务端代码都在 server.js 中, 没几行

index.html 与 test.html 62 行左右是 app_key

`RongIMLib.RongIMClient.init('0vnjpoad03jyz')`

130 行左右处

```js
let ret = await http.post('/api/token', {
  userId: '2',
  name: 'test',
  portraitUri: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg',
})
```

185 行左右处

'1' 与 '2' 对应用户 id

## 其他

前项目支持群聊等等, 这里做了删减, 如有需要我会补上的