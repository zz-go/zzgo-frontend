<template>
	<div v-loading="loading" class="content">

		<div class="actionbar">
			<el-button type="danger" size="small" v-on:click="addField(1)">Cancel</el-button>
			<el-button type="primary" size="small" v-on:click="addField(1)">Save changes</el-button>
		</div>

		<h1 class="h1">Table definition: <span v-if="tabledefinition !== false">{{ tabledefinition.attributes.name }}</span></h1>

		<el-table v-if="tabledefinition !== false" :data="filteredElements" style="width: 100%">
			<el-table-column label="Name">
				<template #default="scope">
					<el-input v-model="filteredElements[scope.$index].attributes.name" />
				</template>
			</el-table-column>
			<el-table-column label="Type">
				<template #default="scope">
					<el-select v-model="filteredElements[scope.$index].attributes.type" placeholder="Select Type">
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
					<el-input v-model="filteredElements[scope.$index].attributes.default" />
				</template>
			</el-table-column>
			<el-table-column label="Nullable">
				<template #default="scope">
					<el-checkbox v-model="filteredElements[scope.$index].attributes.nullable"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column label="Unsigned">
				<template #default="scope">
					<el-checkbox v-if="filteredElements[scope.$index].attributes.type === 'integer'" v-model="filteredElements[scope.$index].attributes.unsigned"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column label="">
				<template #default="scope">
					<el-button
						size="mini"
						type="danger"
						@click="deleteItem(filteredElements[scope.$index].id);">
						Delete
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="addLine">
			<el-button type="primary" size="mini" v-on:click="addField(1)">Add</el-button>
			<el-button type="primary" size="mini" v-on:click="addField(addMultiple)">Add Multiple</el-button>
			<el-input v-model="addMultiple" size="mini" />
		</div>
		
	</div>
</template>

<script>
import * as api from '../api';

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
			toDeleteItems: [],
			newIndex: []
		}
	},
	computed: {
		filteredElements() {
			let elems = [];
			let that = this;

			this.tabledefinition.relationships['sys-db-field-definitions'].data.map(function(value) {
				if(that.toDeleteItems.indexOf(value.id) === -1) elems.push(value);
			});
			
			return elems;
		}
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

		deleteItem(id) {
			this.toDeleteItems.push(id);
		}
	}
};
</script>

<style lang="scss">
.addLine {
	padding: 20px 15px;
	text-align: center;

	input {
		width: 40px;
	}

	> * {
		display: inline-block;
		float: right;
		width: auto;
		margin: 0 0 0 10px;
	}
}
</style>