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
    a: "TigerBot-7B-Base-V1",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "78",
  },
  {
    a: "OpenLLaMA-3Bv2",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "75",
  },
  {
    a: "MOSS-Moon",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "71",
  },
  {
    a: "Chinese-LLaMA-2-7B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "70",
  },
  {
    a: "TigerBot-7B-Base-V1",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "78",
  },
  {
    a: "OpenLLaMA-3Bv2",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "75",
  },
  {
    a: "MOSS-Moon",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "71",
  },
  {
    a: "Chinese-LLaMA-2-7B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "70",
  },
  {
    a: "TigerBot-7B-Base-V1",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "78",
  },
  {
    a: "OpenLLaMA-3Bv2",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "75",
  },
  {
    a: "MOSS-Moon",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "71",
  },
  {
    a: "Chinese-LLaMA-2-7B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "70",
  },
  {
    a: "TigerBot-7B-Base-V1",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "78",
  },
  {
    a: "OpenLLaMA-3Bv2",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "75",
  },
  {
    a: "MOSS-Moon",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "71",
  },
  {
    a: "Chinese-LLaMA-2-7B",
    b: "2023/6/7",
    c: "基座",
    d: "7B",
    e: "70",
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
      <el-table-column label="类型" prop="c" width="" align="center"> </el-table-column>
      <el-table-column label="参数量" prop="d" width="" align="center"> </el-table-column>
      <el-table-column label="学科能力(均分)" prop="e" width="" align="center"> </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
