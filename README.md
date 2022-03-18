# 前端

WebSocket -> 构造函数 -> new -> websocket

```
  open
  close
  error
  message
```

# 后端

Ws -> Server -> new 配置端口号

```
  open
  close
  error
  connection
      message //ws server -> clients
```

# 业务开发原则

视图 逻辑 -> 从外到里开发的流程

## 包依赖 原生的

ws
nodejs-websocket

## 便于开发工具

socket.io

# 启动服务

```
 cd ./server
 npm run dev 启动服务
```

# 启动 client 项目

```
cd ./
npm run serve
```
