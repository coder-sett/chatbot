<script setup lang="ts">
import { ref } from "vue"
import { ThumbsUp } from "@icon-park/vue-next"
import { useRoute, useRouter } from "vue-router"
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import Dataset from "@/assets/2.png"
import Editor from "@/components/Editor/Editor.vue"

interface MyMap {
  [key: string]: { [key: string]: string }
}
const route = useRoute()
const router = useRouter()

const activeName = ref("first")
const input = ref("")
const model = route.query?.name || "ChatGPT"
const modelInfo: MyMap = {
  ChatGPT: {
    info: "GPT-3.5 由openAI开发并通过API提供服务，模型能够理解和生成自然语言或代码。在GPT-3.5系列中，最具能力且成本效益最高的模型是gpt-3.5-turbo，它经过了针对聊天功能进行优化，并通过Chat completions API实现。它同样也适用于传统的对话任务。",
  },
  "THUDM/AgentInstruct": {
    info: "FastChat-T5是一个开源聊天机器人，通过在来自ShareGPT的用户共享对话数据上微调Flan-t5-xl（30亿参数）进行训练而得到。它基于编码-解码变压器架构，并能自动生成回应来响应用户的输入。",
  },
}
</script>

<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <Header />
    <section class="flex-1 max-w-[1240px] w-full mx-auto my-3 px-5">
      <div class="flex">
        <div class="mt-8 flex-1">
          <div class="h-20">
            <div class="text-4xl font-bold mb-10">WIKI百科</div>
            <div>
              {{
                // modelInfo?.[model as string]["info"] ||
                "这是一个WIKI百科验证集，提供验证集介绍、参数、相关产品、用户评价和模型试用等功能模块。"
              }}
            </div>
          </div>
          <div class="mt-10">
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane label="验证集参数" name="first"
                >该页面提供了详细的AI模型验证集介绍和参数，以及相关产品的展示和用户评价功能。用户可以通过模型参数了解模型的性能和特点，通过相关产品了解模型的应用场景和使用案例，通过用户评价了解其他用户对模型的评价和体验。</el-tab-pane
              >
              <el-tab-pane label="验证集参数" name="second">验证集参数</el-tab-pane>
              <el-tab-pane label="相关产品" name="third">相关产品</el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="mt-8 w-[300px] ml-20">
          <div class="h-30">
            <div class="text-xl font-bold">验证集评价</div>
            <div class="mt-3 text-xs flex">
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
          <div class="text-xs">
            <div class="mt-3">验证集类型</div>
            <div class="mt-2 flex justify-between">
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">图像识别</div>
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">语音识别</div>
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">自然语言</div>
            </div>
          </div>
          <div class="text-xs">
            <div class="mt-3">验证集语言</div>
            <div class="mt-2 flex justify-between">
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">English</div>
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">Chinese</div>
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">Other</div>
            </div>
          </div>
          <div class="text-xs">
            <div class="mt-3">验证集License</div>
            <div class="mt-2 flex justify-between">
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">MIT 2.0</div>
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">可修改</div>
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">可商用</div>
            </div>
          </div>
          <!-- <div class="flex text-xs mt-4">
            <el-button
              type="primary"
              class="w-full !text-xs"
              @click="
                router.push({
                  path: '/dataSetList',
                  query: {
                    name: encodeURIComponent(model),
                  },
                })
              "
            >
              数据Review
            </el-button>
          </div> -->
          <div
            class="bg-[#409eff] rounded-md w-full text-xs mt-6 py-1 text-[#fff] text-center cursor-pointer"
            @click="
              router.push({
                path: '/dataSetList',
                query: {
                  name: encodeURIComponent(model),
                },
              })
            "
          >
            数据Review
          </div>
        </div>
      </div>
      <div class="w-full mt-20 h-[400px]">
        <!-- <a target="_blank" href="https://huggingface.co/datasets/THUDM/AgentInstruct/tree/main">
          <img class="w-full" :src="Dataset"
        /></a> -->
        <!-- <Editor /> -->
        <iframe class="w-full h-full" src="http://119.12.172.232/:8885/" />
      </div>
      <div class="mt-32 w-full flex">
        <div class="flex-1 mr-16">
          <div class="flex mb-10">
            <div class="h-16 w-16 rounded-full overflow-hidden">
              <img
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/2184303fa24312bc9b749c25c9187c99a09cf309.png"
                alt=""
              />
            </div>
            <div class="flex-1 ml-4">
              <div>Daniel Anderson · 2023-04-01</div>
              <div class="font-semibold mt-2">这个验证集非常好用，准确率非常高</div>
            </div>
            <div class="flex cursor-pointer mt-2">
              <thumbs-up theme="outline" size="24" fill="#333" />
              <div class="mx-4">89</div>
            </div>
          </div>
          <div class="flex mb-10">
            <div class="h-16 w-16 rounded-full overflow-hidden">
              <img
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/2184303fa24312bc9b749c25c9187c99a09cf309.png"
                alt=""
              />
            </div>
            <div class="flex-1 ml-4">
              <div>Daniel Anderson · 2023-04-01</div>
              <div class="font-semibold mt-2">这个验证集非常好用，准确率非常高</div>
            </div>
            <div class="flex cursor-pointer mt-2">
              <thumbs-up theme="outline" size="24" fill="#333" />
              <div class="mx-4">89</div>
            </div>
          </div>
        </div>
        <div class="w-[400px]">
          <div class="text-xl font-semibold">用户评价</div>
          <div class="mt-4">
            <el-input :rows="4" type="textarea" placeholder="说说你对这个模型的评价..."></el-input>
          </div>
          <div class="flex justify-end mt-4">
            <el-button class="ml-4" type="" size="large">提交</el-button>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style>
.el-tabs__nav-wrap:after {
  /* height: 0px; */
}
.el-textarea__inner {
  padding: 8px;
}
</style>
