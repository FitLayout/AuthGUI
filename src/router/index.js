import { createWebHashHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AdminUsers from "../views/AdminUsers.vue";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			name: "home",
			path: "/",
			component: Home
		},
		{
			name: "login",
			path: "/login",
			component: Login
		},
		{
			name: "register",
			path: "/register",
			component: Register
		},
		{
			name: 'adminUsers',
			path: '/admin/users',
			component: AdminUsers
		}
	]
});

export default router;
