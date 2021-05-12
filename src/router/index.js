import { createWebHashHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Users from "../views/Users.vue";

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
			name: "users",
			path: "/users",
			component: Users
		}
	]
});

export default router;
