<template>
  	<div class="navigation">
		<router-link to="/">
			<img class="navigation__logo" alt="ZZGO" src="../assets/zzgo.png" />
		</router-link>

		<ul class="navigation__main">
			<li>
      			<el-tooltip
        			content="Table Definitions"
        			placement="right"
      			>
				  	<router-link to="/table-definitions">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-394d1fd8=""><path fill="currentColor" d="M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32z"></path></svg>
					</router-link>
      			</el-tooltip>	
			</li>
		</ul>

		
  	</div>
</template>

<script>
export default {
  	name: "Navigation"
};
</script>

<style lang="scss" scoped>
.navigation {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 60px;
	background: $color-purple;

	&__logo {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		height: 40px;
		top: 10px;
	}

	&__main {
		list-style-type: none;
		padding: 80px 0 0;
		margin: 0;

		li {
			color: white;
			display: block;
			text-align: center;
			width: 100%;
			height: 60px;
			position: relative;
			overflow: hidden;

			a {
				display: block;
				position: absolute;
				top: 50%;
				left: 50%;
				width: 100%;
				transform: translate(-50%, -50%);

				&:after {
					content: '';
					position: absolute;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background: rgba(255,255,255,.1);
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 5;
					opacity: 0;
					transition: all .25s ease;
					margin-top: -2px;
				}

				svg {
					width: 22px;
					color: white;
					position: relative;
					z-index: 10;
				}

				&:hover {
					&:after {
						opacity: 1;
						width: 44px;
						height: 44px;
					}
				}
				&:active {
					&:after {
						width: 100px;
						height: 100px;
					}
				}
			}
		}
	}
}
</style>

<style lang="scss">
.el-popper {
	font-family: arial;
	letter-spacing: .02em;
	font-size: 11px;
}
</style>