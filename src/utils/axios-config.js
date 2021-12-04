import axios from 'axios';

export const zzgoApi = axios.create();

if (window.location.host.indexOf('localhost') >= 0) {
	zzgoApi.defaults.baseURL = "https://zzgo.local/zzgo/";
} else {
	zzgoApi.defaults.baseURL = "/zzgo/";
}

zzgoApi.defaults.headers.common['Accept'] =
    'application/json, text/plain, */*';

// add auth token to request headers
zzgoApi.interceptors.request.use(function(config) {
    return config;
});

zzgoApi.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        if (error.response.status === 400) {
            return Promise.reject(error);
        } else if (error.response.status === 422) {
            console.log(error.response);
            return Promise.reject(error);
        } else if (error.response.status === 403) {
            return error;
        }

        return Promise.reject(error);
    },
);
