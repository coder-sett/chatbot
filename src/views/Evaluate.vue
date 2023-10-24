<script setup lang="ts">
import { ref } from "vue"
import type { TabsPaneContext } from "element-plus"
import Battle from "./Battle.vue"
import Side from "./Side.vue"
import BotBattle from "@/components/Bot/BotBattle.vue"

defineProps<{ msg: string }>()

const activeName = ref("first")

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <Header />
    <section class="flex-1 max-w-[1240px] w-full mx-auto my-8 px-5">
      <el-tabs class="mb-0" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Chatbot Compass (compare)" name="first">
          <BotBattle />
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="Chatbot Compass (battle)" name="first1">
          <Battle />
        </el-tab-pane>
        <!-- <el-tab-pane :lazy="true" label="Chatbot Compass (side-by-side)" name="second">
          <Side
        /></el-tab-pane> -->
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
</style>
