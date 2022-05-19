import { createRouter, createWebHistory } from "vue-router";
import Func from "@/views/func/Func.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/index/index.vue"),
    },
    {
      path: "/func/:name",
      component: Func,
    },
    {
      path: "/admin",
      component: () => import("@/views/admin/Admin.vue"),
    },
  ],
});

export default router;
