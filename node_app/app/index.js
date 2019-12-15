const express = require('express')
const bodyParser = require('body-parser')
const { callFlaskApi } = require('./endpoints/callFlask')

const createApp = () => {

    const app = express()
    const port = process.env.PORT || 3000

    /*app configs*/
    app.set('view engine', 'hbs')
    app.use(express.static('js'))
    app.use(bodyParser.json())


    app.get('/', (req, res) => {
        res.render('home')
    })

    /*train and predict api endpoints*/
    app.post('/train', async (req, res) => {
        if (!req.body) {
            return('train node api error')
        }
        try {
            const flaskResponse = await callFlaskApi(req.body, '/train')

            res.send(flaskResponse.data)
        } catch (error) {
            console.log(error)

            res.status(500)
            res.send({ error })
        }

        res.end()
    })

    /*this is a POST API endpoint which takes a payload in the body key of the POST
    call*/
    app.post('/predict', async (req, res) => {

        if (!req.body) {
            return('node /predict error')
        }
        try {
            const flaskResponse = await callFlaskApi(req.body, '/predict')
            //the above line returns an [object Object]
            res.send(flaskResponse.data)
        } catch (error) {
            console.log(error)

            res.status(500)
            res.send({ error })
        }
        
        res.end()
    })
    

    //webpages
    app.get('/model_prediction', (req, res) => {
        res.render('predict')
    })

    app.get('/train_model', (req, res) => {
        res.render('train')
    })

    app.listen(port, () =>console.log(`the app is running on port ${port}`))
}

module.exports = {
    createApp
}
