<script setup lang="ts">
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import { useRouter } from "vue-router";
import rowData from "@/assets/json/tpc_license.json";
import active from "@/assets/active.png";

// autocorrect: false
const rowDataObj = {};
rowData.forEach((item) => {
  let type = item.组件分类;
  if (!item.imgUrl) {
    if (item.raw_URL === "无") {
      item["imgUrl"] = "https://gitee.com/openharmony-tpc.png";
    } else {
      if (
        item.raw_URL.includes("github.com") ||
        item.raw_URL.includes("gitee.com")
      ) {
        let splitlist = item.raw_URL.split("/");
        console.log(splitlist);
        item["imgUrl"] =
          splitlist[0] + "//" + splitlist[2] + "/" + splitlist[3] + ".png";
      } else {
        item["imgUrl"] = "https://gitee.com/openharmony-tpc.png";
      }
    }
  }

  if (type) {
    rowDataObj[type]
      ? rowDataObj[type].push(item)
      : (rowDataObj[type] = [item]);
  } else {
    rowDataObj["其他"]
      ? rowDataObj["其他"].push(item)
      : (rowDataObj["其他"] = [item]);
  }
});
console.log(rowDataObj);
const typeList = Object.keys(rowDataObj);
typeList.sort((a, b) => rowDataObj[b].length - rowDataObj[a].length);
function customSort(a, b) {
  if (a.includes("其他") && !b.includes("其他")) {
    return 1; // 如果 a 的 name 为'A'而 b 的 name 不是'A'，则 a 排在 b 后面
  } else if (!a.includes("其他") && b.includes("其他")) {
    return -1; // 如果 b 的 name 为'A'而 a 的 name 不是'A'，则 b 排在 a 后面
  } else {
    return 0; // 其他情况保持不变
  }
}
typeList.sort(customSort);

const dialogFormVisible = ref(false);
const selectItem: any = ref(null);
const showDialog = (item) => {
  console.log(item);
  dialogFormVisible.value = true;
  selectItem.value = item;
};
const openNew = (item) => {
  window.open(item);
};
</script>
<template>
  <div
    class="w-full overflow-auto h-full flex flex-col justify-between relative"
  >
    <section class="flex-1 max-w-[1220px] w-full mx-auto my-5 mt-10">
      <el-tabs type="border-card">
        <el-tab-pane label="User"> div </el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </section>
  </div>
  <el-dialog v-model="dialogFormVisible" :center="true">
    <!-- <div class="text-xl font-bold">{{ selectItem?.三方库名称 }}</div> -->
    <div class="text-4xl font-bold mb-2 text-black">
      {{ selectItem?.三方库名称 }}
    </div>
    <div
      class="mb-2 mt-2 flex text-sm items-center text-black border-b pb-4 border-[#4d97db]"
    >
      <div class="mr-2">
        <svg
          aria-hidden="true"
          height="14"
          viewBox="0 0 16 16"
          version="1.1"
          width="14"
          data-view-component="true"
          class="octicon octicon-tag flex-shrink-0 mt-1 color-fg-success"
        >
          <path
            d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
          ></path>
        </svg>
      </div>
      <div class="mr-1 pt-1 cursor-pointer text-black">{{ "v8.15.2" }}</div>
      <div class="mr-1 ml-6 pt-1">
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          class="octicon octicon-law mr-2"
        >
          <path
            d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"
          ></path>
        </svg>
      </div>
      <div class="cursor-pointer pt-1">
        {{ selectItem?.["license"] || "MIT" }}
      </div>
      <div class="mr-1 ml-6 pt-1">
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          class="octicon octicon-link flex-shrink-0 mr-2"
        >
          <path
            d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"
          ></path>
        </svg>
      </div>
      <div
        class="cursor-pointer pt-1 text-ellipsis flex whitespace-nowrap w-[200px] overflow-hidden"
        @click="openNew(selectItem?.TPC_URL || selectItem?.raw_URL)"
      >
        {{
          // autocorrect: false
          selectItem?.TPC_URL || selectItem?.raw_URL
        }}
      </div>
    </div>
    <!-- <div class="mt-4 text-sm text-black border-b pb-4 border-[#4d97db]">
      描述：{{ selectItem?.["三方库详情"] || "" }}
    </div> -->
    <div class="mt-4 text-lg text-black">Compass Active Score: 95.6/100</div>
    <div class="w-full">
      <img src="@/assets/active.png" />
    </div>
  </el-dialog>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.el-carousel__item h3 {
  /* color: #475669; */
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
}
.el-carousel__item {
  border-radius: 12px;
  /* width: 351px; */
}
.is-active {
  /* width: 546px; */
}
</style>
