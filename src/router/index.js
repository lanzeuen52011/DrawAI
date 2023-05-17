import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/index.vue";
// import AboutView from "../views/Home/AboutView.vue";
import Gallery from "@/views/Home/Gallery/Gallery.vue";
// import Style from "@/views/Home/Gallery/style.vue";
// import id from "@/views/_id.vue";

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
        component: () => import("@/views/Home/Gallery/style.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/Home/AboutView.vue"),
      },
    ],
  },
  {
    path: "/img/:id",
    name: "picture",
    component: () => import("@/views/_id.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/views/NotFoundComponent.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { left: 0, top: 0 };
    }
  },
});

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

export default router;
