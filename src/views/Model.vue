<script setup lang="ts">
import { ref } from "vue"
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import { useRouter } from "vue-router"

const router = useRouter()
const input = ref("")
const imgList = ref<any>(["图像识别", "语音识别", "自然语言处理", "推荐系统", "人脸识别"])
const activeName = ref("图像识别")
const img2List = ref<any>([
  "https://img.jsdesign2.com/assets/img/6455ebf47e26e5aacb2ab830.png#2310fb77ad1762404ab25101fd5ce24b",
  "https://img.jsdesign2.com/assets/img/6475a9536be6533b8a7441f0.png#ebade77ad960ea0306274202cbfdb640",
  "https://img.jsdesign2.com/assets/img/652ca2e6454393a7d697adb0.png#c349e97700e81fe55284332a6d77cd93",
])
</script>

<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <Header />
    <section class="flex-1 max-w-[1240px] w-full mx-auto my-5 px-5">
      <div class="flex justify-between h-60 items-center">
        <div class="text-4xl font-bold">AI模型点评页面</div>
        <div class="max-w-[620px]">
          <div>
            欢迎来到AI模型点评页面，这里提供全面的模型介绍、参数、相关产品以及用户评价，让你更好地了解和选择AI模型。
          </div>
          <div class="flex mt-8">
            <el-input v-model="input" size="large" placeholder="输入模型名称" />
            <el-button class="ml-4" size="large">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="flex justify-between h-30 items-center mt-40">
        <div class="text-4xl font-bold">AI模型列表</div>
      </div>
      <div class="flex justify-between items-start mt-10 mb-40">
        <div class="w-60">
          <div
            class="rounded-xl px-4 py-2 h-12 my-1 flex items-center cursor-pointer"
            :class="activeName == item && 'bg-black text-[#fff]'"
            v-for="item in imgList"
            @click="activeName = item"
          >
            {{ item }}
          </div>
        </div>
        <div class="flex-1 ml-10 grid grid-cols-3 gap-6">
          <div
            class="py-2 items-center cursor-pointer"
            @click="router.push('/modelDetail')"
            v-for="item in img2List"
          >
            <div class="rounded-xl overflow-hidden"><img :src="item" /></div>
            <div class="mt-3 font-bold">智能助手</div>
            <div class="mt-2 text-sm text-ellipsis whitespace-nowrap overflow-hidden">
              人工智能助手可以帮助您完成各种任务，提高工作效率
            </div>
            <div class="mt-2 text-sm flex">
              <img
                class="w-5 h-5 mr-2"
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/c55515821e36c495c64b891645a48b0039c951d6.png"
              />
              <img
                class="w-5 h-5 mr-2"
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/c55515821e36c495c64b891645a48b0039c951d6.png"
              />
              <img
                class="w-5 h-5 mr-2"
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/c55515821e36c495c64b891645a48b0039c951d6.png"
              />
              <img
                class="w-5 h-5 mr-2"
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/c55515821e36c495c64b891645a48b0039c951d6.png"
              />
              <div class="ml-4">4星</div>
            </div>
          </div>
          <div class="py-2 items-center cursor-pointer" v-for="item in img2List">
            <div class="rounded-xl overflow-hidden"><img :src="item" /></div>
            <div class="mt-3 font-bold">智能助手</div>
            <div class="mt-2 text-sm text-ellipsis whitespace-nowrap overflow-hidden">
              人工智能助手可以帮助您完成各种任务，提高工作效率
            </div>
            <div class="mt-2 text-sm flex">
              <img
                class="w-5 h-5 mr-2"
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/c55515821e36c495c64b891645a48b0039c951d6.png"
              />
              <img
                class="w-5 h-5 mr-2"
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/c55515821e36c495c64b891645a48b0039c951d6.png"
              />
              <img
                class="w-5 h-5 mr-2"
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/c55515821e36c495c64b891645a48b0039c951d6.png"
              />
              <img
                class="w-5 h-5 mr-2"
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/c55515821e36c495c64b891645a48b0039c951d6.png"
              />
              <div class="ml-4">4星</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style scoped>
.el-input {
  border-color: #333333;
  border: 2px solid;
  border-radius: 4px;
}
.el-button {
  /* border-color: #333333; */
  border: 2px solid;
  border-radius: 4px;
  height: 42px;
}
</style>
