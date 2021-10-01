<template>
	<div class="view-home">
		<p>Hello, <b>{{userName}}</b>!</p>
		<p><a href="/browser/">Open browser</a></p>
	</div>
</template>

<script>

export default {
	name: 'home',
	components: {
	},
	//inject: ['apiClient'],
	data() {
		return {
			apiClient: null,
			userInfo: null,
			userName: 'anonymous user'
		}
	},
	created () {
		this.apiClient = this.$root.apiClient;
		this.userInfo = this.$root.userInfo;
		if (this.userInfo) {
			this.userName = this.userInfo.username;
		}
	},
	methods: {
	}
}
</script>

<style>
.view-home {
	padding: 2em;
}
</style>
