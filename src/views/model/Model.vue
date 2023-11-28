<script setup lang="ts">
import { ref } from "vue"
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import { useRouter } from "vue-router"
import ChatGPT from "@/assets/ChatGPT.png"
import T5 from "@/assets/t5.png"
import GLM from "@/assets/GLM.png"

const router = useRouter()
const input = ref("")
const imgList = ref<any>(["基础大模型", "行业大模型", "领域大模型"])
const modelList = ref<any>([
  "Meta/Llama2-13B-chat",
  "baichuan-inc/Baichuan2-13B-Chat",
  "THUDM/chatglm3-6b",
  "OpenAI/GPT-3.5-Turbo",
  "Other",
  "Other",
])
const activeName = ref("基础大模型")
const img2List = ref<any>([
  "https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/646cf8084eefb026fb8fd8bc/oCTqufkdTkjyGodsx1vo1.png?w=200&h=200&f=face",
  "https://avatars.githubusercontent.com/u/136167093?s=200&v=4",
  GLM,
  ChatGPT,
  "https://img.jsdesign2.com/assets/img/6475a9536be6533b8a7441f0.png#ebade77ad960ea0306274202cbfdb640",
  "https://img.jsdesign2.com/assets/img/652ca2e6454393a7d697adb0.png#c349e97700e81fe55284332a6d77cd93",
])
</script>

<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <Header />
    <section class="flex-1 max-w-[1240px] w-full mx-auto my-5 px-5">
      <div class="flex justify-between h-60 items-center">
        <div class="text-4xl font-bold">AI模型点评</div>
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
            @click="
              router.push({
                path: '/modelDetail',
                query: {
                  name: modelList[index],
                },
              })
            "
            v-for="(item, index) in img2List"
          >
            <div class="rounded-xl overflow-hidden"><img class="w-full h-full" :src="item" /></div>
            <div class="mt-3 font-bold">{{ modelList[index] }}</div>
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
