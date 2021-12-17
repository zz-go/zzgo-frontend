import { zzgoApi } from '@/utils/axios-config';

export default {
    show() {
        return zzgoApi.get(`sys-db-table-definitions`);
    },
    createTable(name) {
        return zzgoApi.post(`sys-db-table-definitions`, { name: name });
    },
    updateTable(id, data) {
        return zzgoApi.put(`sys-db-table-definitions/${id}/`, data);
    },
    get(id) {
        return zzgoApi.get(`sys-db-table-definitions/` + id);
    },
    deleteTable(id) {
        return zzgoApi.delete(`sys-db-table-definitions/` + id);
    },

    delete(tableid, id) {
        return zzgoApi.delete(`sys-db-table-definitions/` + tableid + `/sys-db-field-definitions/` + id);
    },
	create(tabledefinition, fielddefinition, data) {
		console.log('not needed fielddefinition: ' + fielddefinition)
		let senddata = {
			default: data.default,
			name: data.name,
			nullable: data.nullable,
			unsigned: data.unsigned,
			type: data.type
		};
        return zzgoApi.post(`/sys-db-table-definitions/${tabledefinition}/sys-db-field-definitions`, senddata);
	},
	update(tabledefinition, fielddefinition, data) {
		let senddata = {
			default: data.default,
			name: data.name,
			nullable: data.nullable,
			unsigned: data.unsigned,
			type: data.type,
			index: data.index
		};
        return zzgoApi.put(`/sys-db-table-definitions/${tabledefinition}/sys-db-field-definitions/${fielddefinition}/`, senddata);
	},

	materialize(tableid) {
		let url = 'materialize';
		if(typeof tableid !== 'undefined') url = 'sys-db-table-definitions/' + tableid + '/materialize'
        return zzgoApi.post(url);
	}
};
