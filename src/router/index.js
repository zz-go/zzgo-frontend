import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/dashboard.vue";

const routes = [
  	{
		path: "/",
		name: "Home",
		component: Home,
  	},
  	{
		path: "/table-definitions",
		name: "Table Definitions",
		component: () =>
			import(/* webpackChunkName: "table-definitions" */ "../views/table-definitions.vue"),
  	},
  	{
		path: "/table-definitions/:id",
		name: "Table Definition",
		component: () =>
			import(/* webpackChunkName: "table-definition" */ "../views/table-definitions-detail.vue"),
  	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
