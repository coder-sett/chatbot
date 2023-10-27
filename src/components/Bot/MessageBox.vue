import { log } from 'console';
<script setup lang="ts">
import { ref } from "vue"
import { CompareItem } from "@/store"
import { useChatStore } from "@/store"

const { bot } = defineProps<{ bot: CompareItem }>()
const chatStore = useChatStore()
chatStore.addChatSources(bot.name)
const dataSources = chatStore.getChatByName(bot.name)
console.log(dataSources)
</script>

<template>
  <div class="h-full flex-1 rounded-xl overflow-hidden flex flex-col my-box">
    <div class="h-8 mt-3 ml-4">
      <span class="font-semibold">{{ bot.name }}</span>
    </div>
    <div class="overflow-auto h-[560px]">
      <Message
        v-for="(item, index) of dataSources.chatList"
        :botName="bot.name"
        :key="index"
        :id="item.id"
        :date-time="item.dateTime"
        :text="item.text"
        :inversion="item.inversion"
        :error="item.error"
        :loading="item.loading"
      />
    </div>
  </div>
</template>

<style scoped>
.my-box {
  box-shadow: 0 0 2px #919eab33, 0 4px 24px #919eab24;
}
</style>
