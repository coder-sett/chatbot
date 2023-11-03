<script setup lang="ts">
import { ref, reactive } from "vue"
import type { TabsPaneContext } from "element-plus"
import Side from "@/components/Bot/Side.vue"
import { useRoute } from "vue-router"

const route = useRoute()
console.log(route.query.name)
defineProps<{ msg: string }>()

const activeName = ref("first")

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const radio1 = ref("1")
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
})
</script>
<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <Header />
    <section class="flex-1 max-w-[1240px] w-full mx-auto my-4 px-5">
      <div class="w-[600px] mx-auto">
        <div class="my-16 text-center">
          <h2 class="text-4xl font-semibold">评测申请</h2>
          <div class="mt-4">提交评测申请后，模型将以离线评测的方式接受评测</div>
        </div>
        <div class="border-b pb-10">
          <div class="text-xl font-bold text-left">模型提交方式</div>
          <el-radio-group v-model="radio1">
            <div class="flex gap-4 mt-4">
              <div
                @click="radio1 = '1'"
                class="border p-4 pt-2 cursor-pointer"
                :class="radio1 === '1' && 'border-[#409eff]'"
              >
                <el-radio label="1" size="large">API 提交 </el-radio>
                <div class="ml-5 text-sm">将模型能力封装为 HTTP 接口，并提供相应的 API 文档</div>
              </div>
              <div
                @click="radio1 = '2'"
                class="border p-4 pt-2 cursor-pointer"
                :class="radio1 === '2' && 'border-[#409eff]'"
              >
                <el-radio label="2" size="large">模型仓库提交 </el-radio>
                <div class="ml-5 text-sm">将模型能力封装为 HTTP 接口，并提供相应的 API 文档</div>
              </div>
            </div>
          </el-radio-group>
        </div>
        <div v-if="radio1 == '1'" class="mt-8">
          <div class="text-xl font-bold text-left mb-8">API 提交</div>

          <el-form :model="form" label-position="top" size="large">
            <el-form-item
              label="模型名称"
              :rules="[
                {
                  required: true,
                  message: 'Please input email address',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="开发者类型">
              <el-radio-group
                v-model="form.resource"
                :rules="[
                  {
                    required: true,
                    message: 'Please input email address',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-radio label="个人" />
                <el-radio label="组织/团队" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="参数量（单位：十亿）">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item
              label="模型 API Endpoint"
              :rules="[
                {
                  required: true,
                  message: 'Please input email address',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input v-model="form.name" />
              <span class="text-[#8f8f8f]"
                >提供可访问的 HTTP 类型服务可以加快评测进程，例如ChatGPT API</span
              >
            </el-form-item>
            <el-form-item label="模型 API 文档">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="GitHub/官网">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="模型描述">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item
              label="邮箱"
              :rules="[
                {
                  required: true,
                  message: 'Please input email address',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input v-model="form.name" />
              <span class="text-[#8f8f8f]"
                >提供可访问的 HTTP 类型服务可以加快评测进程，例如ChatGPT API</span
              >
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="开发者类型">
              <el-radio-group v-model="form.resource">
                <el-radio label="公开" />
                <el-radio label="不公开" />
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div v-else class="mt-8">
          <div class="text-xl font-bold text-left mb-8">模型仓库提交</div>

          <el-form :model="form" label-position="top" size="large">
            <el-form-item
              label="模型名称"
              :rules="[
                {
                  required: true,
                  message: 'Please input email address',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="开发者类型">
              <el-radio-group
                v-model="form.resource"
                :rules="[
                  {
                    required: true,
                    message: 'Please input email address',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-radio label="个人" />
                <el-radio label="组织/团队" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="参数量（单位：十亿）">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item
              label="模型仓库 URL"
              :rules="[
                {
                  required: true,
                  message: 'Please input email address',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="模型描述">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item
              label="邮箱"
              :rules="[
                {
                  required: true,
                  message: 'Please input email address',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input v-model="form.name" />
              <span class="text-[#8f8f8f]"
                >提供可访问的 HTTP 类型服务可以加快评测进程，例如ChatGPT API</span
              >
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="开发者类型">
              <el-radio-group v-model="form.resource">
                <el-radio label="公开" />
                <el-radio label="不公开" />
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="mt-10 w-full h-12 text-[#fff] flex items-center justify-center bg-[#1b3882] rounded hover:bg-[#4568c1]"
        >
          提交申请
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style></style>
