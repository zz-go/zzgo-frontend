import { createRouter, createWebHistory } from "vue-router";

const routes = [
  	{
		path: "/",
		name: "Dashboard",
		component: () => import(/* webpackChunkName: "dashboard" */ "../views/dashboard.vue"),
        meta: {
            subnavigation: false,
        },
  	},
  	{
		path: "/table-definitions",
		name: "Table Definitions",
		component: () => import(/* webpackChunkName: "table-definitions" */ "../views/table-definitions.vue"),
        meta: {
            subnavigation: true,
        },
  	},
  	{
		path: "/table-definitions/:id",
		name: "Table Definition",
		component: () => import(/* webpackChunkName: "table-definition" */ "../views/table-definitions-detail.vue"),
        meta: {
            subnavigation: true,
        },
  	},
  	{
		path: "/table-definitions/:id/relations",
		name: "Table Definition Relations",
		component: () => import(/* webpackChunkName: "table-definition" */ "../views/table-definitions-detail.vue"),
        meta: {
            subnavigation: true,
        },
  	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
