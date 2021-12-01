import axios from 'axios';

export const zzgoApi = axios.create();

// if (window.location.host.indexOf('localhost') >= 0) {
//     linklistApi.defaults.baseURL = process.env.VUE_APP_APIBASE;
// } else {
//     linklistApi.defaults.baseURL =
//         window.location.protocol + '//' + window.location.host + '/api/v1/';
// }

zzgoApi.defaults.baseURL = "https://zzgo.local/zzgo/";


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
