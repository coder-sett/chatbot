<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { Refresh, CircleClose } from "@element-plus/icons-vue"
import { fetchBotList, fetchChatAPIProcess } from "@/api"
import Message from "@/components/Message/index.vue"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
onMounted(() => {})

const tableData = ref<any>([
  {
    a: "Qwen-14B-Chat",
    b: "2023/9/25",
    c: "基座",
    d: "14B",
    e: "78",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "Qwen-14B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "71",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "XuanYuan-70B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "75",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "Chinese-LLaMA-2-7B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "70",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "GPT-4",
    b: "2023/3/15",
    c: "对话",
    d: "7B",
    e: "78",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },

  {
    a: "ChatGLM3-6B-Base",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "75",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "WeMix-LLaMA2-70B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "71",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "Qwen-7B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "70",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "TigerBot-7B-Base-V1",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "78",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "ChatGPT",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "75",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "InternLM-20B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "71",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "Qwen-7B-Chat",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "70",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "StableBeluga2",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "78",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "XVERSE-7B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "75",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "AndesGPT-7B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "71",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
  {
    a: "ChatGLM3-6B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "70",
    f: "77.2",
    g: 69.9,
    h: 55.1,
    i: 83,
    j: 71,
    k: 72.3,
    l: 93.6,
  },
])
</script>
<template>
  <div class="w-full mb-4 cursor-pointer">
    <el-table
      :data="tableData"
      size="large"
      align="center"
      stripe
      :border="true"
      style="width: 100%"
    >
      <el-table-column label="模型名称" prop="a" width="180" align="center">
        <template #default="scope">
          <a class="cursor-pointer" @click="router.push('evaluate')">{{ scope.row.a }} </a>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" prop="b" width="" align="center"> </el-table-column>
      <el-table-column label="参数量" prop="d" width="" align="center"> </el-table-column>

      <el-table-column label="平均" prop="e" width="150" align="center"
        >{{ Math.floor(Math.random() * (90 - 40 + 1)) + 40 }}
      </el-table-column>
      <el-table-column label="平均(困难)" prop="f" width="" align="center"
        >{{ Math.floor(Math.random() * (90 - 40 + 1)) + 40 }}
      </el-table-column>
      <el-table-column label="STEM" prop="g" width="" align="center"
        >{{ Math.floor(Math.random() * (90 - 40 + 1)) + 40 }}
      </el-table-column>
      <el-table-column label="社会科学" prop="h" width="" align="center">
        {{ Math.floor(Math.random() * (90 - 40 + 1)) + 40 }}</el-table-column
      >
      <el-table-column label="人文科学" prop="i" width="" align="center"
        >{{ Math.floor(Math.random() * (90 - 40 + 1)) + 40 }}
      </el-table-column>
      <el-table-column label="其他" prop="j" width="150" align="center">
        {{ Math.floor(Math.random() * (90 - 40 + 1)) + 40 }}</el-table-column
      >
    </el-table>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
