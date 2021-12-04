<template>
	<div v-loading="loading" class="content">

		<div class="content__inner">
			<p class="subline">Overview</p>
			<h1 class="h1">Table Definitions</h1>
		</div>

		<el-table :data="tabledefinitions" style="width: 100%">
			<el-table-column prop="attributes.name" label="Name" />
			<el-table-column label="Fieldcount">
				<template #default="scope">
					<span>{{ (tabledefinitions[scope.$index].relationships.hasOwnProperty('sys-db-field-definitions')) ? tabledefinitions[scope.$index].relationships['sys-db-field-definitions'].data.length : '0' }}</span>
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
			<el-table-column fixed="right" label="&nbsp;" width="154">
				<template #default="scope">
					<el-button
						size="mini"
						@click="gotoItem(tabledefinitions[scope.$index].id);">
						Edit
					</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="deleteItem(tabledefinitions[scope.$index].id, scope.$index);">
						Delete
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="content__addLine">
			<el-button type="primary" size="mini" v-on:click="addTable()">Add</el-button>
		</div>

	</div>
</template>

<script>
import * as api from '../api';
import dateMixin from '@/mixins/dateMixin.js';
import router from '../router';

import { ElMessageBox } from 'element-plus';

export default {
	mixins: [dateMixin],
  	name: "Table Definitions",
 	data() {
        return {
			tabledefinitions: [],
			loading: false
		}
	},
	created() {
		this.fetchDefinitions();
	},
	methods: {
		gotoItem(id) {
			router.push({ path: '/table-definitions/' + id });
		},

		addTable() {
			ElMessageBox.prompt('Set the name for the new table:', 'New Table', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel'
      		}).then(({ value }) => {
				if(value !== null){
					this.createTable(value);
				}
        	}).catch(() => {
				console.log('do nothing');
        	;})
		},

		async deleteItem(id, index) {
			this.loading = true;
            try {
                await api.tabledefinitions.deleteTable(id);
				this.tabledefinitions.splice(index, 1);
				this.loading = false;
            } catch (error) {
                console.error(error);
				this.loading = false;
            }	
		},

		async createTable(value) {
			this.loading = true;
            try {
                let response = await api.tabledefinitions.createTable(value);
				response.data.data.relationships.data = new Array();
				this.tabledefinitions.push(response.data.data);
				this.loading = false;
            } catch (error) {
                console.error(error);
				this.loading = false;
            }	
		},

		async fetchDefinitions() {
			this.loading = true;
            try {
                const response = await api.tabledefinitions.show();
				this.tabledefinitions = response.data.data;
				this.loading = false;
            } catch (error) {
                console.error(error);
				this.loading = false;
            }
		}
	}
};
</script>
