<script setup lang="ts">
import { computed, ref } from "vue"
import TextComponent from "./Text.vue"
import Star from "@/components/Common/Star.vue"
import { ChatLineRound } from "@element-plus/icons-vue"
import { useChatStore } from "@/store"
import { Picture } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"

interface Props {
  dateTime?: string
  text?: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
  id?: string
  botName: string
}

interface Emit {
  (ev: "regenerate"): void
  (ev: "delete"): void
}

const chatStore = useChatStore()
const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const textRef = ref<HTMLElement>()
const asRawText = ref(props.inversion)
const messageRef = ref<HTMLElement>()
const chatItem = ref<any>()
const comments = ref<string>("")
const showDialog = ref(false)
const innerVisible = ref(false)

const buttonDisabled = computed(() => {
  return !comments.value || comments.value.trim() === ""
})
const handleShowDialog = () => {
  const { chatList } = chatStore.getChatByName(props.botName)
  chatItem.value = chatList.find((item: any) => item.id === props.id)
  console.log(chatItem)
  showDialog.value = true
}
const handleClose = () => {
  comments.value = ""
  showDialog.value = false
  innerVisible.value = false
}
const handleEnter = () => {
  showDialog.value = false
}

const handleSubmit = () => {
  // showDialog.value = false
  innerVisible.value = true
}
const hostname = computed(() => {
  console.log(window.location)
  return window.location.origin + "/#/modelDetail?name=ChatGPT"
})
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
  <el-dialog v-model="showDialog" destroy-on-close>
    <template #header="{ titleId, titleClass }">
      <div class="my-header text-center">
        <h3 :id="titleId" :class="titleClass">评论</h3>
      </div>
    </template>
    <div class="px-4">
      <div class="my-2 overflow-auto max-h-[400px]">
        <div class="flex items-center mt-4">
          <div class="mr-2">Q:</div>
          <TextComponent
            ref="textRef"
            :inversion="true"
            :error="false"
            :text="chatItem.requestOptions.prompt"
            :loading="false"
            :as-raw-text="true"
            :isComment="true"
          />
        </div>
        <div class="flex items-center mt-4">
          <div class="mr-2">A:</div>
          <TextComponent
            ref="textRef"
            :inversion="false"
            :error="false"
            :text="chatItem.text"
            :loading="false"
            :as-raw-text="false"
            :isComment="true"
          />
        </div>
      </div>
      <div class="flex items-center mt-10 text-xl font-medium color-[#333]">
        <div class="mr-2">您对问答的满意度:</div>
        <Star />
      </div>
      <div class="flex my-10">
        <el-input class="my-box" size="large" v-model="comments" placeholder="输入评论" autosize>
          <!-- <template #append><el-button :icon="Picture" /></template> -->
        </el-input>
        <el-button
          size="large"
          class="ml-4"
          type="primary"
          :disabled="buttonDisabled"
          @click="handleSubmit"
          >发表</el-button
        >
      </div>
    </div>
    <el-dialog v-model="innerVisible" width="30%" title="发表成功" append-to-body>
      <span
        >点击 <a href="hostname">{{ hostname }}</a
        >可查看该评论
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleClose"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- <template #footer>
      <div class="dialog-footer px-4">
        <el-button @click="handleClose">关闭</el-button>
      </div>
    </template> -->
  </el-dialog>
</template>
