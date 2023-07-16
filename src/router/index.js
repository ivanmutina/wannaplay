import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { Auth } from "@/services";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/signup"];
  // login potreban kada stranica na koju zelis ici nije u javnim stranicama
  const loginRequired = !publicPages.includes(to.path);
  const user = Auth.getUser();

  // logika ruta
  if (loginRequired && !user) {
    next("/login");
    return;
  } else if (user && !loginRequired) {
    next("/");
  } else {
    // ako je sve ok zovemo next
    next();
  }
});

export default router;
