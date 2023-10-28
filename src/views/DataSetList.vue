<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Search, Close } from "@element-plus/icons-vue"
import { FileAdditionOne } from "@icon-park/vue-next"
import { ThumbsUp } from "@icon-park/vue-next"
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
const typeFitler = ref("全部")
const close = ref("全部")
const showSide = ref(false)

const searchInput = ref("")
const typeOptions = [
  {
    value: "全部",
    label: "全部",
  },
  {
    value: "与我相关",
    label: "与我相关",
  },
  {
    value: "我创建的",
    label: "我创建的",
  },
]
const resultList = [
  {
    name: "[wikipedia] 修改关于LF Foundation 介绍",
    time: "2020-11-14 11:20",
    other: "by KarlcxChina",
  },
  {
    name: "[wikipedia] 修改关于Apache foundatin 介绍",
    time: "2020-11-14 11:20",
    other: "by KarlcxChina",
  },
]
const activities = [
  {
    content: "Commits on Oct 25, 2023",
    timestamp: "Commits on Oct 25, 2023",
    // icon: FileAdditionOne,
    size: "large",
  },
  // {
  //   content: "Approved",
  //   timestamp: "2018-04-13",
  // },
  // {
  //   content: "Success",
  //   timestamp: "2018-04-11",
  // },
]
</script>

<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between bg-[#fafafa]">
    <Header />
    <section class="flex-1 bg-[#fafafa] max-w-[1240px] w-full mx-auto my-8 px-5">
      <div class="flex">
        <el-select v-model="typeFitler" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="searchInput"
          class="w-50 m-2"
          placeholder="Please Input"
          :suffix-icon="Search"
        />
      </div>
      <div class="flex items-center p-2 gap-2 mt-8 bg-white rounded">
        Closed:<el-select v-model="typeFitler" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        Author:<el-select v-model="typeFitler" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        Label:<el-select v-model="typeFitler" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        Dataset:<el-select v-model="typeFitler" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        Assignee:
        <el-select v-model="typeFitler" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        Sort:
        <el-select v-model="typeFitler" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex w-full h-[840px] mt-8">
        <div class="bg-white flex-1 h-full px-3 rounded">
          <div
            v-for="(item, index) in resultList"
            class="border-b h-[100px] pt-4 px-4 cursor-pointer"
            @click="showSide = true"
          >
            <div class="">{{ item.name }}</div>
            <div class="mt-2">{{ item.other }}</div>
            <div class="flex justify-end text-[#00000073] text-xs">{{ item.time }}</div>
          </div>
        </div>
        <div class="bg-white ml-4 w-[800px] p-3 h-full" v-if="showSide">
          <div class="">
            <div class="flex justify-end">
              <el-icon class="cursor-pointer" @click="showSide = false"><Close /></el-icon>
            </div>
            <code-diff
              old-string='## 限制<a name="zh-cn_topic_0183074344_section172611258112"></a>

            用户不可以在/etc/isulad/daemon.json和/etc/sysconfig/iSuald两个文件中同时指定hosts，如果这样做将会出现错误，isulad无法正常启动；
            '
              new-string='## 限制<a name="zh-cn_topic_0183074344_section172611258112"></a>

            用户不可以在/etc/isulad/daemon.json和/etc/sysconfig/iSulad两个文件中同时指定hosts，如果这样做将会出现错误，isulad无法正常启动；
            '
              output-format="side-by-side"
            />
            <div>
              <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                  <el-card class="mt-2 mb-2">
                    <h4 class="text-sm">Update Github template</h4>
                    <p class="text-xs mt-2">Tom committed 2018/4/12 20:46</p>
                  </el-card>
                  <el-card class="mb-2">
                    <h4 class="text-sm">Update Github template</h4>
                    <p class="text-xs mt-2">Tom committed 2018/4/11 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/01" placement="top">
                  <code-diff
                    old-string='## 限制<a name="zh-cn_topic_0183074344_section172611258112"></a>
            '
                    new-string='## 限制<a name="zh-cn_topic_0183074344_section172611258112"></a>
            '
                  />
                  <div class="flex-1 ml-4 flex items-start">
                    <div class="h-6 w-6 rounded-full overflow-hidden mr-2">
                      <img
                        src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/2184303fa24312bc9b749c25c9187c99a09cf309.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <div>Daniel Anderson · 2023-04-01</div>
                      <div class="font-semibold mt-2">建议修改描述</div>
                      <div class="flex cursor-pointer mt-1">
                        <thumbs-up theme="outline" size="18" fill="#333" />
                        <div class="mx-4">89</div>
                      </div>
                    </div>
                  </div>
                </el-timeline-item>
              </el-timeline>
              <div class="mt-4 px-4">
                <el-input
                  :rows="2"
                  type="textarea"
                  placeholder="说说你对这个MR的建议..."
                ></el-input>
              </div>
              <div class="flex justify-end mt-4">
                <el-button type="primary" class="ml-4" size="large"> Merge pull request </el-button>
                <el-button class="ml-4" type="" size="large">Close pull request</el-button>
                <el-button class="ml-4" type="" size="large">提交</el-button>
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
.el-card__body {
  padding: 8px 16px;
}
</style>
