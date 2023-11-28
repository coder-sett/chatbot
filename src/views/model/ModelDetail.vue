<script setup lang="ts">
import { ref } from "vue"
import { ThumbsUp } from "@icon-park/vue-next"
import { useRoute, useRouter } from "vue-router"
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import DataSetTable from "@/components/Bot/DataSetTable3.vue"
import modelList from "@/assets/json/model.json"
import { User, Message } from "@element-plus/icons-vue"

interface MyMap {
  [key: string]: { [key: string]: string }
}
const route = useRoute()
const router = useRouter()

const activeName = ref("first")
const input = ref("")
console.log(route.query.name)
const model = route.query?.name || "Meta/Llama2-13B-chat"
const modelInfo = modelList.find((item) => item["模型名称"] === model)
console.log(modelInfo)
</script>

<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <Header />
    <section class="flex-1 max-w-[1240px] w-full mx-auto my-5 px-5">
      <div class="flex">
        <div class="mt-40 flex-1">
          <div class="h-30">
            <div class="text-4xl font-bold mb-2">
              {{ model
              }}<spna class="text-base ml-4 font-normal">{{ modelInfo?.["模型类型"] }}</spna>
            </div>
            <div class="mb-2 flex text-sm items-center">
              <el-icon class="mr-2"><User /> </el-icon>
              <a :href="modelInfo?.['创建者信息']['链接']" class="mr-2 cursor-pointer">{{
                modelInfo?.["创建者信息"]["名称"]
              }}</a>
              <el-icon class="ml-4 mr-2"><Message /> </el-icon>
              <div class="mr-2 cursor-pointer">{{ modelInfo?.["创建者信息"]["邮件"] }}</div>
            </div>
            <div class="mb-6 flex text-sm items-center">
              <div class="mr-2">License:</div>
              <div class="mr-2 cursor-pointer">{{ modelInfo?.["许可证信息"] }}</div>
            </div>
            <div>
              {{
                modelInfo?.["模型描述"] ||
                "这是一个AI模型点评页面，提供模型介绍、参数、相关产品、用户评价和模型试用等功能模块。"
              }}
            </div>
          </div>
          <div class="mt-10">
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane label="性能指标" name="first">{{ modelInfo?.["性能指标"] }}</el-tab-pane>
              <el-tab-pane label="使用示例" name="second">{{
                modelInfo?.["使用示例"]
              }}</el-tab-pane>
              <el-tab-pane label="其他说明" name="third">{{ modelInfo?.["其他说明"] }}</el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="mt-40 w-[350px] ml-20">
          <div class="h-30">
            <div class="text-2xl font-bold">模型评价</div>
            <div class="mt-3 text-sm flex">
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
          <div>
            <div class="mt-3">模型信息</div>
            <div class="mt-4 flex flex-wrap gap-2">
              <div class="rounded-full border text-center text-xs px-2 py-1">
                <span class="text-[#9ca3af]">训练数据: </span>{{ modelInfo?.["训练数据"] }}
              </div>
              <div class="rounded-full border text-center text-xs px-2 py-1">
                <span class="text-[#9ca3af]">Data Before: </span>{{ modelInfo?.["Data Before"] }}
              </div>
              <div class="rounded-full border text-center text-xs px-2 py-1">
                <span class="text-[#9ca3af]">训练任务: </span>{{ modelInfo?.["训练任务"] }}
              </div>
              <div class="rounded-full border text-center text-xs px-2 py-1">
                <span class="text-[#9ca3af]">语言: </span>{{ modelInfo?.["语言"] }}
              </div>
              <div class="rounded-full border text-center text-xs px-2 py-1">
                <span class="text-[#9ca3af]">版本号: </span>{{ modelInfo?.["版本号"] }}
              </div>
              <div class="rounded-full border text-center text-xs px-2 py-1">
                <span class="text-[#9ca3af]">多轮对话: </span>{{ modelInfo?.["多轮对话"] }}
              </div>
              <!-- <div class="rounded-full border text-center text-xs px-2 py-1">
                <span class="text-[#9ca3af]">License: </span>{{ modelInfo?.["许可证信息"] }}
              </div> -->
              <div class="rounded-full border text-center text-xs px-2 py-1">
                <span class="text-[#9ca3af]">依赖库和环境: </span>{{ modelInfo?.["依赖库和环境"] }}
              </div>
              <div class="rounded-full border text-center text-xs px-2 py-1">
                <span class="text-[#9ca3af]">模型大小: </span>{{ modelInfo?.["模型大小"] }}
              </div>
              <div class="rounded-full border text-center text-xs px-2 py-1">
                <span class="text-[#9ca3af]">量化级别: </span>{{ modelInfo?.["量化级别"] }}
              </div>
              <!-- <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">语音识别</div>
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">自然语言</div> -->
            </div>
            <!-- <div class="mt-2 flex justify-between">
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">图像识别</div>
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">语音识别</div>
              <div class="bg-[#252525] rounded-md text-center py-1 w-24 text-[#fff]">自然语言</div>
            </div> -->
          </div>
          <div class="flex mt-10">
            <el-button
              type="primary"
              class="w-full"
              @click="
                router.push({
                  path: '/evaluate',
                  query: {
                    name: model,
                  },
                })
              "
            >
              立即试用
            </el-button>
          </div>
        </div>
      </div>

      <div class="mt-28">
        <div class="text-2xl font-bold mb-2">评测结果</div>
        <div class="mb-8">下表为模型在验证集上评测的平均得分以及各个子能力维度的得分</div>
        <DataSetTable />
      </div>

      <div class="mt-40 w-full flex">
        <div class="flex-1 mr-16">
          <div class="flex mb-10">
            <div class="h-16 w-16 rounded-full overflow-hidden">
              <img src="https://img.jsdesign2.com/assets/img/64ba19ddcd74b19bb489e278.png" alt="" />
            </div>
            <div class="flex-1 mx-4">
              <div>Daniel J · 2023-04-01</div>
              <div class="my-2 overflow-auto max-h-[400px] border text-xs rounded p-3">
                <div class="flex items-center">
                  <div class="mr-2">Q:</div>
                  <div
                    class="text-wrap min-w-[20px] px-3 py-1 text-[#24292f] border rounded-xl bg-[#fff7ed] border-[#fdba74]"
                  >
                    <div class="leading-relaxed break-words">
                      <div class="whitespace-pre-wrap">
                        在锅里煮一个鸡蛋需要5分钟，如果煮两个鸡蛋需要几分钟?
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center mt-4">
                  <div class="mr-2">A:</div>
                  <div
                    class="text-wrap min-w-[20px] px-3 py-1 text-[#24292f] border rounded-xl bg-[#f3f4f6] border-[#e5e7eb]"
                  >
                    <div class="leading-relaxed break-words">
                      <div>
                        <div class="markdown-body">
                          <p>在锅里煮两个鸡蛋所需要的时间仍然是5分钟。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="font-semibold mt-2">准确率还不错</div>
            </div>
            <div class="flex cursor-pointer mt-2">
              <thumbs-up theme="outline" size="24" fill="#333" />
              <div class="mx-4">289</div>
            </div>
          </div>
          <div class="flex mb-10">
            <div class="h-16 w-16 rounded-full overflow-hidden">
              <img
                src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/2184303fa24312bc9b749c25c9187c99a09cf309.png"
                alt=""
              />
            </div>
            <div class="flex-1 mx-4">
              <div>Daniel Anderson · 2023-04-01</div>
              <div class="my-2 overflow-auto max-h-[400px] border text-xs rounded p-3">
                <div class="flex items-center">
                  <div class="mr-2">Q:</div>
                  <div
                    class="text-wrap min-w-[20px] px-3 py-1 text-[#24292f] border rounded-xl bg-[#fff7ed] border-[#fdba74]"
                  >
                    <div class="leading-relaxed break-words">
                      <div class="whitespace-pre-wrap">歇后语：小刀剌屁股</div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center mt-4">
                  <div class="mr-2">A:</div>
                  <div
                    class="text-wrap min-w-[20px] px-3 py-1 text-[#24292f] border rounded-xl bg-[#f3f4f6] border-[#e5e7eb]"
                  >
                    <div class="leading-relaxed break-words">
                      <div>
                        <div class="markdown-body">
                          <p>一刀两断</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="font-semibold mt-2">
                小刀剌屁股，开‌‌‌‌‌‌‌‌‌了眼了，这个歇后语是形容开了眼界的意思。
              </div>
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
              <div class="font-semibold mt-2">这个模型非常好用，准确率非常高</div>
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
              <div class="font-semibold mt-2">这个模型非常好用，准确率非常高</div>
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
