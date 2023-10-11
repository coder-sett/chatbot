import { createApp } from "vue"
import "./style.css"
import "@/assets/base.css"
import App from "./App.vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "highlight.js/styles/stackoverflow-light.css"

const app = createApp(App)
app.mount("#app")

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
