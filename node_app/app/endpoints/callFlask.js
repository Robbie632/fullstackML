axios = require('axios')

async function callFlaskApi(body, endpoint) {

    instance = axios.create({
        baseURL: 'http://flask_app:5000/',
        timeout: 5000,
        headers: {'content-type':'application/json'},
    })

    try {
        const flaskOutput = await instance.post(endpoint, body)

        return flaskOutput
    } catch (error) {
        console.log(error)

        throw error
    }

}

module.exports = {
    callFlaskApi: callFlaskApi
}