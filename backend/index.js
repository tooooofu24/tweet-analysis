const express = require('express')
const bodyParser = require('body-parser')
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')
const axios = require('axios');

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/twitter/id', function (req, res) {
    const token = 'AAAAAAAAAAAAAAAAAAAAAO7dZwEAAAAAG0IDj0%2FoHP%2FOv%2F2ObghoSYtWngI%3DpN5IRrlo73aNFGQelwtQwsgBtKNUvKWeioCMOKsK6lNbW7dPVK'
    axios.get('https://api.twitter.com/2/users/by', {
        params: {
            usernames: req.query.username,
            "user.fields": "profile_image_url"
        },
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(function (response) {
            res.send(response.data.data[0])
        })
        .catch(function (error) {
            // console.log(error.response.data.detail);
            res.send({
                'error': "アカウントデータが正しく取得できませんでした"
            })
        })
})

app.get('/twitter/tweets', function (req, res) {
    const token = 'AAAAAAAAAAAAAAAAAAAAAO7dZwEAAAAAG0IDj0%2FoHP%2FOv%2F2ObghoSYtWngI%3DpN5IRrlo73aNFGQelwtQwsgBtKNUvKWeioCMOKsK6lNbW7dPVK'
    axios.get(`https://api.twitter.com/2/users/${req.query.id}/tweets`, {
        params: {
            max_results: 20
        },
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(function (response) {
            res.send(response.data.data)
        })
        .catch(function (error) {
            res.send({
                'error': "ツイートが取得できませんでした。"
            })
        })
})

app.listen(process.env.PORT || 3000)