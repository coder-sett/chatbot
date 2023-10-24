<script setup lang="ts">
import Main from "./views/Main.vue"
import { ElConfigProvider } from "element-plus"
import type { EpPropMergeType } from "element-plus/es/utils/vue/props/types"
import { ref } from "vue"
</script>

<template>
  <ElConfigProvider>
    <!-- <Main /> -->
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>
