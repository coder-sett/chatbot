<script setup lang="ts">
import { ref, created, onMounted, computed } from "vue"
import { Refresh, CircleClose, Delete } from "@element-plus/icons-vue"
import { ThumbsUp, CloseOne, CommentOne, Comments } from "@icon-park/vue-next"
import { fetchBotList, fetchChatAPIProcess } from "@/api"
import Compare from "@/components/Bot/Compare.vue"
import MessageBox from "@/components/Bot/MessageBox.vue"
import Message from "@/components/Message/index.vue"
import { useCompareStore } from "@/store"
import { useChatStore } from "@/store"

interface Chat {
  dateTime: string
  text: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
  conversationOptions?: null
  requestOptions: { prompt: string; options?: null }
}
const compareStore = useCompareStore()
const chatStore = useChatStore()

const compareList = computed(() => compareStore.CompareList)
const loading = ref<boolean>(false)
const prompt = ref<string>("")
const botList = ref<any>([])
const showName = ref<boolean>(false)
const showBtn = ref<boolean>(false)
const isContext = ref<boolean>(false)

let controllerList = []
let prePrompt = ""

function getRandomElements(arr: any[], count: number) {
  const shuffled = arr.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
const init = async () => {
  try {
    loading.value = true
    const { data } = await fetchBotList()
    botList.value = data
    loading.value = false
    const list = getRandomElements(botList.value, 2)
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
const buttonDisabled = computed(() => {
  return loading.value || !prompt.value || prompt.value.trim() === ""
})

const addChat = (obj: Chat, name: string) => {
  chatStore.addChatByName(name, obj)
}
const updateChat = (obj: Chat, name: string) => {
  chatStore.updateChatByName(name, obj)
}

const fetchChatAPIOnce = async (
  model: string,
  message,
  controller: { signal: any } | undefined
) => {
  return await fetchChatAPIProcess({
    model: model,
    prompt: message,
    signal: controller?.signal,
    onDownloadProgress: ({ event }) => {
      const xhr = event.target
      // console.log(xhr)
      const { responseText } = xhr
      const list = responseText.split("data:")
      list.shift()
      const text = list.map((item: string) => JSON.parse(item).choices[0].delta.content).join("")
      try {
        updateChat(
          {
            dateTime: new Date().toLocaleString(),
            text: text,
            inversion: false,
            error: false,
            loading: false,
            conversationOptions: null,
            requestOptions: { prompt: message, options: null },
          },
          model
        )
      } catch (error) {
        console.log(error)
        //
      }
    },
  })
}
const handleSubmit = async () => {
  let message = prompt.value
  prePrompt = prompt.value
  if (loading.value) return

  if (!prePrompt || prePrompt.trim() === "") return
  loading.value = true

  const promiseList = []
  const botList = []
  controllerList = []

  compareList.value.forEach((element) => {
    addChat(
      {
        dateTime: new Date().toLocaleString(),
        text: prePrompt,
        inversion: true,
        error: false,
        conversationOptions: null,
        requestOptions: { prompt: prePrompt, options: null },
      },
      element.name
    )
    addChat(
      {
        dateTime: new Date().toLocaleString(),
        text: "",
        loading: true,
        inversion: false,
        error: false,
        conversationOptions: null,
        requestOptions: { prompt: prePrompt, options: null },
      },
      element.name
    )
    botList.push(element.name)
    let controller = new AbortController()
    controllerList.push(controller)
    promiseList.push(fetchChatAPIOnce(element.name, prePrompt, controller))
  })

  try {
    const resultList = await Promise.allSettled(promiseList)
    resultList.forEach((item, index) => {
      if (item.status === "rejected") {
        updateChat(
          {
            dateTime: new Date().toLocaleString(),
            text: item.reason.message ?? "出错了",
            inversion: false,
            error: true,
            loading: false,
            conversationOptions: null,
            requestOptions: { prompt: prePrompt, options: null },
          },
          botList[index]
        )
      }
    })

    showBtn.value = true
  } catch (error: any) {
    const errorMessage = error?.message ?? "出错了"
    console.log(errorMessage, error)
  } finally {
    loading.value = false
  }
  prompt.value = ""
}

const handleEnter = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault()
    handleSubmit()
  }
}
const handleDelete = () => {
  chatStore.clearChat()
  showBtn.value = false
  prePrompt = ""
}
const handleRegenerate = async () => {
  console.log(prePrompt)
  if (loading.value || prePrompt == "") return
  loading.value = true
  const promiseList = []
  const botList = []
  controllerList = []
  let message = prePrompt
  console.log(message)
  compareList.value.forEach((element) => {
    addChat(
      {
        dateTime: new Date().toLocaleString(),
        text: message,
        inversion: true,
        error: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: null },
      },
      element.name
    )
    addChat(
      {
        dateTime: new Date().toLocaleString(),
        text: "",
        loading: true,
        inversion: false,
        error: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: null },
      },
      element.name
    )
    botList.push(element.name)
    let controller = new AbortController()
    controllerList.push(controller)
    promiseList.push(fetchChatAPIOnce(element.name, message, controller))
  })

  try {
    const resultList = await Promise.allSettled(promiseList)
    resultList.forEach((item, index) => {
      if (item.status === "rejected") {
        updateChat(
          {
            dateTime: new Date().toLocaleString(),
            text: item.reason.message ?? "出错了",
            inversion: false,
            error: true,
            loading: false,
            conversationOptions: null,
            requestOptions: { prompt: message, options: null },
          },
          botList[index]
        )
      }
    })
    showBtn.value = true
  } catch (error: any) {
    const errorMessage = error?.message ?? "出错了"
    console.log(errorMessage, error)
  } finally {
    loading.value = false
  }
  prompt.value = ""
}
const handleStop = () => {
  if (loading.value) {
    controllerList.forEach((item) => {
      item?.abort()
    })
    loading.value = false
  }
}
const handleShowName = () => {
  showName.value = true
}

onMounted(() => {
  // init()
})
</script>

<template>
  <div class="w-full mb-4 px-2">
    <Compare />
    <div class="w-full h-[640px] py-4 flex flex-col">
      <div class="flex-1 w-full flex gap-4 h-full">
        <MessageBox v-for="item in compareList" :bot="item" />
      </div>
    </div>
    <div v-if="showBtn" class="w-full grid grid-cols-4 gap-4 mt-4">
      <el-button class="!ml-0" @click="handleShowName" type="primary">A is better</el-button>
      <el-button class="!ml-0" @click="handleShowName" type="primary">B is better</el-button>
      <el-button class="!ml-0" @click="handleShowName" type="primary">Tie</el-button>
      <el-button class="!ml-0" @click="handleShowName" type="primary">Both are bad</el-button>
    </div>
    <div class="mt-8 flex items-center justify-between space-x-4">
      <el-tooltip effect="dark" content="停止生成" placement="top">
        <el-button size="large" circle :icon="CloseOne" :disabled="!loading" @click="handleStop">
        </el-button>
      </el-tooltip>

      <el-tooltip effect="dark" content="重新生成" placement="top">
        <el-button
          size="large"
          circle
          :icon="Refresh"
          :disabled="loading"
          @click="handleRegenerate"
        ></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="清除历史记录" placement="top">
        <el-button
          size="large"
          circle
          :icon="Delete"
          :disabled="loading"
          @click="handleDelete"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        v-if="isContext"
        effect="dark"
        content="当前是多轮对话，点击切换单轮对话"
        placement="top"
      >
        <el-button
          size="large"
          circle
          :icon="Comments"
          :disabled="loading"
          @click="isContext = !isContext"
        ></el-button>
      </el-tooltip>
      <el-tooltip v-else effect="dark" content="当前是单轮对话，点击切换多轮对话" placement="top">
        <el-button
          size="large"
          circle
          :icon="CommentOne"
          :disabled="loading"
          @click="isContext = !isContext"
        ></el-button>
      </el-tooltip>

      <el-input
        class="my-box"
        size="large"
        v-model="prompt"
        placeholder=""
        @keypress="handleEnter"
      />
      <el-button
        size="large"
        class="ml-4"
        type="primary"
        :disabled="buttonDisabled"
        @click="handleSubmit"
        >发送</el-button
      >
    </div>
  </div>
</template>

<style>
.my-box {
  box-shadow: 0 0 2px #919eab33, 0 4px 24px #919eab24;
}
.el-input__wrapper {
  /* box-shadow: 0 0 2px #dcdfe6, 0 2px 6px #dcdfe6; */
}
.el-input__wrapper:hover {
  /* box-shadow: 0 0 2px #dcdfe6, 0 2px 6px #dcdfe6; */
}
.el-icon {
  font-size: 18px;
}
</style>
