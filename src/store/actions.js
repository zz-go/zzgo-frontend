import * as api from '@/api';

export async function fetchTabledefinitions({ commit }) {
	try {
		const response = await api.tabledefinitions.show();
		commit('setTabledefinitions', response.data.data)
	} catch (error) {
		console.error(error);
	}
}