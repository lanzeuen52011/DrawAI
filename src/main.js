import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { formatNumber } from "@/lib/tools.js";

const app = createApp(App);

app.directive("formatNumber", {
  mounted(el, binding) {
    const p = formatNumber(binding.value);
    el.innerHTML = p;
  },
});

app.use(router).mount("#app");
