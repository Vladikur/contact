import { getResponse } from '../utils'

export default (pretender) => {
    pretender.get('/api/user', () => {
        return [200, { 'Content-Type': 'application/json' }, getResponse()]
    })
}
