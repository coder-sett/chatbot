<script setup lang="ts">
import { ref } from "vue"
import type { TabsPaneContext } from "element-plus"
import Battle from "./Battle.vue"
import BotBattle from "@/components/Bot/BotBattle.vue"
import DataSetTable from "@/components/Bot/DataSetTable.vue"
import { useRoute } from "vue-router"

const route = useRoute()
console.log(route.query.name)
defineProps<{ msg: string }>()

const activeName = ref("first")

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const tabPosition = ref("all")
</script>
<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <Header />
    <section class="flex-1 max-w-[1540px] w-full mx-auto my-4 px-5">
      <div class="flex items-center my-8 justify-between">
        <div class="text-xl font-semibold flex items-center">
          大语言模型评测榜单

          <el-radio-group v-model="tabPosition" style="margin-left: 30px">
            <el-radio-button label="all">全部数据集</el-radio-button>
            <el-radio-button label="1">中文数据集</el-radio-button>
            <el-radio-button label="2">英文数据集</el-radio-button>
          </el-radio-group>
        </div>

        <div class="">
          <a href="https://compass.gitee.com/zh/docs/dimensions-define/"> Compass 如何定义得分？</a>
        </div>
      </div>
      <el-tabs class="mb-0" size="large" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="综合榜单" size="large" name="first">
          <DataSetTable />
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="学科能力" name="first1">
          <DataSetTable />
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="语言能力" name="first12">
          <DataSetTable />
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="知识能力" name="first13">
          <DataSetTable />
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="理解能力" name="first14">
          <DataSetTable />
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="推理能力" name="first15">
          <DataSetTable />
        </el-tab-pane>
      </el-tabs>
    </section>
    <Footer />
  </div>
</template>

<style>
.el-tabs__item.is-active {
  /* color: black; */
}
.el-tabs__item {
  /* color: rgba(0, 0, 0, 0.6); */
}
.el-table__header .el-table__cell {
  background-color: #f5f6fd !important;
  color: black;
}
.el-tabs__item {
  font-size: 16px;
}
</style>
