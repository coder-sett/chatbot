<script setup lang="ts">
import { computed, ref } from "vue"
import TextComponent from "./Text.vue"
import { useChatStore } from "@/store"
import { StarFilled } from "@element-plus/icons-vue"

const val = ref(0)
</script>

<template>
  <div class="score">
    <el-icon
      v-for="i in 5"
      class="!w-8 !h-8 cursor-pointer"
      :style="{ color: i <= val ? '#f7ba1e' : '#cbc9ca' }"
      :key="i"
      @click="val = i"
      ><StarFilled style="width: 32px; height: 32px"
    /></el-icon>
    <!-- <i v-for="i in 5" :key="i" :icon="Star" :style="{ color: i < val ? '#f2c304' : '#cbc9ca' }"></i> -->
  </div>
</template>

<style scoped>
.score {
  height: 30px;
  font-size: 24px;
}
</style>
