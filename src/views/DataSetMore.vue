<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { UserFilled } from "@element-plus/icons-vue"
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
interface MyMap {
  [key: string]: { [key: string]: string }
}

const route = useRoute()
const router = useRouter()

const activeName = ref("first")
const input = ref("")
const model = route.query?.name || "ChatGPT"
const modelInfo: MyMap = {
  openai_humaneval: {
    info: "GPT-3.5 由openAI开发并通过API提供服务，模型能够理解和生成自然语言或代码。在GPT-3.5系列中，最具能力且成本效益最高的模型是gpt-3.5-turbo，它经过了针对聊天功能进行优化，并通过Chat completions API实现。它同样也适用于传统的对话任务。",
  },
  "THUDM/AgentInstruct": {
    info: "FastChat-T5是一个开源聊天机器人，通过在来自ShareGPT的用户共享对话数据上微调Flan-t5-xl（30亿参数）进行训练而得到。它基于编码-解码变压器架构，并能自动生成回应来响应用户的输入。",
  },
}
const dataList = [
  {
    name: "社区口碑标注-南大144",
    time: "2023/7/12",
    num: "144 / 3465",
    detail: "",
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
    <section class="flex-1 bg-[#fafafa] max-w-[1240px] w-full mx-auto my-8 px-5">
      <div class="flex space-x-4">
        <div class="bg-[#ffffff] w-[320px] rounded-md shadow-md" v-for="item in dataList">
          <div class="border-b p-3">
            <div>{{ item.name }}</div>
            <div class="mt-3 flex justify-between text-sm text-[#a8abb9]">
              <div>{{ item.num }}</div>
              <!-- <div class="">{{ item.num }}</div> -->
            </div>
          </div>
          <div class="p-3">
            <div class="text-[#a8abb9] h-12">{{ item.detail }}</div>
            <div class="mt-3 flex justify-between text-sm text-[#a8abb9]">
              <!-- <div class="text-sm text-[#a8abb9]">{{ item.time }}</div> -->
              <div class="text-sm text-[#a8abb9] flex justify-end w-full">
                <el-button> Review </el-button>
                <el-button>修改 </el-button>
                <el-button> 评论</el-button>
                <!-- <el-icon style="width: 20px; height: 20px"
                  ><UserFilled style="width: 20px; height: 20px"
                /></el-icon> -->
              </div>
            </div>
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
