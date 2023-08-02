import $api from "./api";

export default class TagsService {
    static async getTags() {
        return $api.get('/all-tags')
    }
}
