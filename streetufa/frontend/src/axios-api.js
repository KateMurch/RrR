import axios from "axios";
import store from './store';

const API = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/',
})

API.interceptors.response.use(response => response, async err => {
    console.log(err)
    if (err.response.status == 401) {
        store.dispatch('tokenRefresh', store.state.refreshToken
        ).then(() => {
            let old_request = err.config
            const new_access = store.state.accessToken
            console.log(new_access)
            console.log(old_request.headers.Authorization)
            old_request.headers.Authorization = `Bearer ${new_access}`
            console.log(old_request.headers.Authorization)
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + new_access
            return API(old_request)
        }).catch(err => {
            console.log(err)
        })
    }
})

export { API }