import Vue from "vue";
import Router from "vue-router";
import Tea from "./views/Tea.vue";
import NewTea from "./views/AddTea.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "newTea", component: NewTea },
    {
      path: "/tea/:teaId",
      name: "tea",
      component: Tea
    }
  ]
});
