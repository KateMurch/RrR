import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MapView from "../views/MapView.vue";
import MapViewEdit from "../views/MapViewEdit";
import AddView from "../views/AddView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/mapufa",
    name: "mapufa",
    component: MapView,
  },
  {
    path: "/mapufa_edit",
    name: "mapufa_edit",
    component: MapViewEdit,
  },
  {
    path: "/addmark",
    name: "addmark",
    component: AddView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
