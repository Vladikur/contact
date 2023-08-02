import $api from "./api";

export default class AuthService {
    static async login(user) {
        return $api.post('/login', user)
    }

    static async logout() {
        return $api.post('/logout')
    }
}
