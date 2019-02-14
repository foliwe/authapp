import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./components/users/login";
import Signup from "./components/users/signup";
import Notes from "./components/notes/notes";
import Todos from "./components/todos/todos";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/notes",
      name: "notes",
      component: Notes
    },
    {
      path: "/todos",
      name: "todos",
      component: Todos
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
  ]
});
