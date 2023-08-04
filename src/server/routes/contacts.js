import { getResponse } from '../utils'

let contacts = [
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
                name: "Друзья",
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
                name: "Друзья",
            },
        ]
    }
]

export default (pretender) => {
    pretender.post('/api/add-contact', (params) => {
        const contact = JSON.parse(params.requestBody)
        contacts.unshift(contact)

        return new Promise((resolve) => {
            setTimeout(resolve, 600)
        }).then(() => [200, { 'Content-Type': 'application/json' }, getResponse(contacts)])
    })

    pretender.post('/api/remove-contact', (params) => {
        const {id} = JSON.parse(params.requestBody)
        contacts = contacts.filter((contact) => contact.id !== id)

        return new Promise((resolve) => {
            setTimeout(resolve, 600)
        }).then(() => [200, { 'Content-Type': 'application/json' }, getResponse(contacts)])
    })

    pretender.post('/api/redact-contact', (params) => {
        const newContact = JSON.parse(params.requestBody)

        contacts = contacts.map((contact) => {
            if (contact.id === newContact.id) {
                return {
                    id: contact.id,
                    contactName: newContact.contactName,
                    email: newContact.email,
                    tel: newContact.tel,
                    tags: newContact.tags
                }
            } else {
                return contact
            }
        })

        return new Promise((resolve) => {
            setTimeout(resolve, 600)
        }).then(() => [200, { 'Content-Type': 'application/json' }, getResponse(contacts)])
    })

    pretender.post('/api/search', (params) => {
        const {inputValue, optionValue} = JSON.parse(params.requestBody)
        const inp = inputValue.toLowerCase()
        let resultContacts = []

        if (optionValue === 'contact-name') {
            resultContacts = contacts.filter((contact) => contact.contactName.toLowerCase().includes(inp))
        } else if (optionValue === 'email') {
            resultContacts = contacts.filter((contact) => contact.email.toLowerCase().includes(inp))
        } else if (optionValue === 'tel') {
            resultContacts = contacts.filter((contact) => contact.tel.toLowerCase().includes(inp))
        } else if (optionValue === 'tags') {
            if (!inp) {
                resultContacts = contacts
            } else {
                resultContacts = contacts.filter((contact) => {
                    const filteredTags = contact.tags.filter((tag) => tag.name.toLowerCase().includes(inp))
                    return !!filteredTags.length
                })
            }
        }

        return new Promise((resolve) => {
            setTimeout(resolve, 600)
        }).then(() => [200, { 'Content-Type': 'application/json' }, getResponse(resultContacts)])
    })
}
