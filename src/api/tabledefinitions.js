import { zzgoApi } from '@/utils/axios-config';

export default {
    show() {
        return zzgoApi.get(`sys-db-table-definitions`);
    },
    createTable(name) {
        return zzgoApi.post(`sys-db-table-definitions`, { name: name });
    },
    get(id) {
        return zzgoApi.get(`sys-db-table-definitions/` + id);
    },
    deleteTable(id) {
        return zzgoApi.delete(`sys-db-table-definitions/` + id);
    },
    delete(id) {
        return zzgoApi.delete(`sys-db-field-definitions/` + id);
    },
	create(tabledefinition, data) {
		let senddata = {
			default: data.default,
			name: data.name,
			nullable: data.nullable,
			unsigned: data.unsigned,
			type: data.type
		};
        return zzgoApi.post(`/sys-db-table-definitions/${tabledefinition}/sys-db-field-definitions`, senddata);
	}
};
