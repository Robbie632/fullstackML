app = (mongoose) => {
    if (error) {
        return(console.log(error))
    }
    const express = require('express')
    const hbs = require('hbs')
    const request = require('request')
    const path = require('path')
    const bodyParser = require('body-parser')

    const app = express()

    /*heroku specifies a port to run app on as an environemental variable port
    when running local thei svariable wont be availabel and so th eapp will
    run on port 3000*/
    const port = process.env.PORT || 3000

    /*app congigs*/
    app.set('view engine', 'hbs')
    app.use(express.static('js'))
    app.use(bodyParser.json())



//db pratcise
//********************************************************** */
/**/
//write
const user = new permissionModel({
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

    const callFlaskApi = (apiQuery, body, callback) => {
        request.post(
            apiQuery,
            body,
            (error, response) => {
                if (error) {
                    callback(`error in repsonse from flask predict api ${error}`, undefined)
                }

                callback(undefined, response.body)
            })
    }



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
    app.post('/predict', (req, res) => {

        //receive POST request
        console.log('this is the response' + req.body)
        if (!req.body) {
            return('predict api error')
        }

        //send body of returned POST api request to flask predict API as POST request
        //endpoint of flask predict API
        apiQuery = "http://flask_app:5000/predict"

        callFlaskApi(apiQuery, req.body, (error, data) => {
            if (error) {
                res.send(error)
            } else {
                //perhps this isn't working because I cant send data
                res.send(data)

            }
            res.end()
        })


        //send back response from flask endpoint back to client side javascript
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
