import { getResponse } from '../utils'

const contacts = [
    {
        id: 1,
        contactName: 'Павел Иванович',
        tel: '999 999 99',
        email: 'pavel@mail.ru',
        tags: [
            {
                code: "family",
                name: "Семья",
            },
            {
                code: "friend",
                name: "Дрзья",
            },
        ]
    },
    {
        id: 2,
        contactName: 'Василий Петрович',
        tel: '9349 999 99',
        email: 'vasya@mail.ru',
        tags: [
            {
                code: "family",
                name: "Семья",
            },
        ]
    },
    {
        id: 3,
        contactName: 'Констанин Владимирович',
        tel: '9349 999 239',
        email: 'kostya@mail.ru',
        tags: [
            {
                code: "work",
                name: "Работа",
            },
            {
                code: "friend",
                name: "Дрзья",
            },
        ]
    }
]

export default (pretender) => {
    pretender.get('/api/all-contacts', () => {
        return [200, { 'Content-Type': 'application/json' }, getResponse(contacts)]
    })

    pretender.post('/api/add-contact', (params) => {
        const contact = JSON.parse(params.requestBody)
        contacts.push(contact)
        return [200, { 'Content-Type': 'application/json' }, getResponse(contacts)]
    })

    pretender.post('/api/remove-contact', (params) => {
        const {id} = JSON.parse(params.requestBody)
        contacts.filter((contact) => contact.id !== id)
        return [200, { 'Content-Type': 'application/json' }, getResponse(contacts)]
    })

    pretender.post('/api/redact-contact', (params) => {
        const newContact = JSON.parse(params.requestBody)

        // contacts.forEach((contact) => {
        //     if (contact.id === newContact.id) {
        //         contact.name = newContact.name
        //         contact.email = newContact.email
        //         contact.tel = newContact.tel
        //         contact.tags = newContact.tags
        //     }
        // })

        return [200, { 'Content-Type': 'application/json' }, getResponse(contacts)]
    })
}
