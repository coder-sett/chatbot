<script setup lang="ts">
import Main from "./views/Main.vue"
import { ElConfigProvider } from "element-plus"
import type { EpPropMergeType } from "element-plus/es/utils/vue/props/types"
import { ref } from "vue"
</script>

<template>
  <ElConfigProvider size="large">
    <Main msg="Vite + Vue" />
  </ElConfigProvider>
</template>

<style scoped></style>
