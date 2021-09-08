<template>
	<span class="user-avatar">
       	<Button icon="pi pi-user" class="p-button-rounded p-button-info" @click="toggle" />
		<Menu ref="menu" :model="items" :popup="true" />
	</span>
</template>

<script>
import Button from 'primevue/button';
import Menu from 'primevue/menu';

export default {
	name: 'UserAvatar',
	components: {
		Button,
		Menu
	},
	props: {
		userInfo: null
	},
	data () {
		return {
			items: []
		}
	},
	created () {
		this.createMenu();
	},
	watch: {
		userInfo: 'createMenu'
	},
	methods: {
		createMenu() {
			this.items = [];
			this.items.push({
				label: this.userInfo ? this.userInfo.username : 'user',
				class: 'user-id'
			});
			if (this.$root.isAdmin()) {
				this.items.push({
					label: 'User administration',
					icon: 'pi pi-user-edit',
					to: '/admin/users'
				});
			}
			this.items.push({
				separator: true
			});
			this.items.push({
				label: 'Logout',
				icon: 'pi pi-fw pi-power-off',
				to: '/login',
				command: () => {
					this.$root.apiClient.logout();
				}
			});
		},
		toggle(event) {
    		this.$refs.menu.toggle(event);
		}
	}
}
</script>

<style>
	.p-menu .user-id {
		font-weight: bold;
	}
</style>
