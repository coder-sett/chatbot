<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
import { useRouter } from "vue-router";
import rowData from "@/assets/json/tpc_license.json";
import active from "@/assets/active.png";
import * as echarts from "echarts";
let TPC = {
  加解密算法: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  安全: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  编码转换: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  多媒体: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  文件数据与传输: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  字体字幕处理: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  工具: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  数据存储: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  数据库: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  网络: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  音视频: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  客户端: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  动画: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  框架类: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  日志打印: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  搜索引擎: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  UI: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  其他: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  消息传递: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  图像图形处理: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  办公: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  数据解析: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  文本解析器: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  图片: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  数据压缩算法: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
  深度学习: [
    "blockchain",
    "buildsystem",
    "distributeddatamgr",
    "distributedhardwaremgr",
    "edu_data_specification",
    "gaming",
    "mips",
  ],
};
let newObj = {
  "三方库/三方库框架": Object.keys(TPC),
  "基础功能/特性/工具": [
    "sig_blockchain",
    "sig_buildsystem",
    "sig_distributeddatamgr",
    "sig_distributedhardwaremgr",
    "sig_edu_data_specification",
    "sig_gaming",
    "sig_mips",
  ],
  基础设施: [
    "sig_basicsoftwareservice",
    "sig_infrastructure",
    "sig_test",
    "sig_security",
    "sig_softbus",
    "sig_telephony",
  ],
  "工具链/语言/运行": [
    "sig_compileruntime",
    "sig_napi_generator",
    "sig_python",
    "sig_qt",
    "sig_temp",
    "sig_toolchains",
    "sig_secure_element",
  ],
  "架构/处理器/内核/驱动": [
    "sig_architecture",
    "sig_devboard",
    "sig_driver",
    "sig_kernel",
    "sig_riscv",
    "sig_robotics",
  ],
  "桌面/图形系统": [
    "sig_crossplatformui",
    "sig_graphics",
    "sig_linkboy",
    "sig_miniblink",
    "sig_openblock",
    "sig_opengfxdriver",
  ],
  版本发行相关: [
    "sig_docs",
    "sig_release",
    "sig_print",
    "sig_systemapplications",
    "sig_ide",
  ],
  社区职能组织: ["sig_compliance", "sig_knowlege", "sig_qa", "sig_tee"],
  "行业解决方案/应用": [
    "sig_appframework",
    "sig_bluetooth",
    "sig_dengluyi",
    "sig_industrial_internet",
    "sig_iot_sensing_network",
    "sig_media",
  ],
  通用中间组件: [
    "sig_ai_framework",
    "sig_ai_framework_integration",
    "sig_api",
    "sig_cellular_device_mgr",
    "sig_hilog",
  ],
};

const value1 = ref("三方库/三方库框架");
const value2 = ref("活跃度");
const value3 = ref("");

const options1 = ref(Object.keys(newObj));
const options2 = ref(["活跃度", "社区响应", "代码贡献"]);
const days: any = ref([]);

onMounted(() => {
  let cur = newObj[value1.value];
  days.value = cur;
  initChart();
});
const handleClick = (item) => {
  console.log(item);
  let cur = newObj[item];
  days.value = cur;
  initChart();
};
const initChart = () => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  const data_tmp = getdata(days.value);

  const data = data_tmp.map(function (item) {
    return [item[1], item[0], item[2], item[3] || ""];
  });
  let option = {
    dataZoom: [
      {
        id: "dataZoomY",
        type: "slider",
        yAxisIndex: [0],
        startValue: 0,
        endValue: 40,
        filterMode: "empty",
      },
    ],
    tooltip: {
      position: "top",
    },
    grid: {
      height: "80%",
      width: "auto",
      top: "5%",
    },
    xAxis: {
      type: "category",
      data: hours,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: days.value,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      inRange: {
        color: ["#e2fae2", "#77c74e"],
      },
      dimension: 2,
      orient: "horizontal",
      left: "center",
      bottom: "1%",
    },
    series: [
      {
        name: "",
        type: "heatmap",
        data: data,
        label: {
          // formatter:(item)=>{
          //   return item.data[2]
          //   console.log(item)
          // },
          show: false,
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          borderWidth: 1,
          borderColor: "#fff",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  option && myChart.setOption(option);
  myChart.on("click", () => {
    window.open("https://compass.gitee.com/analyze/ck8eobrl");
  });
};
const hours = Array.from(
  { length: 12 },
  (_, index) => "2023-" + (index + 1).toString()
);
// prettier-ignore

function getdata(days){
  const data:any = []
  for (let d=0; d < days.length; d += 1){
    for (let j=0; j < 52;  j += 1){
      data.push([d, j, Math.floor(Math.random() * 10) ])
    }
  }
  return data;
}

let obj = {
  全部: [
    "sig_ai_framework",
    "sig_ai_framework_integration",
    "sig_api",
    "sig_appframework",
    "sig_architecture",
    "sig_basicsoftwareservice",
    "sig_blockchain",
    "sig_bluetooth",
    "sig_buildsystem",
    "sig_cellular_device_mgr",
    "sig_compileruntime",
    "sig_compliance",
    "sig_crossplatformui",
    "sig_dengluyi",
    "sig_devboard",
    "sig_distributeddatamgr",
    "sig_distributedhardwaremgr",
    "sig_docs",
    "sig_driver",
    "sig_edu_data_specification",
    "sig_gaming",
    "sig_graphics",
    "sig_hilog",
    "sig_ide",
    "sig_industrial_internet",
    "sig_infrastructure",
    "sig_iot_sensing_network",
    "sig_kernel",
    "sig_knowlege",
    "sig_linkboy",
    "sig_media",
    "sig_miniblink",
    "sig_mips",
    "sig_napi_generator",
    "sig_openblock",
    "sig_opengfxdriver",
    "sig_print",
    "sig_python",
    "sig_qa",
    "sig_qt",
    "sig_release",
    "sig_riscv",
    "sig_robotics",
    "sig_secure_element",
    "sig_security",
    "sig_softbus",
    "sig_systemapplications",
    "sig_tee",
    "sig_telephony",
    "sig_temp",
    "sig_test",
    "sig_toolchains",
  ],
  TPC: Object.keys(TPC),
};
</script>
<template>
  <div
    class="w-full overflow-auto h-full flex flex-col justify-between relative"
  >
    <section class="flex-1 max-w-[1220px] w-full mx-auto my-5 mt-10">
      <div class="flex justify-start">
        <div>
          SIG分类：
          <el-select
            v-model="value1"
            placeholder=""
            @change="handleClick"
            size="default"
          >
            <el-option
              v-for="item in options1"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="ml-5">
          模型：
          <el-select v-model="value2" placeholder="" size="default">
            <el-option
              v-for="item in options2"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="block ml-5">
          <span class="demonstration">日期：</span>
          <el-date-picker
            v-model="value3"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>
      <div class="w-full h-[800px] mt-5" id="main"></div>
    </section>
  </div>
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
