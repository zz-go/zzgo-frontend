<template>
	<div v-loading="loading" class="content">
		<h1 class="h1">Table Definitions</h1>

		<el-table :data="tabledefinitions" style="width: 100%">
			<el-table-column prop="attributes.name" label="Name" />
			<el-table-column label="Fieldcount">
				<template #default="scope">
					{{ tabledefinitions[scope.$index].relationships['sys-db-field-definitions'].data.length }}
				</template>
			</el-table-column>
			<el-table-column label="Created">
				<template #default="scope">
					{{ format_date(tabledefinitions[scope.$index].attributes.created_at) }}
				</template>
			</el-table-column>
			<el-table-column label="Updated">
				<template #default="scope">
					{{ format_date(tabledefinitions[scope.$index].attributes.updated_at) }}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="&nbsp;" width="150">
				<template #default="scope">
					<el-button
						size="mini"
						@click="gotoItem(tabledefinitions[scope.$index].id);">
						Edit
					</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="deleteItem(tabledefinitions[scope.$index].id);">
						Delete
					</el-button>
				</template>
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
import * as api from '../api';
import dateMixin from '@/mixins/dateMixin.js';
import router from '../router';

export default {
	mixins: [dateMixin],
  	name: "Table Definitions",
 	data() {
        return {
			tabledefinitions: [],
			loading: true
		}
	},
	created() {
		this.fetchDefinitions();
	},
	methods: {
		gotoItem(id) {
			router.push({ path: '/table-definitions/' + id });
		},
		deleteItem(id) {
			console.log('delete: ' + id);
		},
		async fetchDefinitions() {
            try {
                const response = await api.tabledefinitions.show();
				this.tabledefinitions = response.data.data;
				this.loading = false;
            } catch (error) {
                console.error(error);
            }
		}
	}
};
</script>
