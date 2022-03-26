<template>
  <div>
    <h1>测试页面啊</h1>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave((to, from, next) => {
  console.log(to)
  console.log(from)
  console.log("8888888")
  setTimeout(() => {
    next()
  }, 1000)
})
</script>
