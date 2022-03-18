<template>
  <div>
    <ul style="height: 600px; overflow: auto; border: 1px solid red">
      <li v-for="item in obj.msgList" :key="item.id">
        <p>
          <span style="margin-right: 30px">{{ item.user }}</span>
          <span>{{ new Date(item.dateTime) }}</span>
        </p>
        <p>消息：{{ item.msg }}</p>
      </li>
    </ul>
    <input type="text" placeholder="请输入消息" v-model="msg" />
    <button @click="handleSendBtnClick">发送</button>
  </div>
</template>

<script setup>
import { useWebSocket } from '../hooks'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const msg = ref('')
let username = ''
const router = useRouter()

onMounted(() => {
  username = localStorage.getItem('username')
  if (!username) {
    router.push('/login')
  }
})
const obj = reactive({ msgList: [] })
const handleMessage = (e) => {
  obj.msgList.push(JSON.parse(e.data))
  // console.log(e.data)
}
const ws = useWebSocket(handleMessage)

const handleSendBtnClick = () => {
  if (!msg.value.trim().length) {
    return
  }

  ws.send(
    JSON.stringify({
      id: new Date().getTime(),
      dateTime: new Date().getTime(),
      user: username,
      msg: msg.value,
    })
    // JSON.stringify({
    //   cmd: 2,
    //   userId: 2,
    //   chatId: 1,
    //   message:{ name: 'wlpwlp' },
    //   createTime: new Date().getTime(),
    // })
  )

  msg.value = ''
}
</script>
