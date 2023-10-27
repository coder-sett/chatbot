<script setup lang="ts">
import { computed, ref } from "vue"
import TextComponent from "./Text.vue"
import { ChatLineRound } from "@element-plus/icons-vue"

interface Props {
  dateTime?: string
  text?: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
  id?: string
  botName?: string
}

interface Emit {
  (ev: "regenerate"): void
  (ev: "delete"): void
}

const showDialog = ref(false)
const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const textRef = ref<HTMLElement>()
const asRawText = ref(props.inversion)
const messageRef = ref<HTMLElement>()
console.log(props.botName)
const handleShowDialog = () => {
  console.log(props.botName)
  showDialog.value = true
}
</script>

<template>
  <div
    ref="messageRef"
    class="flex w-full mb-2 overflow-hidden"
    :class="[{ 'flex-row-reverse': inversion }]"
  >
    <div
      class="overflow-hidden text-sm flex mt-3 mx-4"
      :class="[inversion ? 'flex-row-reverse' : 'flex-row']"
    >
      <TextComponent
        ref="textRef"
        :inversion="inversion"
        :error="error"
        :text="text"
        :loading="loading"
        :as-raw-text="asRawText"
      />
      <div class="flex flex-col-reverse">
        <el-tooltip effect="dark" content="评论" placement="top">
          <button
            v-if="!inversion"
            class="mb-1 ml-2 p-0 border-0 bg-white text-[#b4bbc4] transition hover:text-[#1a73e8] hover:border-0 focus:outline-0"
            @click="handleShowDialog"
          >
            <ChatLineRound style="width: 16px; height: 16px" />
          </button>
        </el-tooltip>
      </div>
    </div>
  </div>
  <el-dialog v-model="showDialog">
    <template #header="{ titleId, titleClass }">
      <div class="my-header text-center">
        <h3 :id="titleId" :class="titleClass">评论</h3>
      </div>
    </template>
  </el-dialog>
</template>
