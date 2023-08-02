import { getResponse } from '../utils'

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoi0JLQu9Cw0LQifQ.w0zizbijs3uSrhs6m6As0jcniVleBXAavYau0LzgP5o'
const errors = [{
    code: 0,
    customData: null,
    message: 'server error'
}]

export default (pretender) => {
    pretender.post('/api/login', () => {
        return [200, {'Content-Type': 'application/json'}, JSON.stringify({
            status: 'success',
            errors,
            data: null,
            accessToken: ACCESS_TOKEN,
        })]
    })

    pretender.post('/api/logout', () => {
        return [200, { 'Content-Type': 'application/json' }, getResponse()]
    })

    pretender.get('/api/refresh', () => {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({
            status: 'success',
            errors,
            data: null,
            accessToken: ACCESS_TOKEN,
        })]
    })
}
