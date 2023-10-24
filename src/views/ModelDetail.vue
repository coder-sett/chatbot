<script setup lang="ts">
import { ref } from "vue"
import { ThumbsUp } from "@icon-park/vue-next"
import { useRouter } from "vue-router"
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"

const router = useRouter()
const activeName = ref("first")
const input = ref("")
</script>

<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <Header />
    <section class="flex-1 max-w-[1240px] w-full mx-auto my-5 px-5">
      <div class="flex">
        <div class="mt-40 flex-1">
          <div class="h-30">
            <div class="text-4xl font-bold mb-10">AI模型详情</div>
            <div>
              这是一个AI模型点评页面，提供模型介绍、参数、相关产品、用户评价和模型试用等功能模块。
            </div>
          </div>
          <div class="mt-10">
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane label="模型参数" name="first"
                >该页面提供了详细的AI模型介绍和参数，以及相关产品的展示和用户评价功能。用户可以通过模型参数了解模型的性能和特点，通过相关产品了解模型的应用场景和使用案例，通过用户评价了解其他用户对模型的评价和体验。</el-tab-pane
              >
              <el-tab-pane label="模型参数" name="second">Config</el-tab-pane>
              <el-tab-pane label="相关产品" name="third">Role</el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="mt-40 w-[400px] ml-20">
          <div class="h-30">
            <div class="text-4xl font-bold">模型评价</div>
            <div class="mt-6 text-sm flex">
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
            <div class="mt-6">模型类型</div>
            <div class="mt-2 flex justify-between">
              <div class="bg-[#252525] rounded-md text-center py-2 w-32 text-[#fff]">图像识别</div>
              <div class="bg-[#252525] rounded-md text-center py-2 w-32 text-[#fff]">语音识别</div>
              <div class="bg-[#252525] rounded-md text-center py-2 w-32 text-[#fff]">自然语言</div>
            </div>
          </div>
          <div>
            <div class="mt-6">模型类型</div>
            <div class="mt-2 flex justify-between">
              <div class="bg-[#252525] rounded-md text-center py-2 w-32 text-[#fff]">CPU</div>
              <div class="bg-[#252525] rounded-md text-center py-2 w-32 text-[#fff]">GPU</div>
              <div class="bg-[#252525] rounded-md text-center py-2 w-32 text-[#fff]">TPU</div>
            </div>
          </div>
          <div>
            <div class="mt-6">模型类型</div>
            <div class="mt-2 flex justify-between">
              <div class="bg-[#252525] rounded-md text-center py-2 w-32 text-[#fff]">ensorFlow</div>
              <div class="bg-[#252525] rounded-md text-center py-2 w-32 text-[#fff]">PyTorch</div>
              <div class="bg-[#252525] rounded-md text-center py-2 w-32 text-[#fff]">Keras</div>
            </div>
          </div>
          <div
            class="bg-[#333] rounded-md w-full mt-10 py-2 text-[#fff] text-center cursor-pointer"
            @click="router.push('/evaluate')"
          >
            申请试用
          </div>
        </div>
      </div>
      <div class="mt-40 w-full">
        <el-carousel :interval="5000000" arrow="always">
          <el-carousel-item v-for="item in 1" :key="item">
            <div class="px-40 py-10 text-center flex flex-col items-center">
              <div class="text-xl text-center font-semibold">
                这个AI模型点评页面真是太棒了！设计简洁大方，用户体验很好。我喜欢它提供的模型介绍、参数、相关产品和用户评价等功能，非常实用！
              </div>
              <div class="h-16 w-16 mt-8">
                <img
                  src="https://img.jsdesign2.com/assets/element/ai_AheJcMcjCpO/image/2184303fa24312bc9b749c25c9187c99a09cf309.png"
                  alt=""
                />
              </div>
              <div class="text-xl font-semibold mt-6">葛志强</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="mt-40 w-full flex">
        <div class="flex-1 mr-16">
          <div class="flex mb-10">
            <div class="h-16 w-16 rounded-full overflow-hidden">
              <img src="https://img.jsdesign2.com/assets/img/64ba19ddcd74b19bb489e278.png" alt="" />
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
