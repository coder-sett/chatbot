import { defineStore } from "pinia"

export interface Chat {
  dateTime: string
  text: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
  conversationOptions?: null
  id?: string
  requestOptions: { prompt: string; options?: null }
}
export interface ChatSources {
  name: string
  chatList: Chat[]
}
export interface ChatStore {
  chatStoreList: ChatSources[]
}
export const useChatStore = defineStore("chat-store", {
  state: (): ChatStore => {
    return {
      chatStoreList: [],
    }
  },

  getters: {
    getChatByName(state) {
      return (botName: string) => {
        return state.chatStoreList.find((item: ChatSources) => item.name === botName)
      }
    },
  },

  actions: {
    addChatSources(botName: string) {
      console.log(botName)
      this.$state.chatStoreList.push({ name: botName, chatList: [] })
    },
    deleteSources(botName: string) {
      const index = this.chatStoreList.findIndex((item: ChatSources) => item.name === botName)
      this.$state.chatStoreList.splice(index, 1)
    },
    addChatByName(botName: string, chat: Chat) {
      const item = this.chatStoreList.find((item: ChatSources) => item.name === botName)
      !chat.id && (chat.id = String(item?.chatList.length))
      item?.chatList.push(chat)
    },
    updateChatByName(botName: string, chat: Chat) {
      const item = this.chatStoreList.find((item: ChatSources) => item.name === botName)
      const chatList = item!.chatList
      !chat.id && (chat.id = String(chatList.length))
      item!.chatList[chatList.length - 1] = chat
    },
    clearChat() {
      this.chatStoreList.forEach((item) => [(item.chatList = [])])
    },
  },
})
