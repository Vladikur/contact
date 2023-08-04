import { getResponse } from '../utils'

const tags = [
    {
        code: "work",
        name: "Работа",
    },
    {
        code: "friend",
        name: "Друзья",
    },
    {
        code: "family",
        name: "Семья",
    },
]

export default (pretender) => {
    pretender.get('/api/all-tags', () => {
        return [200, { 'Content-Type': 'application/json' }, getResponse(tags)]
    })
}
