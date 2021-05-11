<template>
	<div class="view-home">
		<p>Hello.</p>
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
			apiClient: null
		}
	},
	created () {
		this.apiClient = this.$root.apiClient;
	},
	methods: {
	}
}
</script>

<style>
</style>
