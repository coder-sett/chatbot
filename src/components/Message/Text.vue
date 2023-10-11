<script lang="ts" setup>
import { computed, onMounted, onUnmounted, onUpdated, ref } from "vue"
import MarkdownIt from "markdown-it"
import mdKatex from "@traptitech/markdown-it-katex"
import mila from "markdown-it-link-attributes"
import hljs from "highlight.js"

interface Props {
  inversion?: boolean
  error?: boolean
  text?: string
  loading?: boolean
  asRawText?: boolean
}

const props = defineProps<Props>()

const textRef = ref<HTMLElement>()

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ""
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, "")
  },
})

mdi.use(mila, { attrs: { target: "_blank", rel: "noopener" } })
mdi.use(mdKatex, { blockClass: "katexmath-block rounded-md p-[10px]", errorColor: " #cc0000" })

const wrapClass = computed(() => {
  return [
    "text-wrap",
    "min-w-[20px] px-3 py-2",
    "rounded-xl",
    props.inversion
      ? "bg-[#fff7ed] border border-[#fdba74] text-[#24292f] rounded-br-none"
      : "bg-[#f6f8fa] border border-[#e5e7eb] text-[#24292f] rounded-bl-none",
    // props.inversion ? "message-request" : "message-reply",
    { "text-red-500": props.error },
  ]
})

const text = computed(() => {
  console.log(props.asRawText)
  const value = props.text ?? ""
  if (!props.asRawText) return mdi.render(value)
  return value
})

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy"></span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

function addCopyEvents() {
  // if (textRef.value) {
  //   const copyBtn = textRef.value.querySelectorAll('.code-block-header__copy')
  //   copyBtn.forEach((btn) => {
  //     btn.addEventListener('click', () => {
  //       const code = btn.parentElement?.nextElementSibling?.textContent
  //       if (code) {
  //         copyToClip(code).then(() => {
  //           btn.textContent = '复制成功'
  //           setTimeout(() => {
  //             btn.textContent = '复制代码'
  //           }, 1000)
  //         })
  //       }
  //     })
  //   })
  // }
}

function removeCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll(".code-block-header__copy")
    copyBtn.forEach((btn) => {
      btn.removeEventListener("click", () => {})
    })
  }
}

onMounted(() => {
  addCopyEvents()
})

onUpdated(() => {
  addCopyEvents()
})

onUnmounted(() => {
  removeCopyEvents()
})
</script>

<template>
  <div class="text-black" :class="wrapClass">
    <div ref="textRef" class="leading-relaxed break-words">
      <div v-if="!inversion">
        <template v-if="loading">
          <div>
            <el-icon class="is-loading">
              <Loading />
            </el-icon></div
        ></template>
        <template v-else>
          <div
            v-if="!asRawText"
            class="markdown-body"
            :class="{ 'markdown-body-generate': loading }"
            v-html="text"
          />
          <div v-else class="whitespace-pre-wrap" v-text="text" />
        </template>
      </div>
      <div v-else class="whitespace-pre-wrap" v-text="text" />
    </div>
  </div>
</template>

<style lang="css">
.code-block-wrapper {
  position: relative;
  background-color: #fff;
  padding-top: 8px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  border-radius: 6px;
}
.code-block-header {
  position: absolute;
  top: 5px;
  right: 0;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #b3b3b3;
}
.hljs {
  background-color: #fff !important;
}
/* .markdown-body .code-block-wrapper {
  position: relative;
  padding-top: 24px;
  background-color: #fff;
}
.markdown-body .highlight pre,
.markdown-body > pre {

}
.hljs {
  background-color: #fff !important;
}
.markdown-body .highlight > pre,
.markdown-body > pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  border-radius: 6px;
}

.code-block-wrapper {
  position: relative;
  padding-top: 24px;
}

.code-block-header {
  position: absolute;
  top: 5px;
  right: 0;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #b3b3b3;

  &__copy {
    cursor: pointer;
    margin-left: 0.5rem;
    user-select: none;

    &:hover {
      color: #65a665;
    }
  }
} */
</style>
