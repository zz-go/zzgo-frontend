<template>
	<div>
		<navigation v-if="config_show_navigation"></navigation>
		<side-navigation v-if="config_show_navigation"></side-navigation>

		<el-breadcrumb class="breadcrumb" separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
			<el-breadcrumb-item>Detail View</el-breadcrumb-item>
		</el-breadcrumb>

		<router-view />
	</div>
</template>


<script>
import { mapGetters } from 'vuex';
import router from './router';

export default {
    data: () => ({
	}),
	
	computed: {
		...mapGetters({
			config_show_navigation: 'config_show_navigation',
		}),
	},
	
    created(){

		this.toggle_navigation(this.$route.matched[0].props.default.navigation);

    },

    watch: {
		'$route' (to, from) {
			
			this.toggle_navigation(this.$route.matched[0].props.default.navigation);

		},
	},
	
    methods: {
		// toggle navigation based on route
        toggle_navigation: function (status) {
			this.$store.commit('set_config_show_navigation', status);
        }
    },
}
</script>


<style lang="scss">
.breadcrumb {
	position: fixed;
	top: 70px;
	left: 280px;
	width: calc(100% - 280px);
	box-sizing: border-box;
	padding: 18px 50px;
	border-bottom: solid 1px $color-bg-grey;
	z-index: 100;
	background: white;

	.is-link {
		transition: all .25s ease !important;

		&:hover {
			color: #303133 !important;
			opacity: .7;
		}
	}
}
</style>