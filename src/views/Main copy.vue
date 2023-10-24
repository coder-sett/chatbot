<script setup lang="ts">
import { ref } from "vue"
import type { TabsPaneContext } from "element-plus"
import Battle from "./Battle.vue"
import Side from "./Side.vue"

defineProps<{ msg: string }>()

const activeName = ref("first")

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <section class="flex-1 max-w-[1240px] w-full mx-auto my-5 px-5">
      <el-tabs class="mb-0" type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Chatbot Compass (battle)" name="first">
          <Battle />
        </el-tab-pane>
        <el-tab-pane label="Chatbot Compass (side-by-side)" name="second"> <Side /></el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
