import Api from './index'

export default {
    testPosting() {
        const item = { text: 'Success!' }
        return Api().post('/test', item)
    },
    getTwitterId(username) {
        return Api().get(`/twitter/id?username=${username}`)
    },
    getTweets(id) {
        return Api().get(`/twitter/tweets?id=${id}`)
    }
}