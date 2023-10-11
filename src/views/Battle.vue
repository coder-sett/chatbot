<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { Refresh, CircleClose } from "@element-plus/icons-vue"
import { fetchBotList, fetchChatAPIProcess } from "@/api"
import Message from "../components/Message/index.vue"
interface Chat {
  dateTime: string
  text: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
  conversationOptions?: null
  requestOptions: { prompt: string; options?: null }
}
const loading = ref<boolean>(true)
const prompt = ref<string>("")
const botList = ref<any>([])
const dataSourcesA = ref<any>([])
const dataSourcesB = ref<any>([])
const modelA = ref<string>("")
const modelB = ref<string>("")
const showName = ref<boolean>(false)
const showBtn = ref<boolean>(false)

let controllerA = new AbortController()
let controllerB = new AbortController()

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
    modelA.value = "gpt-3.5-turbo"
    modelB.value = "vicuna-7b-v1.5"
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
const buttonDisabled = computed(() => {
  return loading.value || !prompt.value || prompt.value.trim() === ""
})
const addChat = (obj: Chat) => {
  dataSourcesA.value.push(obj)
  dataSourcesB.value.push(obj)
}
const updateChat = (index: number, sources: any, obj: Chat) => {
  sources.value[index] = obj
}
const handleSubmit = async () => {
  let message = prompt.value

  if (loading.value) return

  if (!message || message.trim() === "") return

  controllerA = new AbortController()
  controllerB = new AbortController()

  addChat({
    dateTime: new Date().toLocaleString(),
    text: message,
    inversion: true,
    error: false,
    conversationOptions: null,
    requestOptions: { prompt: message, options: null },
  })
  addChat({
    dateTime: new Date().toLocaleString(),
    text: "",
    loading: true,
    inversion: false,
    error: false,
    conversationOptions: null,
    requestOptions: { prompt: message, options: null },
  })
  loading.value = true
  prompt.value = ""
  // let options: Chat.ConversationRequest = {}
  // const lastContext = conversationList.value[conversationList.value.length - 1]?.conversationOptions

  // if (lastContext && usingContext.value) options = { ...lastContext }
  try {
    let lastText = ""
    const fetchChatAPIOnce = async (
      model: string,
      sources: any,
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
          const text = list
            .map((item: string) => JSON.parse(item).choices[0].delta.content)
            .join("")
          // console.log(text)
          // Always process the final line
          // const lastIndex = responseText.lastIndexOf("\n", responseText.length - 2)
          // let chunk = responseText
          // if (lastIndex !== -1) chunk = responseText.substring(lastIndex)
          try {
            updateChat(dataSourcesA.value.length - 1, sources, {
              dateTime: new Date().toLocaleString(),
              text: text,
              inversion: false,
              error: false,
              loading: false,
              conversationOptions: null,
              requestOptions: { prompt: message, options: null },
            })
          } catch (error) {
            //
          }
        },
      })
    }

    const [result1, result2] = await Promise.all([
      fetchChatAPIOnce(modelA.value, dataSourcesA, controllerA),
      fetchChatAPIOnce(modelB.value, dataSourcesB, controllerB),
    ])
    showBtn.value = true
  } catch (error: any) {
    const errorMessage = error?.message ?? "出错了"
    updateChat(dataSourcesA.value.length - 1, dataSourcesA, {
      dateTime: new Date().toLocaleString(),
      text: errorMessage,
      inversion: false,
      error: true,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: null },
    })
    updateChat(dataSourcesB.value.length - 1, dataSourcesB, {
      dateTime: new Date().toLocaleString(),
      text: errorMessage,
      inversion: false,
      error: true,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: null },
    })
  } finally {
    loading.value = false
  }
}

function handleEnter(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault()
    handleSubmit()
  }
}
const handleDelete = () => {
  dataSourcesA.value = []
  dataSourcesB.value = []
  showBtn.value = false
}
const handleRegenerate = async () => {
  if (loading.value || dataSourcesA.value.length === 0) return

  controllerA = new AbortController()
  controllerB = new AbortController()

  const { requestOptions } = dataSourcesA.value[dataSourcesA.value.length - 1]
  loading.value = true
  let message = requestOptions?.prompt ?? ""
  updateChat(dataSourcesA.value.length - 1, dataSourcesA, {
    dateTime: new Date().toLocaleString(),
    text: "",
    loading: true,
    inversion: false,
    error: false,
    conversationOptions: null,
    requestOptions: { prompt: message, options: null },
  })
  updateChat(dataSourcesB.value.length - 1, dataSourcesB, {
    dateTime: new Date().toLocaleString(),
    text: "",
    loading: true,
    inversion: false,
    error: false,
    conversationOptions: null,
    requestOptions: { prompt: message, options: null },
  })
  try {
    let lastText = ""
    const fetchChatAPIOnce = async (
      model: string,
      sources: any,
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
          const text = list
            .map((item: string) => JSON.parse(item).choices[0].delta.content)
            .join("")
          // console.log(text)
          // Always process the final line
          // const lastIndex = responseText.lastIndexOf("\n", responseText.length - 2)
          // let chunk = responseText
          // if (lastIndex !== -1) chunk = responseText.substring(lastIndex)
          try {
            updateChat(dataSourcesA.value.length - 1, sources, {
              dateTime: new Date().toLocaleString(),
              text: text,
              inversion: false,
              error: false,
              loading: false,
              conversationOptions: null,
              requestOptions: { prompt: message, options: null },
            })
          } catch (error) {
            //
          }
        },
      })
    }

    const [result1, result2] = await Promise.all([
      fetchChatAPIOnce(modelA.value, dataSourcesA, controllerA),
      fetchChatAPIOnce(modelB.value, dataSourcesB, controllerB),
    ])
    showBtn.value = true
  } catch (error: any) {
    const errorMessage = error?.message ?? "出错了"
    updateChat(dataSourcesA.value.length - 1, dataSourcesA, {
      dateTime: new Date().toLocaleString(),
      text: errorMessage,
      inversion: false,
      error: true,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: null },
    })
    updateChat(dataSourcesB.value.length - 1, dataSourcesB, {
      dateTime: new Date().toLocaleString(),
      text: errorMessage,
      inversion: false,
      error: true,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: null },
    })
  } finally {
    loading.value = false
  }
}

const handleShowName = () => {
  showName.value = true
}
const handleStop = () => {
  if (loading.value) {
    controllerA.abort()
    controllerB.abort()
    loading.value = false
  }
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="w-full text-sm mb-4">
    <div class="my-4">
      <h3 class="font-semibold mb-3">Rules</h3>
      <ul class="list-disc px-4">
        <li>Chat with two anonymous models side-by-side and vote for which one is better!</li>
        <li>
          You can do multiple turns of conversations before voting. The names of the models will be
          revealed after your vote.
        </li>
        <li>
          The names of the models will be revealed after your vote. Conversations with identity
          keywords (e.g., ChatGPT, Bard, Vicuna) or any votes after the names are revealed will not
          count towards the leaderboard.
        </li>
        <li>Click “Clear history” to start a new round.</li>
      </ul>
      <h3 class="font-semibold my-3">Battle</h3>
      Please scroll down and start chatting. The models include both closed-source models (e.g.,
      ChatGPT) and open-source models (e.g., Llama).
    </div>
    <div class="w-full h-[640px] p-4 flex flex-col border rounded-sm">
      <div class="flex-1 w-full grid grid-cols-2 gap-4 h-full">
        <div class="border h-full rounded-sm overflow-hidden flex flex-col">
          <div class="h-8">
            <span class="border border-t-0 border-l-0 py-1 px-2"
              >modelA<span v-if="showName"
                >: <span class="text-[#eb3e1b]">{{ modelA }}</span></span
              ></span
            >
          </div>
          <div class="overflow-auto h-[560px]">
            <Message
              v-for="(item, index) of dataSourcesA"
              :key="index"
              :date-time="item.dateTime"
              :text="item.text"
              :inversion="item.inversion"
              :error="item.error"
              :loading="item.loading"
            />
          </div>
        </div>
        <div class="border h-full rounded-sm overflow-hidden flex flex-col">
          <div class="h-8">
            <span class="border border-t-0 border-l-0 py-1 px-2"
              >modelB<span v-if="showName"
                >: <span class="text-[#eb3e1b]">{{ modelB }}</span></span
              ></span
            >
          </div>
          <div class="overflow-auto h-[560px]">
            <Message
              v-for="(item, index) of dataSourcesB"
              :key="index"
              :date-time="item.dateTime"
              :text="item.text"
              :inversion="item.inversion"
              :error="item.error"
              :loading="item.loading"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="showBtn" class="w-full grid grid-cols-4 gap-4 mt-4">
      <el-button class="!ml-0" @click="handleShowName" type="primary">A is better</el-button>
      <el-button class="!ml-0" @click="handleShowName" type="primary">B is better</el-button>
      <el-button class="!ml-0" @click="handleShowName" type="primary">Tie</el-button>
      <el-button class="!ml-0" @click="handleShowName" type="primary">Both are bad</el-button>
    </div>
    <div class="mt-4 flex">
      <el-input v-model="prompt" placeholder="" @keypress="handleEnter" />
      <el-button class="ml-4" type="primary" :disabled="buttonDisabled" @click="handleSubmit"
        >Send</el-button
      >
    </div>
    <div class="mt-4 grid grid-cols-3 gap-4">
      <el-button class="!ml-0" :icon="CircleClose" :disabled="!loading" @click="handleStop"
        >Stop Responding
      </el-button>
      <el-button class="!ml-0" :disabled="loading" @click="handleDelete"
        >🗑️ Clear history</el-button
      >
      <el-button class="!ml-0" :icon="Refresh" :disabled="loading" @click="handleRegenerate"
        >Regenerate</el-button
      >
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
