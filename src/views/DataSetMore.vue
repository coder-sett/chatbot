<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import openeuler from "@/assets/json/openeuler.json"
import MarkdownIt from "markdown-it"
import type { FormInstance, FormRules } from "element-plus"
interface MyMap {
  [key: string]: { [key: string]: string }
}
// import { ElTree } from "element-plus"

const route = useRoute()
const router = useRouter()
const tree = ref()

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
const addURL = (anchorName) => {
  // 检查当前URL是否已经包含锚点
  if (route.hash) {
    // 如果存在锚点，则替换它
    router.replace({ hash: "#" + anchorName })
  } else {
    // 如果不存在锚点，则添加它
    router.push({ hash: "#" + anchorName })
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
    addURL(data.label)
  } else if (data.label == "openeuler.json") {
    typeFitler.value = "json"
    addURL(data.label)
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
interface RuleForm {
  name: string
  type: string
  check: boolean
  email: string
  desc: string
}
const form = ref({
  name: "",
  type: "",
  check: [],
  desc: "",
  email: "",
})
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: "请输入修改片段", trigger: "blur" }],
  desc: [{ required: true, message: "请输入问题描述", trigger: "blur" }],
  type: [
    {
      required: true,
      message: "请选择提交类型",
      trigger: "change",
    },
  ],
  check: [
    {
      type: "array",
      required: true,
      message: "请勾选同意协议",
      trigger: "change",
    },
  ],
  email: [
    {
      required: true,
      message: "请输入email",
      trigger: "change",
    },
  ],
})
const ruleFormRef = ref<FormInstance>()
document.onclick = function () {
  feedback.value = false
}
function issueTemplate(data) {
  // let Problem = ""
  // data.existProblem.length ? (Problem = `- ${data.existProblem.join("、")}`) : ""
  return `1. 【文档链接】

> ${data.link}

2. 【修改片段】

> ${data.name.replace(/(\r\n|\r|\n)+/g, "$1")}

3. 【问题描述】

> ${data.desc.replace(/(\r\n|\r|\n)+/g, "$1")}
`
}
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(1)
      const issue = {
        link: window.location.href,
        ...form.value,
      }
      let body = encodeURIComponent(issueTemplate(issue))
      let url = ""
      if ((typeFitler.value = "md")) {
        url = "main/data/json/openeuler.json"
      } else {
        url = "main/README.md"
      }
      console.log(body)
      try {
        if (form.value.type === "issue") {
          // 此处为提交issue打开的地址，该地址应为用到的捉虫功能的网站的代码仓的地址，此处使用openEuler的文档代码仓地址作为演示
          window.open(
            `http://159.138.5.80:5609/Compass/openEuler-XiaoZhi-Eval/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0&title=问题反馈&body=${body}`
          )
        } else {
          // 此处为提交PR打开的地址，该地址应为用到的捉虫功能的网站的代码仓的地址，此处使用openEuler的文档代码仓地址作为演示
          window.open(
            `http://159.138.5.80:5609/Compass/openEuler-XiaoZhi-Eval/_edit/${url}?search=${form.value.name}&title=修改提交&body=${form.value.desc}&message=${form.value.desc}`
          )
        }
      } catch (error) {
        console.error(error)
      }
      dialogFormVisible.value = false
    } else {
      console.log("error submit!", fields)
    }
  })
}

onMounted(() => {
  if (route.hash) {
    console.log(route.hash)
    let curLabel = route.hash.substring(1)
    tree.value!.setCurrentKey(curLabel)
    if (curLabel == "README.md") {
      typeFitler.value = "md"
    } else if (curLabel == "openeuler.json") {
      typeFitler.value = "json"
    }
  }
})
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
            :rules="rules"
            :props="defaultProps"
            :default-expand-all="true"
            @node-click="handleNodeClick"
            node-key="label"
            ref="tree"
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
                    <div class="ml-2">{{ i.prompt }}</div>
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
      <el-form :model="form" ref="ruleFormRef" :rules="rules" status-icon label-position="top">
        <el-form-item label="修改片段" prop="name">
          <el-input v-model="form.name" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="提交类型" prop="type">
          <el-select v-model="form.type" placeholder="">
            <el-option label="issue" value="issue" />
            <el-option label="PR" value="PR" />
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述" prop="desc">
          <el-input v-model="form.desc" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="您的邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="" prop="check">
          <el-checkbox-group v-model="form.check">
            <el-checkbox
              >您理解并同意，您填写并提交的内容，即视为您已充分阅读并同意compass的隐私声明</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer items-center flex flex-col">
          <el-button type="primary" @click="submit(ruleFormRef)"> 提交 </el-button>
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
