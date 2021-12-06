<template>
  	<div class="content">
		<div class="content__inner">
			<p class="subline">ZZGO</p>
			<h1 class="h1">Dashboard</h1>
		</div>

		<div class="content__inner">
			<el-row :gutter="20">
				<el-col :span="12">
					<router-link to="/table-definitions" class="dashboard__alert error"><b>5 changes</b> in my <b>super duper api table</b> are not materialized yet</router-link>
					<div class="dashboard__alert success"><b>5 changes</b> in my <b>super duper api table</b> are not materialized yet</div>
					<div class="dashboard__alert"><b>3 changes</b> in my <b>incredible duper api table</b> are not materialized yet</div>
					<div class="dashboard__alert"><b>4 changes</b> in my <b>awesome duper api table</b> are not materialized yet</div>
					<div class="dashboard__alert"><b>2 changes</b> in my <b>superb duper api table</b> are not materialized yet</div>
				</el-col>
			</el-row>
		</div>
  	</div>
</template>

<script>
export default {
  	name: "Home",
};
</script>

<style scoped lang="scss">
.dashboard {
	&__alert {
		background: $color-almost-white;
		border-radius: 5px;
		padding: 15px 18px;
		margin-bottom: 6px;
		display: block;
		color: $color-almost-black;

		&:last-child {
			margin-bottom: 0;
		}

		&.error {
			background: $color-red;
		}
		&.success {
			background: $color-green;
		}
	}
}
</style>