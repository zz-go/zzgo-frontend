import { zzgoApi } from '@/utils/axios-config';

export default {
    show() {
        return zzgoApi.get(`sys-db-table-definitions`);
    },
    get(id) {
        return zzgoApi.get(`sys-db-table-definitions/` + id);
    }
};
