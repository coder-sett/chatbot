<script setup lang="ts">
import { computed, ref } from "vue"
import TextComponent from "./Text.vue"

interface Props {
  dateTime?: string
  text?: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
}

interface Emit {
  (ev: "regenerate"): void
  (ev: "delete"): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const textRef = ref<HTMLElement>()

const asRawText = ref(props.inversion)

const messageRef = ref<HTMLElement>()

function handleRegenerate() {
  messageRef.value?.scrollIntoView()
  emit("regenerate")
}

async function handleCopy() {
  try {
    // await copyToClip(props.text || '')
  } catch {}
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
      <!-- <div class="flex flex-col">
        <button
          v-if="!inversion"
          class="mb-2 transition text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-300"
          @click="handleRegenerate"
        ></button>
      </div> -->
    </div>
  </div>
</template>
