import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false, easing: "ease", speed: 1000 });

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    key: "g0",
    keyName: "指南",
    name: "介绍",
    path: "/",
    component: () => import("./views/home/index.vue"),
  },
  {
    key: "g1",
    keyName: "数据录入",
    name: "表单",
    path: "/dataInput",
    component: () => import("./views/form/index.vue"),
  },
];

const router = createRouter({
  scrollBehavior(/* to, from, savedPosition */) {
    return { top: 0 };
  },
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((/* to, from */) => {
  // start progress bar
  NProgress.start();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;
