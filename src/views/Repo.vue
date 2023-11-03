<script setup lang="ts">
import { ref, onMounted } from "vue"
import Header from "@/components/Header/index.vue"
</script>
<template>
  <div class="w-full overflow-auto h-full flex flex-col justify-between">
    <Header />
    <iframe
      id="myFrame"
      allowfullscreen
      frameborder="0"
      class="w-full"
      src="http://159.138.5.80:5609/guoqiangqi/EventPlatform"
    />
  </div>
</template>
<style>
iframe {
  display: block;
  border: none;
  height: calc(100vh - 64px); /*设置高度百分比,一直调到只有一个滚动调为止*/
}
</style>
