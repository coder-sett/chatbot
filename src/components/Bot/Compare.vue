import { valueEquals } from 'element-plus'; import { log } from 'console';
<script setup lang="ts">
import { ref, computed, nextTick } from "vue"
import { useCompareStore, useChatStore } from "@/store"
import { onClickOutside } from "@vueuse/core"

const compareStore = useCompareStore()
const chatStore = useChatStore()
const compareList = computed(() => compareStore.CompareList)

const inputref = ref()
const activeName = ref("first")
const isSearch = ref(false)
const allList = ref(["ChatGPT-3.5", "ChatGPT-4", "vicuna-7b-v1.5", "chatGLM"])
const searchList2 = ref(["ChatGPT-3.5", "ChatGPT-4", "vicuna-7b-v1.5", "chatGLM"])

const target = ref(null)
onClickOutside(target, (event) => (isSearch.value = false))

const handleSearch = () => {
  isSearch.value = true
  setTimeout(() => {
    inputref.value.focus()
  })
}
const addCompare = (name) => {
  isSearch.value = false
  compareStore.addCompareList({ name })
}
const deleteCompare = (name) => {
  compareStore.deleteCompareItem({ name })
  chatStore.deleteSources(name)
}
</script>

<template>
  <div class="relative z-[70] mt-4 mb-5 flex min-h-[70px]">
    <div class="min-w-0 flex-1 rounded-tl-lg rounded-bl-lg bg-[#00B5EA] transition-all">
      <div class="overflow flex h-full transition-all">
        <div
          v-for="(i, index) in compareList"
          class="group relative min-w-[150px] flex-1 border-l-2 border-r-white bg-[#3A5BEF] p-3"
          :class="index === 0 ? 'rounded-tl-lg rounded-bl-lg !border-l-0' : ''"
        >
          <div
            class="absolute top-2 right-2 hidden cursor-pointer p-2 text-white group-hover:block"
            @click="deleteCompare(i.name)"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              class="text-base"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
              ></path>
            </svg>
          </div>
          <div class="mt-2 truncate text-2xl font-bold text-white">{{ i.name }}</div>
        </div>
      </div>
    </div>
    <div
      class="ml-0.5 w-24 flex-shrink-0 cursor-pointer rounded-tr-lg rounded-br-lg bg-[#00B5EA] text-white"
      :style="!isSearch ? 'width:96px' : 'width:350px'"
    >
      <div
        id="search-input"
        class="relative left-[60px] flex h-full w-full items-center justify-center transition-all"
        style="left: 0px"
        v-if="isSearch"
      >
        <div class="relative" ref="target">
          <div class="flex items-center rounded border">
            <input
              type="text"
              class="h-10 w-[200px] bg-transparent px-2 py-1 text-white outline-0 placeholder:text-white/60"
              placeholder="请输入仓库名"
              ref="inputref"
              value=""
            /><button
              class="flex h-10 w-24 items-center justify-center bg-white text-[#00B5EA] hover:bg-gray-100"
            >
              对比
            </button>
          </div>
          <div
            class="border-1 z-dropdown absolute right-0 top-[44px] min-w-[300px] rounded bg-white drop-shadow"
          >
            <div class="">
              <div class="flex w-full" v-for="(i, index) in allList">
                <div
                  @click="addCompare(i)"
                  class="line-clamp-1 w-full my-1 flex-shrink-0 whitespace-nowrap py-1 px-4 text-base text-black hover:bg-gray-100"
                >
                  {{ i }}
                </div>
              </div>
              <!-- <p  class="block px-4 py-3 text-center text-sm text-gray-400">未找到相关内容</p> -->
            </div>
          </div>
        </div>
      </div>
      <div
        id="add-compare-btn"
        class="flex h-full w-full flex-col items-center justify-center transition-all"
        v-if="!isSearch"
        @click="handleSearch"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          t="1551322312294"
          viewBox="0 0 1024 1024"
          version="1.1"
          class="text-2xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs></defs>
          <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
          <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
        </svg>
        <div>对比</div>
      </div>
    </div>
  </div>
</template>

<style></style>
