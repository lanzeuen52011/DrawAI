import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/index.vue";
import AboutView from "../views/Home/AboutView.vue";
import Gallery from "@/views/Home/Gallery/Gallery.vue";
import Style from "@/views/Home/Gallery/style.vue";
import id from "@/views/_id.vue";

const routes = [
  {
    path: "",
    name: "home",
    component: Home,
    children: [
      {
        //此處為點入About時，首先載入的嵌套內容。
        path: "",
        component: Gallery,
      },
      {
        //此處為點入About時，首先載入的嵌套內容。
        path: "/style",
        component: Style,
      },
      {
        path: "/about",
        name: "about",
        component: AboutView,
      },
    ],
  },

  {
    path: "/:id",
    name: "picture",
    component: id,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
