import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/landscape",
  },
  {
    path: "/landscape",
    name: "landscape",
    component: () => import("@/views/Landscape/index.vue"),
  },
  {
    path: "/tpc",
    name: "Tpc",
    component: () => import("@/views/Tpc/index.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// setupPageGuard(router)

export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
}
