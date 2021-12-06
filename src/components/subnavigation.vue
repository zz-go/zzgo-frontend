<template>
  	<div class="subnavigation">
		<ul>
			<li v-for="t in tabledefinitions" :key="'subnavigation_' + t.id">
				<router-link :to="'/table-definitions/' + t.id">{{ t.attributes.name }}</router-link>
			</li>
		</ul>
  	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  	name: "Subavigation",
    computed: {
        ...mapGetters([
            'tabledefinitions'
        ]),
	},
	methods: {
		materialize() {
			console.log('materialize')
		}
	}
};
</script>

<style lang="scss" scoped>
.subnavigation {
	position: fixed;
	left: 60px;
	top: 0;
	height: 100vh;
	width: 220px;
	z-index: 2;
	background: $color-almost-white;
	border-right:solid 1px #efefef;
	padding-top: 15px;

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;


		li {
			padding: 0 20px;

			&:hover {
				background: $color-grey;
			}

			a {
				display: block;
				padding: 15px 5px;
				font-size: 14px;
				color: $color-almost-black;
				transition: all .25s ease;
				border-bottom: solid 1px #ddd;
				cursor: pointer;
			}

			&:last-child {
				a {
					border-bottom: none;
				}
			}
		}
	}
}
</style>