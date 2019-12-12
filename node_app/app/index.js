const express = require('express')
const hbs = require('hbs')
const request = require('request')
const path = require('path')
const bodyParser = require('body-parser')
const { makeDataModel } = require('./models.js')
const axios = require('axios')
const { callFlaskApi } = require('./endpoints/callFlask')
const util = require('util')


app = (mongoose) => {

    const app = express()

    /*heroku specifies a port to run app on as an environemental variable port
    when running local thei svariable wont be availabel and so th eapp will
    run on port 3000*/
    const port = process.env.PORT || 3000

    /*app congigs*/
    app.set('view engine', 'hbs')
    app.use(express.static('js'))
    app.use(bodyParser.json())

    //define data models
    const dataModel = makeDataModel(mongoose)


    //db pratcise
    //********************************************************** */
    /**/
    //write

    const user = new dataModel({
        name: 3000,
        age : 2875,
        class : 8547
    })

    user.save(function (err, user) {
        if (err) return console.error(err)
        console.log(user)
    })


    //read
    /*
    makePermissionsModel(mongoose).find({}, (err, data) => {
        if (err) return console.log(err)
        console.log(`data read from permissions collection data: ${data}`)
    })*/
        
    //********************************************************** */

    //set up db


    //functions





    app.get('/', (req, res) => {
        res.render('home')
    })

    /*train and predict api endpoints*/
    app.post('/train', (req, res) => {
        if (!req.body) {
            return('train node api error')
        } else {
            //write to db here
            (error) => {
                if (error) {
                    return(console.log(`error from writedb ${error}`))
                }
                res.send({
                    message: `response from train api ${req.body.name}`
                })
                res.end()

            }
        }
    })

    /*this is a POST API endpoint which takes a payload in the body key of the POST
    call*/
    app.post('/predict', async (req, res) => {

        if (!req.body) {
            return('node /predict error')
        }
        try {
            const flaskResponse = await callFlaskApi(req.body)
            //the above line returns an [object Object]
            res.send(flaskResponse.data)

            res.end()

        } catch (error) {
            return(console.log(error))
        }
       
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
    app : app
}
