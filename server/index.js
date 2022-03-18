const WebSocket = require('ws')

;((Ws) => {
  const server = new Ws.Server({ port: 8000 })
  const init = () => {
    bindEvent()
  }
  function bindEvent() {
    server.on('open', handleOpen)
    server.on('close', handleClose)
    server.on('error', handleError)
    server.on('connection', handleConnection)
  }

  function handleOpen() {
    console.log('WebSocket server open')
  }
  function handleClose(e) {
    console.log('WebSocket server close')
  }
  function handleError(e) {
    console.log('WebSocket server error')
  }
  function handleConnection(ws) {
    console.log('WebSocket server connection')
    ws.on('message', handleMessage)
  }
  function handleMessage(msg) {
    server.clients.forEach((c) => {
      c.send(msg.toString())
    })
  }
  init()
})(WebSocket)
