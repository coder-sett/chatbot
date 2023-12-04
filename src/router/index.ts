import type { App } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory } from "vue-router"
// import { setupPageGuard } from './permission'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/evaluate",
  },
  {
    path: "/index",
    name: "main",
    component: () => import("@/views/Main.vue"),
  },
  {
    path: "/model",
    name: "model",
    component: () => import("@/views/model/Model.vue"),
  },
  {
    path: "/modelDetail",
    name: "modelDetail",
    component: () => import("@/views/model/ModelDetail.vue"),
  },
  {
    path: "/evaluate",
    name: "evaluate",
    component: () => import("@/views/Evaluate.vue"),
  },
  {
    path: "/dataSet",
    name: "dataSet",
    component: () => import("@/views/DataSet.vue"),
  },
  {
    path: "/dataSetDetail",
    name: "dataSetDetail",
    component: () => import("@/views/DataSetDetail.vue"),
  },
  {
    path: "/dataSetMore",
    name: "dataSetMore",
    component: () => import("@/views/DataSetMore.vue"),
  },
  {
    path: "/dataSetList",
    name: "dataSetList",
    component: () => import("@/views/DataSetList.vue"),
  },
  {
    path: "/dataRoom",
    name: "dataRoom",
    component: () => import("@/views/DataRoom.vue"),
  },
  {
    path: "/ranking",
    name: "ranking",
    component: () => import("@/views/Ranking.vue"),
  },
  {
    path: "/repo",
    name: "repo",
    component: () => import("@/views/Repo.vue"),
  },
  {
    path: "/evaluateSubmit",
    name: "evaluateSubmit",
    component: () => import("@/views/EvaluateSubmit.vue"),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// setupPageGuard(router)

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
