import type { App } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory } from "vue-router"
// import { setupPageGuard } from './permission'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "main",
    component: () => import("@/views/Main.vue"),
  },
  {
    path: "/model",
    name: "model",
    component: () => import("@/views/Model.vue"),
  },
  {
    path: "/modelDetail",
    name: "modelDetail",
    component: () => import("@/views/ModelDetail.vue"),
  },
  {
    path: "/evaluate",
    name: "evaluate",
    component: () => import("@/views/Evaluate.vue"),
  },

  // {
  //   path: '/500',
  //   name: '500',
  //   component: () => import('@/views/exception/500/index.vue'),
  // },

  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'notFound',
  //   redirect: '/404',
  // },
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
