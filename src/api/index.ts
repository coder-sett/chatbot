import type { AxiosProgressEvent, GenericAbortSignal } from "axios"
import { post, get } from "@/utils/request"

export function fetchBotList<T = any>() {
  return get<T>({
    url: "/v1/models",
  })
}

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal
) {
  return post<T>({
    url: "/chat",
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: "/config",
  })
}

export function fetchChatAPIProcess<T = any>(params: {
  model: string
  prompt: string
  options?: { conversationId?: string; parentMessageId?: string }
  signal?: GenericAbortSignal
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
}) {
  // const settingStore = useSettingStore()
  // const authStore = useAuthStore()

  let data: Record<string, any> = {
    model: params.model,
    stream: true,
    messages: [
      {
        role: "user",
        content: params.prompt,
      },
    ],
  }

  // if (authStore.isChatGPTAPI) {
  //   data = {
  //     ...data,
  //     systemMessage: settingStore.systemMessage,
  //     temperature: settingStore.temperature,
  //     top_p: settingStore.top_p,
  //   }
  // }

  return post<T>({
    url: "/v1/chat/completions",
    data,
    responseType: "stream",
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: "/session",
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: "/verify",
    data: { token },
  })
}
