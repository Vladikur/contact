import $api from "./api";

export default class ContactsService {
    static async getContacts() {
        return $api.get('/all-contacts')
    }

    static async addContact(contact) {
        return $api.post('/add-contact', contact)
    }

    static async removeContact(id) {
        return $api.post('/remove-contact', {id})
    }

    static async redactContact(contact) {
        return $api.post('/redact-contact', contact)
    }
}
