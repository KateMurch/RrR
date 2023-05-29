import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MapView from "../views/MapView.vue";
import AddView from "../views/AddView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/mapufa",
    name: "mapufa",
    component: MapView,
  },
  {
    path: "/addmark",
    name: "addmark",
    component: AddView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
