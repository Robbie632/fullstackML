const express = require('express')
const hbs = require('hbs')
const request = require('request')
const path = require('path')
const bodyParser = require('body-parser')
/*here I'm using destructuring, in the braces on the left is the name of the
object method that I want, the resulting object will be the same as the name of
the method in the ./utils object*/

const app = express()
const port = 3000

//below line of code defines which templating library is being used
app.set('view engine', 'hbs')
//below line defines which folder contains client side JavaScript files
app.use(express.static('js'))

//below lin edefines method of parsing POST body payloads
app.use(bodyParser.json())
/*train and predict api endpoints*/
app.get('/train', (req, res) => {

    if (!req.query.train) {
        return('train node api error')
    } else {
        res.send({
            message: 'response from train api'
        })
    }

})

app.post('/predict', (req, res) => {
console.log(req.body)
    res.send({
        message: `your passenger died ${req.body.name}`
    })
    res.end()
})


// all code below is for practise
/*
const { callDarkSky } = require('./utils')

callDarkSky('37.8267', '-122.4233', (error, response) => {
    console.log(response)
})

const url = ' https://api.darksky.net/forecast/0161faf99c034b36802f950a0ea69173/37.8267,-122.4233'

app.get('/', (req, res) => {
    res.send('Hello World!')

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            return(console.log('error connecting to API'))
        } else if (response.body.error) {
            console.log('mistake in API token')
        }

        console.log(response.body.currently)

    })
})




app.get('/testStringQuery', (req, res) => {

    /*req stands for requests
    req.search object is the string query passed into the browser currently
    fo passing the string query search put the below url into your browser
    localhost:3000/testStringQuery?search=<param_of_your_choice>
    if (!req.query.search) {

        return(console.log('no search'))
    }
    //I could do stuff with the data here, then send back something else

    //res.send(req.query.search)
    res.send({
        hello:req.query.search,
        my:'friend'
    })
})
*/
const myVar = 'Ive injected a variable for templating'

app.get('/plotlytest', (req, res) => {
    res.render('index', {
        myVar : myVar
    })
})

app.listen(port, () =>console.log('the app is running'))
