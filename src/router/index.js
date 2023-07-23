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
    path: "/sitemap.xml",
    name: "sitemap",
    component: () => import("../../public/sitemap.xml"),
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/views/NotFoundComponent.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     if (to.hash) {
//       return {
//         el: to.hash,
//         behavior: "smooth",
//         offset: { left: 0, top: -100 },
//       };
//     } else {
//       return { left: 0, top: 0 };
//     }
//   },
// });

// 抓到#，就滾動(這裡是處理頁面載入完成後的滾動) @處理頁面跳轉過來的，在style.vue的if (window.location.hash) { 中，在第60行左右
// 使用 Vue Router 的 afterEach 鉤子來實現， DOM 元素載入完成後(OnMounted)再執行js滾動的動作(來自style.vue的LINE 60)
router.afterEach((to, from) => {
  if (to.hash) {
    const element = document.querySelector(window.location.hash);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }
});

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     if (to.hash) {
//       return new Promise((resolve) => {
//         const element = document.querySelector(to.hash);
//         if (element) {
//           const topOffset = element.getBoundingClientRect().top - 100;
//           const behavior = "smooth";
//           console.log(topOffset);
//           window.scrollTo({ top: topOffset, behavior });
//         }
//       });
//     } else {
//       return savedPosition || { left: 0, top: 0 };
//     }
//   },
// });

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

export default router;
