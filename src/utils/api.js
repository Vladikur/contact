import axios from "axios";

export const BASE_URL = `/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
})

$api.interceptors.response.use((config) => {
    return config
},  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true

        try {
            const response = await axios.get(`${BASE_URL}/refresh`, {
                withCredentials: true,
            })

            localStorage.setItem('token', response.data.accessToken)

            return $api.request(originalRequest)
        } catch (error) {
            console.log(error.message)
        }
    } else {
        throw error
    }
})

export default $api
