//封装webSocket
import { WS_ADDRESS } from '../configs'

let interval_timer = null //计时器
let timer_count = 0
let ws

function useWebSocket(handleMessage) {
  if (!isOnlineCurrUser() && ws) {
    ws = null
    // 开启定时器
    init_start_timer()
    return useWebSocket()
  }
  //TODO ws 不存在
  ws = new WebSocket(WS_ADDRESS)
  // 开启定时器
  init_start_timer()
  return useWebSocketInit(handleMessage)
}

function useWebSocketInit(handleMessage) {
  const init = () => {
    bindEvent()
  }
  function bindEvent() {
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }

  function handleOpen(e) {
    console.log('WebSocket open', e)
  }
  function handleClose(e) {
    console.log('WebSocket close', e)
  }
  function handleError(e) {
    console.log('WebSocket error', e)
  }
  init()

  return ws
}

function init_start_timer() {
  //重置计数器
  timer_count = 0
  if (interval_timer != null) {
    clearInterval(interval_timer)
    interval_timer = null
  }
  interval_timer = setInterval(function () {
    myTimer()
  }, 300)
}

/**
 *定时器具体实现方法
 */
function myTimer() {
  //TODO 如果超过半小时没有交互，则关闭计时器
  if (timer_count >= 1800) {
    clearInterval(interval_timer)
  } else {
    timer_count += 30
    var online = '{"type":"timer"}'
    ws.send(online)
    console.log('timer_count', timer_count)
  }
}
/**
 * 判断当前用户是否 还在线
 */
function isOnlineCurrUser() {
  if (ws) {
    if (ws.readyState == WebSocket.OPEN) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export { useWebSocket }
