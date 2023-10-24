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
  <div class="w-full mb-4 px-2">
    <div class="my-4">
      <h3 class="font-semibold mb-5 text-xl">规则</h3>
      <ul class="list-disc px-4">
        <li class="my-2">与两个匿名模型并排聊天，并投票选出哪个更好!</li>
        <li class="my-2">你可以在投票前进行多次对话。模型的名称将在你投票后揭晓。</li>
        <!-- <li class="my-2">
          The names of the models will be revealed after your vote. Conversations with identity
          keywords (e.g., ChatGPT, Bard, Vicuna) or any votes after the names are revealed will not
          count towards the leaderboard.
        </li> -->
        <li class="my-2">点击“清除历史记录”开始新一轮。</li>
      </ul>
      <h3 class="font-semibold my-5 text-xl">Battle</h3>
      请向下滚动并开始聊天。这些模型包括两个模型(例如ChatGPT)。
    </div>
    <div class="w-full h-[640px] py-4 flex flex-col">
      <div class="flex-1 w-full grid grid-cols-2 gap-6 h-full">
        <div class="h-full rounded-xl overflow-hidden flex flex-col my-box">
          <div class="h-8 mt-3 ml-4">
            <span class="font-semibold"
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
        <div class="h-full rounded-xl overflow-hidden flex flex-col my-box">
          <div class="h-8 mt-3 ml-4">
            <span class="font-semibold"
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
    <div class="mt-8 flex">
      <el-input size="large" v-model="prompt" placeholder="" @keypress="handleEnter" />
      <el-button
        size="large"
        class="ml-4"
        type="primary"
        :disabled="buttonDisabled"
        @click="handleSubmit"
        >发送</el-button
      >
    </div>
    <div class="mt-8 grid grid-cols-3 gap-4">
      <el-button class="!ml-0" :icon="CircleClose" :disabled="!loading" @click="handleStop"
        >停止生成
      </el-button>
      <el-button class="!ml-0" :icon="Refresh" :disabled="loading" @click="handleRegenerate"
        >重新生成</el-button
      >
      <el-button class="!ml-0" :disabled="loading" @click="handleDelete">🗑️ 清除历史记录</el-button>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.my-box {
  box-shadow: 0 0 2px #919eab33, 0 4px 24px #919eab24;
}
</style>
