<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { UserFilled } from "@element-plus/icons-vue"
import { ThumbsUp } from "@icon-park/vue-next"
import favicon from "@/assets/favicon.ico"
import TextComponent from "@/components/Message/Text.vue"

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

const dialogVisible = ref(false)
const finish = ref(true)
const finish1 = ref(false)

const tableData = ref<any>([])
const tableData1 = ref([{ a: "split", b: "http" }])

const addList = () => {
  dialogVisible.value = false
  finish.value = false

  tableData.value.push({ a: "WEB Loader", b: "http" })
}
const radio = ref(3)
const radio1 = ref(3)
const edit = ref(false)
const editValue = ref("12314")

const edit1 = ref(false)
const editValue1 = ref("12314")
</script>

<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <Header />
    <section class="flex-1 max-w-[1240px] w-full mx-auto my-8 px-5">
      <div class="flex mt-8">
        <div class="flex-1">
          <div class="mb-4">
            <h2 class="flex-1 mb-4">Setp 1 添加Loader:</h2>
            <div v-if="finish" class="">
              <div class="grid grid-cols-4 gap-4 mb-4">
                <div
                  @click="dialogVisible = true"
                  class="hover:bg-[#f3f3f3] flex h-24 cursor-pointer flex-col items-center justify-center border border-[#CCCCCC] p-3 text-lg"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    t="1551322312294"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs></defs>
                    <path
                      d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
                    ></path>
                    <path
                      d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div v-else class="border p-4 rounded">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="名称" prop="a" width="180"> </el-table-column>

                <el-table-column label="url" width="">
                  <template #default="scope">
                    <el-input size="small" v-model="scope.row.input"></el-input>
                    <!-- <el-button size="small" type="danger" @click="">确定</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="mb-4">
            <h2 class="flex-1 my-4">Setp 2 设置切片策略:</h2>
            <div class="border p-4 rounded">
              <el-table :data="tableData1" style="width: 100%">
                <el-table-column label="action" prop="a" width="180"> </el-table-column>

                <el-table-column label="chunk size" width="">
                  <template #default="scope">
                    <el-input size="small" v-model="scope.row.input"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="overlap" width="">
                  <template #default="scope">
                    <el-input size="small" v-model="scope.row.input"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="mb-4">
            <h2 class="flex-1 my-4">Setp 3 embedding model choose:</h2>
            <div class="border p-4 rounded">
              <el-radio-group v-model="radio">
                <el-radio :label="3">Model A</el-radio>
                <el-radio :label="6">Model B</el-radio>
                <el-radio :label="9">Model C</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="mb-4">
            <h2 class="flex-1 my-4">Setp 4 Retriever Setting:</h2>
            <div class="border p-4 rounded">
              <el-radio-group v-model="radio1">
                <el-radio :label="3">stuff</el-radio>
                <el-radio :label="6">refine</el-radio>
                <el-radio :label="9">map-reduce</el-radio>
                <el-radio :label="10">map-rerank</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="mb-4">
            <h2 class="flex-1 my-4">Setp 5 question generation:</h2>
            <div class="border p-4 rounded">
              <el-button class="mb-4" type="primary" plain>RUN</el-button>
              <el-button class="mb-4" type="primary" @click="edit = true" plain>edit</el-button>
              <div v-if="edit" class="flex">
                <el-input size="large" v-model="editValue"></el-input>
                <el-button size="large" class="ml-4" type="primary" @click="edit = true" plain
                  >save</el-button
                >
              </div>
              <TextComponent
                v-else
                ref="textRef"
                :inversion="false"
                :error="false"
                :text="12344"
                :loading="false"
                :as-raw-text="true"
                :isComment="true"
              />
            </div>
          </div>
          <div class="mb-4">
            <h2 class="flex-1 my-4">Setp 6 Answer generation:</h2>
            <div class="border p-4 rounded">
              <el-button class="mb-4" type="primary" plain>RUN</el-button>
              <el-button class="mb-4" type="primary" @click="edit1 = true" plain>edit</el-button>
              <div v-if="edit1" class="flex">
                <el-input size="large" v-model="editValue1"></el-input>
                <el-button size="large" class="ml-4" type="primary" @click="edit = true" plain
                  >save</el-button
                >
              </div>
              <TextComponent
                v-else
                ref="textRef"
                :inversion="false"
                :error="false"
                :text="12344"
                :loading="false"
                :as-raw-text="true"
                :isComment="true"
              />
            </div>
          </div>
        </div>

        <div class="ml-10 w-[400px] bg-[#fafafa] pb-10">
          <div class="flex h-24 bg-[#f4f4f4] p-4">
            <div class="h-16 w-16 bg-[#f6f6f6] p-2">
              <img
                class="mr-2 inline-block align-text-top"
                src="https://compass.gitee.com/images/lab/create.png"
                alt=""
              />
            </div>
            <div class="w-[280px] pt-2 pl-4 text-xl font-medium">在5分钟内创建一个您自己的模型</div>
          </div>
          <div class="h-[340px] pt-4 pl-10">
            <div class="relative flex pt-6">
              <div class="absolute -top-[16px] left-[8px] h-full w-0.5 bg-[#e5e5e5]"></div>
              <div
                class="relative flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#4E4E4E] text-xs text-white"
              >
                1
              </div>
              <div class="ml-4">
                <div class="-mt-1 text-base font-medium">选择Loader</div>
                <span class="text-xs">覆盖各领域各行业 200+ Loader</span>
              </div>
            </div>
            <div class="relative flex pt-6">
              <div class="absolute -top-[16px] left-[8px] h-full w-0.5 bg-[#e5e5e5]"></div>
              <div
                class="relative flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#4E4E4E] text-xs text-white"
              >
                2
              </div>
              <div class="ml-4 w-[300px]">
                <div class="-mt-1 text-base font-medium">设置切片策略</div>
                <span class="text-xs">来源于CHAOSS的 100+ 度量指标</span>
              </div>
            </div>
            <div class="relative flex pt-6">
              <div class="absolute -top-[16px] left-[8px] h-full w-0.5 bg-[#e5e5e5]"></div>
              <div
                class="relative flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#4E4E4E] text-xs text-white"
              >
                3
              </div>
              <div class="ml-4">
                <div class="-mt-1 text-base font-medium">embedding model choose</div>
                <span class="text-xs">支持 AHP 和其他自定义的多种算法</span>
              </div>
            </div>
            <div class="relative flex pt-6">
              <div class="absolute -top-[16px] left-[8px] h-10 w-0.5 bg-[#e5e5e5]"></div>
              <div
                class="relative flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#4E4E4E] text-xs text-white"
              >
                4
              </div>
              <div class="ml-4">
                <div class="-mt-1 text-base font-medium">发布模型</div>
                <span class="text-xs">公开模型，还可以邀请伙伴们一起完善它</span>
              </div>
            </div>
          </div>
          <div
            class="mx-6 flex h-10 cursor-pointer items-center justify-center bg-[#000000] text-white hover:bg-black/90"
          >
            开始创建一个模型
          </div>
        </div>
      </div>
    </section>
    <Footer />
    <el-dialog v-model="dialogVisible" title="选择" width="50%">
      <div class="grid grid-cols-3 gap-4 pr-2">
        <div class="relative cursor-pointer bg-white border p-px">
          <div class="py-2.5 px-4">
            <div class="absolute bottom-1.5 right-4"><input type="checkbox" @click="" /></div>
            <div>
              <p class="mb-1 truncate break-words font-bold">CSV Loader</p>
              <p class="h-2 truncate text-sm text-gray-400"></p>
            </div>
            <div class="flex w-full items-center">
              <div class="mr-auto flex-1">
                <img class="w-5 h-5 rounded-full" :src="favicon" />
              </div>
            </div>
          </div>
        </div>

        <div class="relative cursor-pointer bg-white border p-px">
          <div class="py-2.5 px-4">
            <div class="absolute bottom-1.5 right-4"><input type="checkbox" @click="" /></div>
            <div>
              <p class="mb-1 truncate break-words font-bold">PDF Loader</p>
              <p class="h-2 truncate text-sm text-gray-400"></p>
            </div>
            <div class="flex w-full items-center">
              <div class="mr-auto flex-1">
                <img class="w-5 h-5 rounded-full" :src="favicon" />
              </div>
            </div>
          </div>
        </div>
        <div class="relative cursor-pointer bg-white border p-px">
          <div class="py-2.5 px-4">
            <div class="absolute bottom-1.5 right-4"><input type="checkbox" @click="" /></div>
            <div>
              <p class="mb-1 truncate break-words font-bold">JSON Loader</p>
              <p class="h-2 truncate text-sm text-gray-400"></p>
            </div>
            <div class="flex w-full items-center">
              <div class="mr-auto flex-1">
                <img class="w-5 h-5 rounded-full" :src="favicon" />
              </div>
            </div>
          </div>
        </div>

        <div class="relative cursor-pointer bg-white border p-px">
          <div class="py-2.5 px-4">
            <div class="absolute bottom-1.5 right-4">
              <input type="checkbox" />
            </div>
            <div>
              <p class="mb-1 truncate break-words font-bold">WEB Loader</p>
              <p class="h-2 truncate text-sm text-gray-400"></p>
            </div>
            <div class="flex w-full items-center">
              <div class="mr-auto flex-1">
                <img class="w-5 h-5 rounded-full" :src="favicon" />
              </div>
            </div>
          </div>
        </div>

        <div class="relative cursor-pointer bg-white border p-px">
          <div class="py-2.5 px-4">
            <div class="absolute bottom-1.5 right-4"><input type="checkbox" @click="" /></div>
            <div>
              <p class="mb-1 truncate break-words font-bold">Github Loader</p>
              <p class="h-2 truncate text-sm text-gray-400"></p>
            </div>
            <div class="flex w-full items-center">
              <div class="mr-auto flex-1">
                <img class="w-5 h-5 rounded-full" :src="favicon" />
              </div>
            </div>
          </div>
        </div>
        <div class="relative cursor-pointer bg-white border p-px">
          <div class="py-2.5 px-4">
            <div class="absolute bottom-1.5 right-4"><input type="checkbox" @click="" /></div>
            <div>
              <p class="mb-1 truncate break-words font-bold">XXX Loader</p>
              <p class="h-2 truncate text-sm text-gray-400"></p>
            </div>
            <div class="flex w-full items-center">
              <div class="mr-auto flex-1">
                <img class="w-5 h-5 rounded-full" :src="favicon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addList"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
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
