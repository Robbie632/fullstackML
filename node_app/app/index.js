const express = require('express')
const hbs = require('hbs')
const request = require('request')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

/*app congigs*/
//below line of code defines which templating library is being used
app.set('view engine', 'hbs')
//below line defines which folder contains client side JavaScript files
app.use(express.static('js'))
//below line defines method of parsing POST body payloads
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.render('home')
})

/*train and predict api endpoints*/
app.post('/train', (req, res) => {

    if (!req.query.train) {
        return('train node api error')
    } else {
        res.send({
            message: `response from train api ${req.body.name}`
        })
        res.end()
    }

})

/*this is a POST API endpoint which takes a payload in the body key of the POST
call*/
app.post('/predict', (req, res) => {
console.log(req.body)
    if (!req.body.data1) {
        return('predict api error')
    }

    //send POST api request to flask predict API
    apiQuery = "http://node_app:<port>/predict"
    //send response back to POST request


    res.send({
        message: `your passenger died ${req.body.name}`
    })


    res.end()
})

//webpages
app.get('/model_prediction', (req, res) => {
    res.render('predict')
})



app.get('/train_model', (req, res) => {
    res.render('train')
})

app.listen(port, () =>console.log('the app is running'))
