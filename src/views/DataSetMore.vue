<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Search, Close } from "@element-plus/icons-vue"
import { FileAdditionOne } from "@icon-park/vue-next"
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import openeuler from "@/assets/json/openeuler.json"
import axios from "axios"
import MarkdownIt from "markdown-it"

interface MyMap {
  [key: string]: { [key: string]: string }
}

const route = useRoute()
const router = useRouter()

const getAndPushElements = (start, count) => {
  // 使用 slice 方法获取指定位置的元素子数组
  const elements = openeuler.slice(start, start + count)
  // targetArr.push(...elements)
  return elements
}

let count = 10
const countList = ref(getAndPushElements(0, 20))
const select = ref(-1)
const selectItem = ref<any>(null)

const load = () => {
  console.log(123)
  countList.value.push(...getAndPushElements(count, 5))
  count += 5
}
const handleSelectItem = (index) => {
  if (select === index) {
    select.value = -1
  } else {
    select.value = index
    selectItem.value = openeuler[index]
  }
}

interface Tree {
  label: string
  type?: string
  children?: Tree[]
}
const typeFitler = ref("md")

const handleNodeClick = (data: Tree) => {
  if (data.label == "README.md") {
    typeFitler.value = "md"
  } else if (data.label == "openeuler.json") {
    typeFitler.value = "json"
  }
  console.log(data)
}

const data: Tree[] = [
  {
    label: "data",
    type: "folder",
    children: [
      {
        label: " json",
        type: "folder",
        children: [
          {
            label: "openeuler.json",
          },
        ],
      },
    ],
  },
  {
    label: "README.md",
  },
]

const defaultProps = {
  children: "children",
  label: "label",
}
const md = new MarkdownIt()
const res = md.render("# openEuler-XiaoZhi-Eval")
const feedback = ref(false)
const bug = ref<any>(null)
// axios.get("./assets/md/README.md").then((res) => {
//   console.log(res)
// })
const mouseSelectHandle = (event) => {
  console.log(bug.value)
  let select = window.getSelection()?.toString().trim()
  console.log(select)
  let ev = event || window.event
  let left = ev.clientX
  let top = ev.clientY
  // let select = selectText().trim()
  setTimeout(function () {
    if (select!.length > 0 && window.getSelection() && window.getSelection()?.type === "Range") {
      feedback.value = true
      bug.value.style.left = left + "px"
      bug.value.style.top = top + 10 + "px"
      select && (form.value.name = select)
    } else {
      feedback.value = false
    }
  }, 100)
}
const dialogFormVisible = ref(false)
const form = ref({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
  email: "",
})
document.onclick = function () {
  feedback.value = false
}
const check = ref(false)
</script>

<template>
  <div class="w-full h-full relative overflow-hidden flex flex-col justify-between bg-[#fafafa]">
    <div
      v-show="feedback"
      ref="bug"
      class="fixed cursor-pointer w-8"
      @click="dialogFormVisible = true"
    >
      <img src="https://docs.openeuler.org/img/detail/bug.svg" />
    </div>
    <Header />
    <section
      style="height: calc(100vh - 64px)"
      class="flex-1 flex overflow-hidden flex-col bg-[#fafafa] w-full"
    >
      <div class="flex flex-1 w-full overflow-hidden">
        <div class="bg-white h-full p-4 w-[300px] rounded overflow-hidden">
          <el-tree
            :highlight-current="true"
            size="large"
            :data="data"
            :props="defaultProps"
            :default-expand-all="true"
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <div class="custom-tree-node flex items-center">
                <el-icon class="mr-2">
                  <Folder v-if="data.type == 'folder'" />
                  <DocumentRemove v-else />
                </el-icon>
                <!-- <el-icon><DocumentRemove /></el-icon> -->
                <span>{{ node.label }}</span>
              </div>
            </template>
          </el-tree>
        </div>
        <div class="bg-white ml-2 flex-1 p-3 h-full" @mouseup="mouseSelectHandle">
          <!-- <div class="flex justify-end">
           <el-icon class="cursor-pointer" @click="showSide = false"><Close /></el-icon> 
          </div> -->
          <div v-if="typeFitler === 'json'" class="h-full">
            <ul
              v-infinite-scroll="load"
              :infinite-scroll-immediate="false"
              class="infinite-list h-full"
            >
              <li
                v-for="(i, index) in countList"
                :key="index"
                class="infinite-list-item cursor-pointer flex items-center w-full px-2 py-6"
                :class="select === index && '!bg-[#e3f1ff]'"
              >
                <div class="w-12 text-center mr-6 flex-shrink-0">{{ index + 1 }}</div>
                <div class="flex-1">
                  <div class="border border-[#b7eb8f] rounded-md bg-[#f6ffed] px-4 py-3 flex">
                    <div><span class="rounded-md bg-white font-semibold p-2">prompt:</span></div>
                    {{ i.prompt }}
                  </div>

                  <div class="border border-[#fdba74] rounded-md bg-[#fff7ed] px-4 py-3 mt-4 flex">
                    <div><span class="rounded-md bg-white font-semibold p-2">answer:</span></div>
                    <div class="ml-2">{{ i.answer }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="p-4" v-else>
            <div v-html="res"></div>
            <div class="mt-6 text-base">openEuler 小智智能问答机器人验证集</div>
          </div>
        </div>
      </div>
    </section>
    <el-dialog v-model="dialogFormVisible" :center="true" title="提交修改">
      <el-form :model="form" label-position="top">
        <el-form-item label="修改片段">
          <el-input v-model="form.name" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="提交类型">
          <el-select v-model="form.region" placeholder="">
            <el-option label="issue" value="shanghai" />
            <el-option label="PR" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input v-model="form.desc" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="您的邮箱">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer items-center flex flex-col">
          <el-radio v-model="check"
            >您理解并同意，您填写并提交的内容，即视为您已充分阅读并同意compass的隐私声明</el-radio
          >
          <el-button type="primary" @click="dialogFormVisible = false"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- <Footer /> -->
  </div>
</template>

<style>
.el-tabs__nav-wrap:after {
  /* height: 0px; */
}
.el-textarea__inner {
  padding: 8px;
}
.el-card__body {
  padding: 8px 16px;
}
.infinite-list {
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;
}
/* .infinite-list-item:nth-of-type(even) {
  background: #fafafa;
} */
.infinite-list-item:hover {
  background: #f3f9ff;
}
.infinite-list .infinite-list-item {
  border-bottom: 1px solid #ebeef5;
  /* height: 80px; */
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  color: #3a5bef;
}
</style>
