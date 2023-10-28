<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<template>
  <header>
    <div class="bg-black text-[#ffffff] h-16 w-full flex items-center justify-between">
      <div class="h-10 flex flex-row">
        <div class="text-2xl font-bold text-[#ffffff] ml-20 flex items-center">AI模型评估</div>
        <div class="ml-20 text-base flex items-center">
          <div class="cursor-pointer" @click="router.push('/')">总览</div>
          <div class="ml-10 cursor-pointer" @click="router.push('/model')">模型</div>
          <div class="ml-10 cursor-pointer" @click="router.push('/evaluate')">在线评测</div>
          <div class="ml-10 cursor-pointer" @click="router.push('/dataSet')">验证集</div>
          <div class="ml-10 cursor-pointer" @click="router.push('/dataSetList')">数据review</div>
          <div class="ml-10 cursor-pointer" @click="router.push('/dataRoom')">数据车间</div>
        </div>
      </div>
      <div class="h-10 flex flex-row mr-20 items-center">
        <el-button class="ml-4" type="primary">登录</el-button>
        <el-button class="ml-4">注册</el-button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
