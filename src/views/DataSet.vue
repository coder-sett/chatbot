<script setup lang="ts">
import { ref } from "vue"
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import { useRouter } from "vue-router"
import { PullRequests, HardDisk, FileFocusOne, Like } from "@icon-park/vue-next"
import ChatGPT from "@/assets/ChatGPT.png"
import GLM from "@/assets/GLM.png"
import fka from "@/assets/fka.png"
import openWeb from "@/assets/openWeb.png"
import openAi from "@/assets/openAi.png"
import EAI from "@/assets/EAI.png"

const router = useRouter()
const input = ref("")
const imgList = ref<any>(["多模态", "自然语言处理", "语音识别"])
const modelList = ref<any>([
  "openai_humaneval",
  "THUDM/AgentInstruct",
  "EleutherAI/proof-pile-2",
  "fka/awesome-chatgpt-prompts",
  "open-web-math/open-web-math",
  "openai/summarize_from_feedback",
])
const activeName = ref("多模态")
const img2List = ref<any>([
  openAi,
  GLM,
  EAI,
  fka,
  openWeb,
  ChatGPT,
  // "https://img.jsdesign2.com/assets/img/6475a9536be6533b8a7441f0.png#ebade77ad960ea0306274202cbfdb640",
  // "https://img.jsdesign2.com/assets/img/652ca2e6454393a7d697adb0.png#c349e97700e81fe55284332a6d77cd93",
])
const dataList = [
  {
    name: "社区口碑标注-南大144",
    time: "2023/7/12",
    num: "144 / 3465",
    detail: "社区口碑标注",
  },
  {
    name: "ABSA LLM",
    time: "2023/7/12",
    num: "144 / 3465",
    detail: "社区问答开发者情感状态标注",
  },
  {
    name: "ABSA_aoe",
    time: "2023/7/12",
    num: "144 / 3465",
    detail: "情感分析三元组数据标注",
  },
  // / 3465
  // 10 Jul'23 18:40
  // ..
  // 144
  // -0.0
  // ABSA LLM
  // 1 / 22
  // ...
  // <1-00
  // 社区问答开发者情感状态标注
  // 16 Jun 23, 14:25
  // ABSA_aoe
  // 2/3
  // 情感分析三元组数据标注
]
</script>

<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between bg-[#fafafa]">
    <Header />
    <section class="flex-1 max-w-[1240px] w-full mx-auto my-5 px-5">
      <div class="flex justify-between h-60 items-center">
        <div class="text-4xl font-bold">AI模型验证集</div>
        <div class="max-w-[620px]">
          <div>
            这里提供全面的AI模型验证集的分类和验证集列表展示，让你更好地了解和选择AI模型验证集。
          </div>
          <div class="flex mt-8">
            <el-input class="rounded" v-model="input" size="large" placeholder="输入验证集名称" />
            <el-button class="ml-4 !h-[42px] rounded" size="large">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="flex justify-between h-30 items-center mt-40">
        <div class="text-4xl font-bold">AI模型验证集列表</div>
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
          <div class="bg-[#ffffff] rounded-md shadow-md" v-for="item in dataList">
            <div
              class="border-b p-3 cursor-pointer"
              @click="
                router.push({
                  path: '/dataSetDetail',
                  // query: {
                  //   name: encodeURIComponent(item.name),
                  // },
                })
              "
            >
              <div class="text-base font-medium">{{ item.name }}</div>
              <div class="mt-3 flex justify-between text-sm text-[#a8abb9]">
                <div>{{ item.detail }}</div>
                <!-- <div class="">{{ item.num }}</div> -->
              </div>
            </div>
            <div class="p-3 text-sm">
              <!-- <div class="text-[#a8abb9] h-10">{{ item.detail }}</div> -->
              <div class="flex my-2 items-center justify-end gap-1 text-[#a8abb9]">
                <PullRequests theme="outline" class="" />61
                <FileFocusOne theme="outline" class="ml-2" />22
                <HardDisk theme="outline" class="ml-2" />32G <Like theme="outline" class="ml-2" />12
              </div>
              <div class="mt-4 flex justify-between text-sm text-[#a8abb9]">
                <!-- <div class="text-sm text-[#a8abb9]">{{ item.time }}</div> -->
                <div class="text-sm text-[#a8abb9] flex justify-end w-full">
                  <el-button
                    @click="
                      router.push({
                        path: '/dataSetList',
                        query: {
                          name: encodeURIComponent(item.name),
                        },
                      })
                    "
                  >
                    Review
                  </el-button>
                  <el-button>修改 </el-button>
                  <el-button
                    @click="
                      router.push({
                        path: '/dataSetDetail',
                        // query: {
                        //   name: encodeURIComponent(item.name),
                        // },
                      })
                    "
                  >
                    详情</el-button
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- <div
            class="py-2 items-center cursor-pointer"
            @click="
              router.push({
                path: '/dataSetDetail',
                query: {
                  name: encodeURIComponent(modelList[index]),
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
          </div> -->
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style scoped>
/* .el-input {
  border-color: #333333;
  border: 2px solid;
  border-radius: 4px;
} */
/* .el-button {
  border: 2px solid;
  border-radius: 4px;
  height: 42px;
} */
</style>
