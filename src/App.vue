<template>
	<div id="nav" class="nav" :class="{ 'nav--subnavigation' : subnavigation }">
		<Navigation />
		<Subnavigation v-if="subnavigation" />
  	</div>
  	<router-view :class="{ 'content--subnavigation' : subnavigation }" />
</template>

<script>
import Navigation from "@/components/navigation.vue";
import Subnavigation from "@/components/subnavigation.vue";
import { mapGetters } from 'vuex';

export default {
  	components: {
		Navigation,
		Subnavigation,
  	},
    computed: {
        ...mapGetters([
            'subnavigation'
        ]),
	},
    watch: {
        $route(to) {
			this.$store.commit('setSubnavigation', to.meta.subnavigation);
        }
	}
};
</script>
