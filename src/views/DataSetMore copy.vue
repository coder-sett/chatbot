<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Search, Close } from "@element-plus/icons-vue"
import { FileAdditionOne } from "@icon-park/vue-next"
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import openeuler from "@/assets/json/openeuler.json"
console.log(openeuler)

interface MyMap {
  [key: string]: { [key: string]: string }
}

const route = useRoute()
const router = useRouter()

const typeFitler = ref("全部")
const showSide = ref(false)

const typeOptions = [
  {
    value: "全部",
    label: "全部",
  },
  {
    value: "与我相关",
    label: "与我相关",
  },
  {
    value: "我创建的",
    label: "我创建的",
  },
]

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
    showSide.value = false
  } else {
    select.value = index
    showSide.value = true
    selectItem.value = openeuler[index]
  }
}

interface Tree {
  label: string
  type?: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
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
</script>

<template>
  <div class="w-full h-full overflow-hidden flex flex-col justify-between bg-[#fafafa]">
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
        <div class="bg-white ml-2 flex-1 p-3 h-full">
          <div class="">
            <div class="flex justify-end">
              <el-icon class="cursor-pointer" @click="showSide = false"><Close /></el-icon>
            </div>
            <div class="">
              <!-- <ul
            v-infinite-scroll="load"
            :infinite-scroll-immediate="false"
            class="infinite-list h-full"
          >
            <li
              v-for="(i, index) in countList"
              :key="index"
              class="infinite-list-item cursor-pointer flex items-center w-full p-2"
              :class="select === index && '!bg-[#e3f1ff]'"
              @click="handleSelectItem(index)"
            >
              <div class="w-12 text-center mr-8 flex-shrink-0">{{ index + 1 }}</div>
              <div class="flex-1">
                <div>Q : {{ i.prompt }}</div>
                <div class="overflow-hidden line-clamp-1">A : {{ i.answer }}</div>
              </div>
            </li>
          </ul> -->
            </div>
          </div>
        </div>
      </div>
    </section>
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
.infinite-list-item:nth-of-type(even) {
  background: #fafafa;
}
.infinite-list-item:hover {
  background: #f3f9ff;
}
.infinite-list .infinite-list-item {
  border-bottom: 1px solid #ebeef5;
  height: 80px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  color: #3a5bef;
}
</style>
