<template>
	<div v-loading="loading" class="content">

		<div class="content__inner">
			<p class="subline">Table definition</p>
			<h1 class="h1"><span v-if="tabledefinition !== false">{{ tabledefinition.attributes.name }}</span>&nbsp;</h1>
		</div>

		<el-table v-if="tabledefinition !== false" :data="tabledefinition.relationships['sys-db-field-definitions'].data" style="width: 100%">
			<el-table-column label="Name">
				<template #default="scope">
					<el-input :class="{ error : tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].attributes.name.trim().length < 1 }" v-model="tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].attributes.name" @change="saveItem(tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].id, scope.$index)" />
				</template>
			</el-table-column>
			<el-table-column label="Type">
				<template #default="scope">
					<el-select style="width:100%" :class="{ error : tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].attributes.type.trim().length < 1 }" v-model="tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].attributes.type" placeholder="Select Type" @change="saveItem(tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].id, scope.$index)">
						<el-option
							v-for="item in typeOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column label="Default">
				<template #default="scope">
					<el-input v-model="tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].attributes.default" @change="saveItem(tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].id, scope.$index)" />
				</template>
			</el-table-column>
			<el-table-column label="Nullable" class-name="text-center" width="140">
				<template #default="scope">
					<el-checkbox v-model="tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].attributes.nullable" @change="saveItem(tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].id, scope.$index)"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column label="Unsigned" class-name="text-center" width="140">
				<template #default="scope">
					<el-checkbox v-if="tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].attributes.type === 'integer'" v-model="tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].attributes.unsigned" @change="saveItem(tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].id, scope.$index)"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column label="" class="savecol" width="100">
				<template #default="scope">
					<div v-loading="tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].hasOwnProperty('loading') && tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].loading === true" class="loading--small savecol__loader">&nbsp;</div>
					<div class="smallinfo savecol__saved">Saved</div>
				</template>
			</el-table-column>
			<el-table-column label="" width="92">
				<template #default="scope">
					<el-button
						size="mini"
						type="danger"
						@click="triggerDelete(tabledefinition.relationships['sys-db-field-definitions'].data[scope.$index].id, scope.$index);">
						Delete
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="content__addLine">
			<el-button type="primary" size="mini" v-on:click="addField(1)">Add</el-button>
			<el-button type="primary" size="mini" v-on:click="addField(addMultiple)">Add Multiple</el-button>
			<el-input v-model="addMultiple" size="mini" />
		</div>
		
	</div>
</template>

<script>
import * as api from '../api';
import { ElMessageBox } from 'element-plus'

export default {
  	name: "Table Definition",
 	data() {
        return {
			id: 0,
			tabledefinition: false,
			loading: true,
			typeOptions: [
				{
					value: 'string',
					label: 'String'
				},
				{
					value: 'integer',
					label: 'Integer'
				},
				{
					value: 'boolean',
					label: 'Boolean'
				}
			],
			addMultiple: 5,
			newIndex: []
		}
	},
	computed: {
	},
	mounted() {
		this.id = this.$route.params.id;
		this.fetchDefinition(this.id);
	},
	methods: {
		async fetchDefinition(id) {
            try {
                const response = await api.tabledefinitions.get(id);
				this.tabledefinition = response.data.data;
				this.loading = false;
            } catch (error) {
                console.error(error);
            }
		},

		addField(count) {
			for(let i=0; i<count; i++){
				let newIndex = 0;
				do {
					newIndex = 'new_' + Math.floor(Math.random() * 100000);
				} while(this.newIndex.indexOf(newIndex) >= 0 && newIndex !== 0);
				this.newIndex.push(newIndex);

				this.tabledefinition.relationships['sys-db-field-definitions'].data.push({
					attributes: {
						default: '',
						name: '',
						nullable: false,
						unsigned: false,
						type: ''
					},
					id: newIndex
				});
			}
		},

		triggerDelete(id, index) {
			let that = this;
			ElMessageBox.confirm(
				'Do you really want to delete this field definition?',
				'Warning',
				{
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
					type: 'warning',
				}
			).then(() => {
				that.deleteItem(id, index);
			}).catch(() => {
				console.log('do nothing');
			});
		},

		async deleteItem(id, index){
			let that = this;
			try {
				const response = await api.tabledefinitions.delete(id);
				console.log(response);
				that.tabledefinition.relationships['sys-db-field-definitions'].data.splice(index, 1);
			} catch (error) {
				console.error(error);
			}
		},

		async saveItem(id, index){
			let that = this;

			var toSave = this.tabledefinition.relationships['sys-db-field-definitions'].data.filter(obj => {
				return obj.id === id
			});
			toSave = toSave[0];

			if(toSave.attributes.name.trim().length > 0 && toSave.attributes.type.trim().length > 0){
				let operation = (id.indexOf('new_') === 0) ? 'create' : 'update';

				try {
					const response = await api.tabledefinitions[operation](that.tabledefinition.id, toSave.attributes);
					that.tabledefinition.relationships['sys-db-field-definitions'].data[index] = response.data.data;
					console.log(that.tabledefinition)
				} catch (error) {
					console.error(error);
				}
			}
		}
	}
};
</script>

<style lang="scss">
.savecol {
	&__saved {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		color:$color-green;
	}
}
</style>