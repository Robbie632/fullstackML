axios = require('axios')

async function callFlaskApi(body) {

    instance = axios.create({
        baseURL: 'http://flask_app:5000/',
        timeout: 5000,
        headers: {'content-type':'application/json'},
    })

    try {
        const flaskOutput = await instance.post('/predict', body)

        return(flaskOutput)

    } catch (error) {
        return(console.log(error))
    }
}

module.exports = {
    callFlaskApi: callFlaskApi
}