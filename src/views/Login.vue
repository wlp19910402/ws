<template>
  <div>
    <input type="text" placeholder="用户名" v-model="username" />
    <button @click="handleEnterBtnClick">进入聊天室</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
let username = ref('')
const router = useRouter()
const handleEnterBtnClick = () => {
  let _username = username.value.trim()
  if (_username.length < 6) {
    alert('姓名不能低于6个长度')
    return
  }
  localStorage.setItem('username', _username)
  username.value = ''
  router.push('/home')
}

onMounted(() => {
  username.value = localStorage.getItem('username')
  if (username.value) {
    router.push('/home')
    return
  }
})
</script>
